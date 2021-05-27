import React from 'react'

import Layout from '../../components/Layout'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Products = (props) => {
  const auth = useSelector((state) => state.auth)
  if (!auth.authenticate) {
    return <Redirect to={`/signin`} />
  }
  return (
    <>
      <Layout sidebar>Products</Layout>
    </>
  )
}

export default Products