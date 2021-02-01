import Axios from 'axios'
import React, { useState } from 'react'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'


export const ProfilePage = () => {
  const [{ profile }, dispatch] = useGlobalState()
  const [email, setemail] = useState(profile?.prouser?.email)
  const [lastname, setlastname] = useState(profile?.prouser?.last_name)
  const [firstname, setfirstname] = useState(profile?.prouser?.first_name)
  const [image, setimage] = useState(null)

  const updateprofile = async () => {
    await Axios({
      method: 'POST',
      url: `${ domain}/api/updateprofile/`,
      headers: header,
      data: {
        'first_name':firstname,
        'last_name':lastname,
        'email':email
      }
    }).then(response => {
      dispatch({
        type: "PAGE_RELOAD",
        pagereload: response.data
      })
    })
  }

  const updateimg = async () => {
    const fromdata = new FormData()
    fromdata.append('image', image)
    await Axios({
      method: 'POST',
      url: `${ domain}/api/updateimg/`,
      headers: header,
      data: fromdata
    }).then(response => {
      dispatch({
        type: "PAGE_RELOAD",
        pagereload: response.data
      })
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="media">
            <img src={ `${domain}${profile?.image}`} className="account-img"/>
            <div className="media-body">
              <h2>{profile?.prouser?.username}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <p>Name:     {profile?.prouser?.last_name} {profile?.prouser?.first_name}</p>
          <p>Email:    {profile?.prouser?.email}</p>
        </div>
      </div>
      <div className="">
        <div className="form-group">
          <label>Image</label>
          <input onChange={e => setimage(e.target.files[0])} type="file" className="form-control"/>
        </div>
          <button onClick={updateimg} className="btn btn-info my-2">Upload</button>
        <div className="form-group">
          <label>Email</label>
          <input onChange={(e) => setemail(e.target.value)} type="email" className="form-control" value={email}/>
        </div>
        <div className="form-group">
          <label>Firstname</label>
          <input onChange={(e) => setfirstname(e.target.value)} type="text" className="form-control" value={firstname}/>
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input onChange={(e) => setlastname(e.target.value)} type="text" className="form-control" value={lastname}/>
        </div>
        <button onClick={updateprofile} className="btn btn-success my-2">Update</button>
      </div>
    </div>
  )
}
