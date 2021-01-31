import Axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CategoryProducts } from './components/CategoryProducts'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import Navbar from './components/Navbar'
import { ProductsDetails } from './components/ProductsDetails'
import { ProfilePage } from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import { domain, userToken, header } from './env'
import { useGlobalState } from './state/provider'

const App = () => {
  const [{ profile }, dispath] = useGlobalState()
  console.log(profile)
  useEffect(() => {
    if(userToken !== null){
      const getData = async () => {
        await Axios({
          method:'GET',
          url: `${ domain }/api/profile/`,
          headers: header
        }).then(response => {
          dispath({
            type: 'ADD_PROFILE',
            profile: response.data['data']
          })
        })
      }
      getData()
    }
  }, [])


  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/product/:id" component={ProductsDetails}/>
          <Route exact path="/category/:id" component={CategoryProducts}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
