import HomePage from './containers/HomePage/index.js'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage/index.js'
import ProductDetailsPage from './containers/ProductDetailsPage'
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}></Route>
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
