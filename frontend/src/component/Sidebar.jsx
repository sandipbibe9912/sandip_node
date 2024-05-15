import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const sidebar = [ 

   {
    id: 1,
    name: "Add Store",
    path: "/add-store"
   },
   {
    id: 2,
    name: "Store List",
    path: "/store-list"
   },
   {
    id: 3,
    name: "Add User",
    path: "/add-user"
   },
   {
    id: 3,
    name: "User List",
    path: "/user-list"
   },


  ]
  
  const [isHovered , setIsHovered] = useState(false)
  const handleMouseEnter = (index) => {
    setIsHovered(index)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div style={{minWidth:"13vw" , width: "13vw",  background:"#fff" , height:"100vh" , position:"fixed",  }}>

     {sidebar.map((data , index) => (

        <div key={index} style={{position:"relative" , marginBottom: "20px" , background: isHovered ? '#ddebf0' : "transparent", marginTop:"20px", padding: "5px 10px", borderRight: isHovered ? "5px solid #e6be63" : "none"}}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
            <Link to={data.path} style={{textDecoration:"none"}}>
            <h6 className='para'>{data.name}</h6>
           </Link>
            </div>
     ))}


    </div>
  )
}

export default Sidebar