import HomePage from './containers/HomePage/index.js'
import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage/index.js'
import ProductDetailsPage from './containers/ProductDetailsPage'
import CartPage from './containers/CartPage'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, updateCart } from './actions'
import CheckoutPage from './containers/CheckoutPage'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import OrderPage from './containers/OrderPage'
import OrderDetailsPage from './containers/OrderDetailsPage'

const history = createHistory({ forceRefresh: true })
function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

  useEffect(() => {
    dispatch(updateCart())
  }, [auth.authenticate])
  return (
    <div className='App'>
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={HomePage}></Route>
            <Route path='/cart' component={CartPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route path='/account/orders' component={OrderPage} />
            <Route
              path='/order_details/:orderId'
              component={OrderDetailsPage}
            />
            <Route
              path='/:productSlug/:productId/p'
              component={ProductDetailsPage}
            ></Route>
            <Route path='/:slug' component={ProductListPage}></Route>
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
  )
}

export default App
