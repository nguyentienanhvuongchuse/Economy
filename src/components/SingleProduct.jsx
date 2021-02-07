import Axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

function SingleProduct({item}) {
  const [{ profile }, dispath] = useGlobalState()
  const history = useHistory()

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
    <div className="card single_product">
      <Link to={`/product/${item.id}`}>
        <img src={item.image} className="card-img-top" alt="..."/>
      </Link>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          {(item.description).substring(0,50)}
          ... <Link>read more</Link>
        </p>
        <button onClick={() => addToCart(item.id)} className="btn btn-primary">Add</button>
      </div>
      <div className="card-footer">
        <h5>Price: <del>{item.market_price}</del> {item.selling_price}</h5>
      </div>
    </div>
  )
}

export default SingleProduct
