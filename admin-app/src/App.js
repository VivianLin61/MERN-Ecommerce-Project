import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import PrivateRoute from '../src/components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getInitialData } from './actions'
import Products from '../src/containers/Products'
import Orders from '../src/containers/Orders'
import Category from '../src/containers/Category'
import NewPage from '../src/containers/NewPage'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if (auth.authenticate) {
      dispatch(getInitialData())
    }
  }, [auth.authenticate])
  return (
    <div className='App'>
      <Switch>
        <PrivateRoute path='/' exact component={Home}></PrivateRoute>
        <PrivateRoute path='/products' component={Products}></PrivateRoute>
        <PrivateRoute path='/page' component={NewPage}></PrivateRoute>
        <PrivateRoute path='/orders' component={Orders}></PrivateRoute>
        <PrivateRoute path='/category' component={Category}></PrivateRoute>
        <Route exact path='/signin' component={Signin}></Route>
        <Route exact path='/signup' component={Signup}></Route>
      </Switch>
    </div>
  )
}

export default App
