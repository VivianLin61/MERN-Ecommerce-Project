import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions'
import { useDispatch } from 'react-redux'
const Signin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = (e) => {
    e.preventDefault()

    const user = {
      email: 'test@gmail.com',
      password: '123456',
    }

    dispatch(login(user))
  }

  return (
    <>
      <Layout>
        <Container className='text-center text-md-left'>
          <Row style={{ marginTop: '50px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label='Email'
                  placeholder='Email'
                  value={email}
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label='Password'
                  placeholder='Password'
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Signin
