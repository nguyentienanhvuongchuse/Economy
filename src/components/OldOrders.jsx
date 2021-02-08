import Axios from 'axios'
import { set } from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { domain, header } from '../env'
import { Link } from 'react-router-dom'

const OldOrders = () => {
  const [orders, setOrders] = useState(null)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    const getOrder = async () => {
      await Axios({
        method: "GET",
        url: `${ domain }/api/orders/`,
        headers: header
      }).then(response =>{
        setOrders(response.data)
      })
    }
    getOrder()
  },[reload])

  const deleteHistory = async (id) => {
    await Axios({
      method: 'DELETE',
      url: `${ domain }/api/orders/${id}/`,
      headers: header
    }).then(response =>{
      setReload(response)
    })
  }

  return (
    <div className="container">
      <h1>Order History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Total</th>
            <th>Product</th>
            <th>Order Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.length !== 0 ?
            orders?.map((order, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{order.total}</td>
                <td>{order?.cartproduct?.length}</td>
                <td>{order.order_status}</td>
                <td>
                  <Link className="btn btn-info" to={`orderdetail/${order?.id}`}>Details</Link>
                </td>
                <td>
                  <button onClick={()=> deleteHistory(order?.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )):
            <div>

            </div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default OldOrders
