/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Modal, Button } from 'react-bootstrap'
import { getAllCategory, addCategory } from '../../actions'
import Input from '../../components/UI/Input'
const Category = (props) => {
  const auth = useSelector((state) => state.auth)
  const category = useSelector((state) => state.category)
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')

  const handleClose = () => {
    const form = new FormData()
    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form))
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
      myCategories.push(
        <li>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      )
    }
    return myCategories
  }
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options
  }
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
                  <button onClick={handleShow}>Add</button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul>{renderCategories(category.categories)}</ul>
            </Col>
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  )
}

export default Category
