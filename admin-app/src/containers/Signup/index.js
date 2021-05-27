import React from 'react'
import Layout from '../../components/Layout/index.js'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Signup = (props) => {
  const auth = useSelector((state) => state.auth)
  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }
  return (
    <>
      <Layout>
        <Container className='text-center text-md-left'>
          <Row style={{ marginTop: '50px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      label='First Name'
                      placeholder='First Name'
                      value=''
                      type='text'
                      onChange={(e) => {}}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label='Last Name'
                      placeholder='Last Name'
                      value=''
                      type='text'
                      onChange={(e) => {}}
                    />
                  </Col>
                </Row>

                <Input
                  label='Email'
                  placeholder='Email'
                  value=''
                  type='email'
                  onChange={(e) => {}}
                />

                <Input
                  label='Password'
                  placeholder='Password'
                  value=''
                  type='password'
                  onChange={(e) => {}}
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

export default Signup
