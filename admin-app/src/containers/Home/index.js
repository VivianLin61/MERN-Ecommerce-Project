import React from 'react'
import Layout from '../../components/Layout'
import { Jumbotron, Row, Col, Container } from 'react-bootstrap'
import './style.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
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
  return (
    <Layout>
      <Container>
        <Row>
          <Col md={2} className='sidebar'>
            <div style={{ top: '10%' }}>Sidebar</div>
          </Col>
          <Col md={10} className='main'>
            <div>Container</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home
