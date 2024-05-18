import expressAsyncHandler from "express-async-handler"
import userSidebar from "../models/userSidebar.js"


export const addSidebar = expressAsyncHandler(async(req , res) => {

   const { storeId , userId , sidebarMenu} = req.body
  
   if(!storeId || !userId || !Array.isArray(sidebarMenu)) {
     
     res.status(404).json({status : "failed" , msg : "Please enter the data first "})
   }
   else{

      const data = new  userSidebar({
        storeId,
        userId,
        sidebarMenu,
      })

    const datas =   await userSidebar.create(data)

      res.status(200).json({status : "Success" , msg : "Successfully added!" , data : datas})
   }

})