import React from 'react'
import Layout from '../../components/Layout/index.js'
import { Jumbotron } from 'react-bootstrap'
const Home = (props) => {
  return (
    <>
      <Layout>
        <Jumbotron
          style={{ margin: '5rem', background: '#fff' }}
          className='text-center'
        >
          <h1>Welcome to Admin Dashboard</h1>
          <p>dkfkdhskgjhdskjfghjks</p>
        </Jumbotron>
      </Layout>
    </>
  )
}

export default Home
