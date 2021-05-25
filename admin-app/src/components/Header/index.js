import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          {/* <Navbar.Brand href='#home'>Admin Dashboard</Navbar.Brand> */}
          <Link to='/' className='navbar-brand'>
            Admin Dashboard
          </Link>

          <Nav className='mr-auto'>
            <li className='nav-item'>
              <NavLink to='signin' className='nav-link'>
                Signin
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='signup' className='nav-link'>
                Signup
              </NavLink>
            </li>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
