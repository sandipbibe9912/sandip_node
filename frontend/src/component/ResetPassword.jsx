import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
 
  const {id , token} = useParams()
  const user = {
    password: '',
    confirmPassword: ''
  }

  const [formData , setFormData] = useState(user)

  const handleInputChange = (e) => {
     const {name , value} = e.target
     setFormData({...formData , [name] : value})
  }

  const handleResetPassword = async(e) => {
     
    e.preventDefault()

    await axios.post(`http://localhost:8009/api/reset-password/${id}/${token}` , formData)
    .then((response) => {
        if(response.data.msg === 'Success'){
            alert(response.data.msg)
            console.log(response)
        }
        else{
          alert(response.data.msg)
        }
    }).catch((error) => {
      alert(error.response.data.msg)
    })

  }

  return (
    <div class="container d-flex justify-content-center align-items-center vh-100 " >
 
    <div class="col-4 bg-light h-50 rounded-3 p-4 d-flex flex-column align-items-center gap-3"  >
        
          <h3 className='bg-light fw-bold'>Reset Password</h3>
         
         <div className=' d-flex flex-column  justify-content-left '>
            <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Password</h5> 
            <input 
            name='password'
            onChange={handleInputChange}
            style={{background : "#D9D9D9", border:"NONE" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
         </div>
         <div className='d-flex flex-column  justify-content-left'>
            <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Confirm Password</h5> 
            <input className='' 
                name='confirmPassword'
                onChange={handleInputChange}
                style={{background : "#D9D9D9", border:"NONE" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
         </div>
         <Link to={"/forgot-password"} style={{textDecoration:"none", color:"#000"}}> 
         <h6 style={{color:"#d4910f"}}>forgot Password?</h6>
         </Link>
         <div>

            <button type='submit' onClick={handleResetPassword} className='border-0 p-2 rounded-3' style={{minWidth:"10vw" , color:"white", background:"#d4910f"}}>Submit</button>
           
         </div>
       
       <h6>Not have Account? <Link to={"/signup"} style={{textDecoration:"none", color:"#000"}}> <span style={{color:"#d4910f"}}>Sign up</span></Link></h6>
      
       <h6>Go to login? <Link to={"/"} style={{textDecoration:"none", color:"#000"}}> <span style={{color:"#d4910f"}}>Login</span></Link></h6>

    </div>
   
   </div>
  )
}

export default ResetPassword