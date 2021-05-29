import React from 'react'
import Header from '../Header/index.js'
import MenuHeader from '../MenuHeader/index.js'

const Layout = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  )
}

export default Layout
