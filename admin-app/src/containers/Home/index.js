import React from 'react'
import Layout from '../../components/Layout'
import { Jumbotron, Row, Col, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const auth = useSelector((state) => state.auth)
  if (!auth.authenticate) {
    return <Redirect to={`/signin`} />
  }
  return <Layout sidebar></Layout>
}

export default Home
