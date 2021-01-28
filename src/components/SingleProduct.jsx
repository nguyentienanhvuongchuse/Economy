import React from 'react'
import { Link } from 'react-router-dom'

function SingleProduct({item}) {
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
        <a href="#" className="btn btn-primary">Add</a>
      </div>
      <div className="card-footer">
        <h5>Price: <del>{item.market_price}</del> {item.selling_price}</h5>
      </div>
    </div>
  )
}

export default SingleProduct
