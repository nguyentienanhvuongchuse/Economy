import Axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { domain } from '../env'
import SingleProduct from './SingleProduct'

export const CategoryProducts = () => {
  const { id } = useParams()
  const [ category, setCategory ] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      await Axios ({
        method: 'GET',
        url: `${ domain }/api/categori/${id}/`
      }).then(response => {
        setCategory(response.data[0])
      })
    }
    getProduct()
  }, [])
  return (
    <div className="container">
      <h1>Category: {category?.title}</h1>
      <h2>Category Products</h2>
      <div className="row">
      {
        category !== null &&
        category?.category_product?.map((product,index) =>(
          <div className="col-md-3">
            <SingleProduct item={product} key={index}/>
          </div>
        ))
      }
      </div>
    </div>
  )
}
