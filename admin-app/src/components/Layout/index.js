import React from 'react'
import { Jumbotron, Row, Col, Container } from 'react-bootstrap'
import './style.css'
import { NavLink } from 'react-router-dom'
import './style.css'
import Header from '../Header'

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container>
          <Row>
            <Col md={2} className='sidebar'>
              <ul>
                <li>
                  <NavLink to={'/'} exact>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/page'}>Pages</NavLink>
                </li>
                <li>
                  <NavLink to={'/products'}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={'/orders'}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={'/category'}>Categories</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} className='main'>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        <> {props.children} </>
      )}
    </>
  )
}

export default Layout
