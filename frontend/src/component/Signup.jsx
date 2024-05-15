import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

   
  const user = {
    name : '',
    email: '',
    password: '',
    confirmPassword: '',
    tc: false
  }

  const [formData , setFormData] = useState(user);
  
  const handleInputchange = (e) => {
    
    const {name , value} = e.target;
    setFormData({...formData , [name] : value})
  }

  const handleChecked = (e) => {
     
    const {name , checked} = e.target;
    setFormData({...formData , [name] : checked})
  }

  const handleSubmit = (e) => {
   e.preventDefault()

   
    axios.post('https://sandip-node-4.onrender.com/api/create' , formData)
    .then((response) => {
      
     console.log(response)
     alert(response.data.msg)
    })
   .catch((error)=> {
    alert(error.response.data.msg)
   })
  }


  return (
    <div class="container d-flex justify-content-center align-items-center vh-100 " >
     
        <div class="col-4 bg-light h-70 rounded-3 p-4 d-flex flex-column align-items-center gap-3"  >
              <h3 className='bg-light fw-bold'>Signup</h3>
              <div className=' d-flex flex-column  justify-content-left '>
                <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Name</h5>   
                <input className='' 
                 name='name'
                  onChange={handleInputchange}
                style={{background : "#D9D9D9", border:"none" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
             </div>
             <div className=' d-flex flex-column  justify-content-left '>
                <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Email</h5> 
                <input className='' 
                 name='email'
                 onChange={handleInputchange}
                style={{background : "#D9D9D9", border:"none" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
             </div>
             <div className='d-flex flex-column  justify-content-left'>
                <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Password</h5> 
                <input className='' 
                 name='password'
                 onChange={handleInputchange}
                style={{background : "#D9D9D9", border:"none" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
             </div>
             <div className='d-flex flex-column  justify-content-left'>
                <h5  style={{marginRight: "30px" , color:"#3d3c3c"}}>Confirm Password</h5> 
                <input 
                 name='confirmPassword'
                 onChange={handleInputchange}
                style={{background : "#D9D9D9", border:"none" , borderRadius:"10px" , minWidth:"17vw" , padding:"10px"}}></input>
             </div>
             <div className='d-flex flex-row  justify-content-left'>
             <input  onChange={handleChecked} class="form-check-input" type="checkbox"  name='tc' value="" style={{marginRight:"10px"}}></input>
             <h6>Please Accept Terms and Condition</h6>
             </div>
             <div>
                <button type='submit' onClick={handleSubmit}  className=' border-0 p-2 rounded-3' style={{minWidth:"10vw" , color:"white", background:"#d4910f"}}>Submit</button>
             </div>
            <h6>Back to Login? <Link to={"/"} style={{textDecoration:"none", color:"#000"}}> <span style={{color:"#d4910f"}}>Login</span></Link></h6>
          
            
    
        </div>
       
       </div>
    
  )
}

export default Signup