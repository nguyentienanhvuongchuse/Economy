import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'


const Order = () => {
  const [{ cartuncomplit }, dispath] = useGlobalState()
  const [address, setAddress] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const history =  useHistory()

  const orderProduct = async () => {
    await Axios({
      method: 'POST',
      url: `${ domain }/api/orders/`,
      headers: header,
      data: {
        'cartid': cartuncomplit?.id,
        'address': address,
        'email': email,
        'mobile': phone
      }
    }).then(response => {
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
      dispath({
        type: 'ADD_CARTUNCOMPLIT',
        cartuncomplit: null
      })
      history.push('/oldorder')
    })
  }
  return (
    <div className="Container">
      <div className="row">
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantiti</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                cartuncomplit?.cartproduct?.map((item, index) =>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.product[0].title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>{cartuncomplit?.total}$</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-md-6">
          <h1>Order Now</h1>
          <div className="">
            <div class="form-group">
              <label>Address</label>
              <input onChange={(e) => setAddress(e.target.value)} type="text" class="form-control" placeholder="Address"/>
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input onChange={(e) => setPhone(e.target.value)} type="text" class="form-control" placeholder="Number Phone"/>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" placeholder="Email"/>
            </div>

            <button onClick={orderProduct} className="btn btn-primary my-2">Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
