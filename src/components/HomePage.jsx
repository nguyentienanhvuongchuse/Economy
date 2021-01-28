import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { domain } from '../env'
import SingleProduct from './SingleProduct'

export const HomePage = () => {

  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    const getCategory = async () => {
      await Axios({
        method: 'GET',
        url: `${ domain }/api/product/`
      }).then(response =>{
        console.log(response.data)
        setProducts(response.data)
      })
    }
    getCategory()
  }, [])

  const beforeProduct = async () =>{
    await Axios({
      method: "GET",
      url: products?.previous
    }).then(response => {
      setProducts(response.data)
    })
  }

  const nextProduct = async () =>{
    await Axios({
      method: "GET",
      url: products?.next
    }).then(response => {
      setProducts(response.data)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            {
              products != null &&
              products?.results.map((item,index) => (
                <div key={index} className="col-md-3 my-2">
                  <SingleProduct item={item}/>
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-md-3">

        </div>
      </div>

      <div className="home__pagination">
        <div className="">
          {
            products?.previous != null ? (
              <button onClick={beforeProduct} className="btn btn-white"> before </button>
            ):(
              <button className="btn btn-white" disabled> before </button>
            )
          }
        </div>
        <div className="">
          {
            products?.next != null ? (
              <button onClick={nextProduct} className="btn btn-white"> next </button>
            ):(
              <button className="btn btn-white" disabled> next </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
