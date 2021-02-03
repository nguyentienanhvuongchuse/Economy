import React from 'react'
import { useGlobalState } from '../state/provider'


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
                </tr>
              ))
            }
          </tbody>
        </table>
        :
        (
        <div>
          <h2>Cart have no product</h2>
        </div>
        )
      }
    </div>
  )
}

export default Cart
