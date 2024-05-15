import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  
  const user = {
    email: '',
    password: ''
  }
  const [formData , setFormData] = useState(user)

 const handleInputChange = (e) => {
  const {name , value} = e.target
  setFormData({...formData , [name] : value})
 }

 const navigate = useNavigate()

 const handleLogin = (e) => {
    
    e.preventDefault()

    axios.post('https://sandip-node-4.onrender.com/api/login' , formData)
    .then((response) => {
        if(response.data.status === 'success'){
          alert(response.data.msg)
          navigate('/dashboard')
          console.log(response)

          localStorage.setItem("user" , JSON.stringify(response.data.user))
          localStorage.setItem("token" , response.data.token)
        }else{
         
          alert(response.data.msg)
        }
       
    }).catch((error) => {
      alert(error.response.data.msg)
    })
 }


  return (
    <div class="container d-flex justify-content-center align-items-center vh-100 ">
      <div class="col-4 bg-light h-50 rounded-3 p-4 d-flex flex-column align-items-center gap-3">
        <FontAwesomeIcon
          icon={faLock}
          style={{ fontSize: "40px", color: "#d4910f" }}
        />
        <h3 className="bg-light fw-bold">Login</h3>
        <div className=" d-flex flex-column  justify-content-left ">
          <h5 style={{ marginRight: "30px", color: "#3d3c3c" }}>Email</h5>
          <input
            name="email"
            onChange={handleInputChange}
            style={{
              background: "#D9D9D9",
              border: "NONE",
              borderRadius: "10px",
              minWidth: "17vw",
              padding: "10px",
            }}
          ></input>
        </div>
        <div className='d-flex flex-column  justify-content-left'>
            <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Password</h5> 
            <input className='' 
                name='password'
                onChange={handleInputChange}
              style={{background : "#D9D9D9", border:"NONE" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
         </div>
         <Link to={"/forgot-password"} style={{textDecoration:"none", color:"#000"}}> 
         <h6 style={{color:"#d4910f"}}>forgot Password?</h6>
         </Link>
         <div>
               <button type='submit' onClick={handleLogin} className='border-0 p-2 rounded-3' style={{minWidth:"10vw" , color:"white", background:"#d4910f"}}>Submit</button>
          </div>
          <h6>Not have Account? <Link to={"/signup"} style={{textDecoration:"none", color:"#000"}}> <span style={{color:"#d4910f"}}>Sign up</span></Link></h6>
      </div>
    </div>
  );
};

export default Login;
