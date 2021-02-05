import Axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cart from './components/Cart'
import { CategoryProducts } from './components/CategoryProducts'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import Navbar from './components/Navbar'
import OldOrders from './components/OldOrders'
import Order from './components/Order'
import OrderDetails from './components/OrderDetails'
import { ProductsDetails } from './components/ProductsDetails'
import { ProfilePage } from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import { domain, userToken, header } from './env'
import { useGlobalState } from './state/provider'

const App = () => {
  const [{ profile, pagereload, cartcomplit, cartuncomplit }, dispath] = useGlobalState()

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
  }, [pagereload])

  useEffect(() =>  {
    const getCart = async () => {
      await Axios({
        method: "GET",
        url: `${domain}/api/cart/`,
        headers: header
      }).then(response => {
        {
          const all_data = []
          response?.data.map( data => {
            if(data.complit){
              all_data.push(data)
              dispath({
                type: 'ADD_CARTCOMPLIT',
                cartcomplit: all_data
              })
            }
            else{
              dispath({
                type: 'ADD_CARTUNCOMPLIT',
                cartuncomplit: data
              })
            }
          })
        }
      })
    }
    getCart()
  },[])

  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/product/:id" component={ProductsDetails}/>
          <Route exact path="/category/:id" component={CategoryProducts}/>
          {
            profile !== null ? (
              <>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/oldorder" component={OldOrders}/>
                <Route exact path="/order" component={Order}/>
                <Route exact path="/orderdetail/:id" component={OrderDetails}/>
              </>
              ):(
                <>
                  <Route exact path="/register" component={RegisterPage}/>
                  <Route exact path="/login" component={LoginPage}/>
                </>
            )
          }
          <Route exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
