import Axios from 'axios'
import React, { useState } from 'react'
import { domain } from '../env'


export const LoginPage = () => {
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)

  const loginrequest = async() => {
    await Axios({
      method: 'POST',
      url: `${ domain }/api/login/`,
      data:{
        'username':username,
        'password':password
      }
    }).then(response =>{
      console.log(response.data)
      window.localStorage.setItem('token', response.data['token'])
    }).catch(_ => {
      alert("Cannot invalid, try again")
    })
  }

  return (
    <div className="container">
      <div className="form-group">
        <label>Username</label>
        <input onChange={(e) => setusername(e.target.value)} type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>
      </div>
      <button onClick={loginrequest} className="btn btn-primary my-2">Login</button>
    </div>
  )
}
