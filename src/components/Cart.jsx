import React from 'react'
import { useGlobalState } from '../state/provider'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [{ cartuncomplit }, {}] = useGlobalState()
  let cart_product_length = 0
  if(cartuncomplit !== null){
    cart_product_length = cartuncomplit?.cartproduct?.length
  }
  else{
    cart_product_length = 0
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
                    <button className="btn btn-info">-</button>
                    <button className="btn btn-danger mx-1">x</button>
                    <button className="btn btn-info">+</button>
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
            <Link className="btn btn-danger">Delete Cart</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Cart
