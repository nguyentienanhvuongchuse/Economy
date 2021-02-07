import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { domain } from '../env'
import  SingleProduct from './SingleProduct'
import { useGlobalState } from '../state/provider'

export const ProductsDetails = () => {

  const { id } = useParams()
  const [ product, setProduct] = useState(null)
  const [categoryproduct, setCategoryproduct] = useState(null)
  const [{ profile, header }, dispath] = useGlobalState()
  const history = useHistory()

  useEffect(() => {
    const getProduct = async () => {
      await Axios({
        method: "GET",
        url: `${ domain }/api/product/${id}/`
      }).then(response =>{
        setProduct(response.data)
        getcategory(response?.data?.category['id'])
      })
    }
    getProduct()
  }, [id])

  const getcategory = async (id) => {
    await Axios({
      method: "GET",
      url: `${ domain }/api/categori/${id}/`
    }).then(response => {
      setCategoryproduct(response.data)
    })
  }


  const addToCart = async (id) => {
    profile !== null ? (
    await Axios({
      method: 'POST',
      url: `${ domain }/api/addtocart/`,
      data: {'id':id},
      headers: header
    }).then(response => {
      console.log(response.data)
      dispath({
        type: 'PAGE_RELOAD',
        pagereload: response.data
      })
    })
    ):
    (
      history.push('/login')
    )
  }

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
              <button onClick={() => addToCart(product?.id)} className="btn btn-info">Addtocart</button>
            </div>
            <div className="">
              {product?.description}
            </div>
          </div>
        )
      }
      <div className="row">
        <h1>Related Products</h1>
        {
          categoryproduct !==null &&
          categoryproduct[0]?.category_product?.map((product,index) => (
            <div className="col-md-3" key={index}>
              <SingleProduct item={product} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
