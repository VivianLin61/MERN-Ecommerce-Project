/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Button } from 'react-bootstrap'
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from '../../actions'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'

import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from 'react-icons/io'
const Category = (props) => {
  const auth = useSelector((state) => state.auth)
  const category = useSelector((state) => state.category)
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
  const handleClose = () => {
    const form = new FormData()
    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form))
    setCategoryName('')
    setParentCategoryId('')
    setShow(false)
  }
  const handleShow = () => setShow(true)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  if (!auth.authenticate) {
    return <Redirect to={`/signin`} />
  }

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0])
  }

  const renderCategories = (categories) => {
    let myCategories = []
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      })
    }
    return myCategories
  }
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options
  }

  const updateCategory = () => {
    setUpdateCategoryModal(true)
    const categories = createCategoryList(category.categories)
    const checkedArray = []
    const expandedArray = []
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        )
        category && checkedArray.push(category)
      })
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        )
        category && expandedArray.push(category)
      })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
  }

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value)
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      )
      setCheckedArray(updatedCheckedArray)
    } else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      )
      setExpandedArray(updatedExpandedArray)
    }
  }

  const updateCategoriesForm = () => {
    const form = new FormData()

    expandedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('type', item.type)
    })
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('type', item.type)
    })
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory())
      }
    })
    setUpdateCategoryModal(false)
  }
  const categoryList = createCategoryList(category.categories)
  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h3>Category</h3>

                  <div className='actionBtnContainer'>
                    <span>Actions: </span>
                    <button onClick={handleShow}>
                      <IoIosAdd /> <span>Add</span>
                    </button>
                    <button onClick={() => {}}>
                      <IoIosTrash /> <span>Delete</span>
                    </button>
                    <button onClick={updateCategory}>
                      <IoIosCloudUpload /> <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox />,
                  uncheck: <IoIosCheckboxOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </Col>
          </Row>
        </Container>

        <Modal
          show={show}
          handleClose={() => setShow(false)}
          onSubmit={handleClose}
          modalTitle={'Add Cateogory'}
        >
          <Input
            value={categoryName}
            placeholder={'Category Name'}
            onChange={(e) => {
              setCategoryName(e.target.value)
            }}
          ></Input>

          <select
            className='form-control'
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            type='file'
            name='categoryImage'
            onChange={handleCategoryImage}
          ></input>
        </Modal>

        <Modal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          onSubmit={updateCategoriesForm}
          modalTitle={'Add Cateogory'}
          size={'lg'}
        >
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>
          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={`Category Name`}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  >
                    <option>select category</option>
                    {categoryList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.type}
                    onChange={(e) =>
                      handleCategoryInput(
                        'type',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  >
                    <option value=''>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Row>
            ))}
          <h6>Checked Categories</h6>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={`Category Name`}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  >
                    <option>select category</option>
                    {categoryList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.type}
                    onChange={(e) =>
                      handleCategoryInput(
                        'type',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  >
                    <option value=''>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Row>
            ))}
        </Modal>
      </Layout>
    </>
  )
}

export default Category
