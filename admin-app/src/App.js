import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import PrivateRoute from '../src/components/HOC/PrivateRoute'
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home}></PrivateRoute>
          <Route exact path='/signin' component={Signin}></Route>
          <Route exact path='/signup' component={Signup}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
