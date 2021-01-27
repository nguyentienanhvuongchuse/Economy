import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { domain } from '../env'
import SingleProduct from './SingleProduct'

export const HomePage = () => {

  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    const getcategory = async () => {
      Axios({
        method: 'GET',
        url: `${ domain }/api/product/`
      }).then(response =>{
        console.log(response.data)
        setProducts(response.data)
      })
    }
    getcategory()
  }, [])

  return (
    <div className="container-fluid">
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
    </div>
  )
}
