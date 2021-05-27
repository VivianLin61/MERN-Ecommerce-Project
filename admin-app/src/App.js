import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import PrivateRoute from '../src/components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from '../src/actions'
function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])
  return (
    <div className='App'>
      <Switch>
        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
        <Route exact path='/signin' component={Signin}></Route>
        <Route exact path='/signup' component={Signup}></Route>
      </Switch>
    </div>
  )
}

export default App
