import storeModel from "../models/store.js"
import bcrypt from "bcrypt"
import { response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import transporter from "../config/emailConfig.js";

export const saveStore = expressAsyncHandler(async(req , res) => {

    const {storeName , storeEmail , password , confirmPassword , adminId , } = req.body;

    const storeExist = await storeModel.findOne({storeEmail});

    if(storeExist) {
        res.status(404).json({status: "failed" , msg: "store already exists"})
    }
    else if(!storeName || !storeEmail || !password || !confirmPassword || !adminId) {
         
        res.status(403).json({status: "failed" , msg: "Please fill all fields"})
    }
  
    else if (password !== confirmPassword) {
        res.status(401).json({status : "failed", msg: "Password does not match"})
    }
    else {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        const data = new storeModel({
            storeName: storeName,
            storeEmail: storeEmail,
            password: hashedPassword,
            confirmPassword: confirmPassword,
            adminId: adminId,
            roles: ['ROLE_STORE_ADMIN'] 
        })
        

        const savestore = await storeModel.create(data)
        
       const token = jwt.sign({storeId: savestore._id} , process.env.SECRET_KEY , {expiresIn: '5d'} )
        res.status(200).json({status: "success" , msg: "Store Saved Successfully" , token : token})
    }

})



export const findAllbyAdminId = expressAsyncHandler(async(req , res) => {

    const { adminId } = req.params

    if(adminId){
          const allStore = await storeModel.find({adminId})

          if(allStore) {
            res.status(200).json(allStore)
          }
          else{
            res.status(404).json({status: "failed" , msg: "Admin do not added store yet" })
          }
    }
    else {
        res.status(404).json({status: "failed" , msg: "Incorrect Admin Id" })
    }

   
})

export const deleteById = expressAsyncHandler(async(req , res) => {
     
    const {id} = req.params

    const user = await storeModel.findById(id)

    if(user){
           
        await storeModel.findByIdAndDelete(id)
        res.status(200).json({status : 'Success' , msg: "User deleted Successfully"})
    }
    else{
        res.status(404).json({status : 'failed' , msg: "User not exist"})
    }
})

export const getone = expressAsyncHandler(async(req , res) => {

   const {id} = req.params;

   const user = await storeModel.findById(id)

   if(user){
     
    res.status(200).json(user)

   }else{
    res.status(404).json({status: "failed" , msg: "User does not exist"})
   }
})

export const updateStore = expressAsyncHandler(async(req,res) => {
     
    const {id} = req.params;

    const user = await storeModel.findById(id)

    if(user){

    const {storeName , storeEmail , password , confirmPassword} = req.body

    const isUserOfEmailExist = await storeModel.findOne({storeEmail , _id: { $ne: id}})

    if(isUserOfEmailExist){
        res.status(404).json({status: "failed" , msg: "User Already exist"})
        
    }
    else{
     

        const updateStore = await storeModel.findByIdAndUpdate(id , req.body , {new: true})

        res.status(200).json({status: "Success" , msg: "User Updated Successfully!" , data : updateStore})
    }


    }
    else{
        res.status(404).json({status: "failed" , msg: "User does not exist"})
    }

})