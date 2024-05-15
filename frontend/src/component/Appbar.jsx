import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
const Appbar = () => {
    const navigate = useNavigate()
 const handleLogout = async(e) => {
   
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     navigate('/')
     alert("Logout successfull")

 }
return (
    <div>
    <nav class="navbar bg-body-tertiary" style={{background: "#2f354d"}}>
    <div class="container-fluid">
      <a href='/' class="navbar-brand">Navbar</a>
      <form class="d-flex" role="search">
       
        <button onClick={handleLogout} class="btn btn-success" type="submit">Logout</button>
      </form>
    </div>
  </nav>
  <Sidebar />
  </div>
  )
}

export default Appbar