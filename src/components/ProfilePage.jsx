import React, { useState } from 'react'
import { domain } from '../env'
import { useGlobalState } from '../state/provider'


export const ProfilePage = () => {
  const [{ profile }, {}] = useGlobalState()
  const [email, setemail] = useState(profile?.prouser?.email)
  const [lastname, setlastname] = useState(profile?.prouser?.last_name)
  const [firstname, setfirstname] = useState(profile?.prouser?.first_name)
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
          <input type="file" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input onChange={(e) => setemail(e.target.value)} type="email" className="form-control" value={email}/>
          <button className="btn btn-info my-2">Upload</button>
        </div>
        <div className="form-group">
          <label>Firstname</label>
          <input onChange={(e) => setfirstname(e.target.value)} type="text" className="form-control" value={firstname}/>
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input onChange={(e) => setlastname(e.target.value)} type="text" className="form-control" value={lastname}/>
        </div>
        <button className="btn btn-success my-2">Update</button>
      </div>
    </div>
  )
}
