import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain, header } from '../env'

const OrderDetails = () => {
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState(null)
  useEffect(() => {
    const getOrderDetail = async () => {
      await Axios({
        method: 'GET',
        url: `${ domain }/api/orders/${id}/`,
        headers: header
      }).then(response => {
        console.log(response.data["data"][0])
        setOrderDetail(response.data["data"][0])
      })
    }
    getOrderDetail()
  }, [])

  const product = orderDetail?.cartproduct

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Total</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Discount</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              orderDetail !== null &&
              <>
                <td>{orderDetail?.date}</td>
                <td>{orderDetail?.total}</td>
                <td>{orderDetail?.email}</td>
                <td>{orderDetail?.mobile}</td>
                <td>{orderDetail?.discount} %</td>
                <td>{orderDetail?.cartproduct?.length}</td>
              </>
            }
          </tr>
        </tbody>
      </table>
      <h1>Product Detail</h1>
      <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              product?.map((item,index) => (
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
      </table>
    </div>
  )
}

export default OrderDetails
