import React from 'react'
import { useGlobalState } from '../state/provider'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { domain, header } from '../env'

const Cart = () => {
  const [{ cartuncomplit }, dispath] = useGlobalState()
  const history = useHistory()

  let cart_product_length = 0
  if(cartuncomplit !== null){
    cart_product_length = cartuncomplit?.cartproduct?.length
  }
  else{
    cart_product_length = 0
  }

  const upCart = async (id) =>{
    await Axios({
      method: 'POST',
      url: `${ domain }/api/upincart/`,
      data: {'id':id},
      headers: header
    }).then(response => {
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
    })
  }

  const downCart = async (id) =>{
    await Axios({
      method: 'POST',
      url: `${ domain }/api/downincart/`,
      data: {'id':id},
      headers: header
    }).then(response => {
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
    })
  }

  const deleteCart = async (id) =>{
    await Axios({
      method: 'POST',
      url: `${ domain }/api/deleteincart/`,
      data: {'id':id},
      headers: header
    }).then(response => {
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
    })
  }

  const deleteFullCart = async (id) => {
    await Axios({
      method: "POST",
      url: `${ domain }/api/deletefullcart/`,
      data: {'id':id},
      headers: header
    }).then(response => {
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
      dispath({
        type: 'ADD_CARTUNCOMPLIT',
        cartuncomplit: null
      })
      alert("Deleted all product in your cart")
      history.push('/cart')
    })
  }

  return (
    <div className="container p-2">
      {
        cart_product_length !== 0 ?
        <table className="table">
          <thead>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quanlity</th>
            <th>subtotal</th>
            <th>Action</th>
          </thead>
          <tbody>
            {
              cartuncomplit?.cartproduct.map((data, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.product[0].title}</td>
                  <td>{data.price}</td>
                  <td>{data.quantity}</td>
                  <td>{data.subtotal}</td>
                  <td>
                    <button onClick={() => downCart(data.id)} className="btn btn-info">-</button>
                    <button onClick={() => deleteCart(data.id)} className="btn btn-danger mx-1">x</button>
                    <button onClick={() => upCart(data.id)} className="btn btn-info">+</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4" className="text-right">Total: </th>
              <th>{cartuncomplit?.total}</th>
              <th><Link className="btn btn-secondary" to="/order">Order Now</Link></th>
            </tr>
          </tfoot>
        </table>
        :
        (
        <div>
          <h2>Cart have no product</h2>
        </div>
        )
      }
      <div className="row">
        <div className="col">
          <Link className="btn btn-info" to="/oldorder">Old Orders</Link>
        </div>
        {
          cart_product_length !== 0 &&
          <div className="col">
            <Link onClick={() => deleteFullCart(cartuncomplit?.id)} className="btn btn-danger">Delete Cart</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Cart
