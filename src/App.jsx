import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import Navbar from './components/Navbar'

const App = () => {
  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
