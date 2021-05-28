/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Button } from 'react-bootstrap'
// import { getAllProducts, addProducts } from '../../actions'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { addProduct } from '../../actions'
const Products = (props) => {
  const auth = useSelector((state) => state.auth)
  const Products = useSelector((state) => state.Products)
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productPictures, setProductPictures] = useState([])
  const category = useSelector((state) => state.category)
  const product = useSelector((state) => state.product)
  const dispatch = useDispatch()

  if (!auth.authenticate) {
    return <Redirect to={`/signin`} />
  }

  const submitProductForm = () => {
    const form = new FormData()
    form.append('name', name)
    form.append('quantity', quantity)
    form.append('price', price)
    form.append('description', description)
    form.append('category', categoryId)

    for (let pic of productPictures) {
      form.append('productPicture', pic)
    }

    dispatch(addProduct(form)).then(() => setShow(false))
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]])
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
                  <h3>Products</h3>
                  <button onClick={handleShow}>Add</button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul>{}</ul>
            </Col>
          </Row>
        </Container>

        <Modal
          show={show}
          handleClose={handleClose}
          modalTitle={'Add New Product'}
          onSubmit={submitProductForm}
        >
          <Input
            label='Name'
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label='Quantity'
            value={quantity}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label='Price'
            value={price}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label='Description'
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className='form-control'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <input
            type='file'
            name='productPicture'
            onChange={handleProductPictures}
          />
        </Modal>
      </Layout>
    </>
  )
}

export default Products
