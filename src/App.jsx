import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import Navbar from './components/Navbar'
import { ProductsDetails } from './components/ProductsDetails'

const App = () => {
  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/product/:id" component={ProductsDetails}/>
          <Route exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
