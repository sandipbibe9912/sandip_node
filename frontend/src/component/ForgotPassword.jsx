import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
 
  const user = {
    email: ''
  }

  const [formData , setFormData] = useState(user)

  const handleInputChange = (e) => {
    const {name , value} = e.target
    setFormData({...formData , [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('https://sandip-node-4.onrender.com/api/send-email', formData)
      .then((response) => {
        if (response.data.status === 'Success') {
          console.log(response);
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.msg);
      });
  };
  
  return (
    <div class="container d-flex justify-content-center align-items-center vh-100 " >
     
    <div class="col-4 bg-light h-70 rounded-3 p-4 d-flex flex-column align-items-center gap-3"  >
          <h3 className='bg-light fw-bold'>Forgot Password</h3>
          <div className=' d-flex flex-column  justify-content-left '>
            <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Email</h5>   
            <input onChange={handleInputChange} name='email' className='' style={{background : "#D9D9D9", border:"none" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
         </div>
     
         <div>
            <button onClick={handleSubmit} className=' border-0 p-2 rounded-3' style={{minWidth:"10vw" , color:"white", background:"#d4910f" , fontWeight:"600"}}>Get Mail</button>
         </div>
        <h6>Back to Login? <Link to={"/"} style={{textDecoration:"none", color:"#000"}}> <span style={{color:"#d4910f"}}>Login</span></Link></h6>
      
        

    </div>
   
   </div>
  )
}

export default ForgotPassword