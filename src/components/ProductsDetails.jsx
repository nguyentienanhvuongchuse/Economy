import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain } from '../env'

export const ProductsDetails = () => {

  const { id } = useParams()
  const [ product, setProduct] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      await Axios({
        method: "GET",
        url: `${ domain }/api/product/${id}/`
      }).then(response =>{
        console.log(response.data)
        setProduct(response.data)
      })
    }
    getProduct()
  }, [])

  return (
    <div className="container">
      {
        product !== null && (
          <div className="row">
            <img src={product?.image} alt=""/>
            <div className="col-md-7">
              <h1>{product?.title}</h1>
              <h2>Price:
                <del>{product?.market_price}</del>
                {product?.selling_price}
              </h2>
            </div>
            <div className="col-md-5">
              <button className="btn btn-info">Addtocart</button>
            </div>
            <div className="">
              {product?.description}
            </div>
          </div>
        )
      }
    </div>
  )
}
