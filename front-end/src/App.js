import HomePage from './containers/HomePage/index.js'
import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage/index.js'
import ProductDetailsPage from './containers/ProductDetailsPage'
import CartPage from './containers/CartPage'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, updateCart } from './actions'
function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

  useEffect(() => {
    console.log('App.js - updateCart')
    dispatch(updateCart())
  }, [auth.authenticate])
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}></Route>
          <Route path='/cart' component={CartPage} />
          <Route
            path='/:productSlug/:productId/p'
            component={ProductDetailsPage}
          ></Route>
          <Route path='/:slug' component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
