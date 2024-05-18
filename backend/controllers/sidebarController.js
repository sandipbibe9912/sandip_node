import expressAsyncHandler from "express-async-handler"
import userSidebar from "../models/userSidebar.js"


export const addSidebar = expressAsyncHandler(async(req , res) => {

   const { storeId , userId , sidebarMenu} = req.body

   const data = await userSidebar.findOne({userId})


  
   if(!storeId || !userId || !Array.isArray(sidebarMenu)) {
     
     res.status(404).json({status : "failed" , msg : "Please enter the data first "})
   }
   else if (!data){

      const dataa = new  userSidebar({
        storeId,
        userId,
        sidebarMenu,
      })

    const datas =   await userSidebar.create(dataa)

      res.status(200).json({status : "Success" , msg : "Successfully added!" , data : datas})
   }
   else{
          
    res.status(401).json({status : "failure" , msg : "Already assigned Role!!!"})
   }

})