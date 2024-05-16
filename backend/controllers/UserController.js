import userModel from "../models/User.js"
import bcrypt from "bcrypt"
import { response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import transporter from "../config/emailConfig.js";

export const saveUser = expressAsyncHandler(async(req , res) => {

    const {name , email , password , confirmPassword , tc} = req.body;

    const userExist = await userModel.findOne({email});

    if(userExist) {
        res.status(404).json({status: "failed" , msg: "User already exists"})
    }
    else if(!name || !email || !password || !confirmPassword || !tc) {
         
        res.status(403).json({status: "failed" , msg: "Please fill all fields"})
    }
    else if(tc === 'false') {
        res.status(402).json({status: "failed" , msg: "Please checked the terms and condition"})
   }
    else if (password !== confirmPassword) {
        res.status(401).json({status : "failed", msg: "Password does not match"})
    }
    else {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        const data = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            confirmPassword:confirmPassword,
            tc:tc,
        })

        const saveUser = await userModel.create(data)
       const token = jwt.sign({userId: saveUser._id} , process.env.SECRET_KEY , {expiresIn: '5d'} )
        res.status(200).json({status: "success" , msg: "User Saved Successfully" , token : token})
    }

})

export const editUser = expressAsyncHandler(async(req , res) => {

    const {id} = req.params;

    const existWithId = await userModel.findById(id)

    if(!existWithId) {
        res.status(404).json({status: "failed" , msg: "User with id not found"})
    }
    else{
        const {name , email , password , confirmPassword , tc} = req.body;

        const isUserExistWithEmail = await userModel.findOne({email , _id: { $ne: id}})
        if(isUserExistWithEmail){
            res.status(404).json({status: "failed" , msg: "User Already exist"})
        }
        else {
            const updateUser = await userModel.findByIdAndUpdate(id , req.body , {new: true})

           
                res.status(200).json({status: "success" , msg: "User Updated Successfully"})
          
        }

    }

})

export const fetchOne = expressAsyncHandler(async(req , res) => {

     const {id} = req.params;

     const isUserExist = await userModel.findById(id)
     if(!isUserExist) {
        res.status(404).json({status: "failed" , msg: "User not found"})
     }
     else{
        res.status(200).json(isUserExist)
     }
})

export const fetchAll = expressAsyncHandler(async(req , res) => {

     const getAllUser = await userModel.find().select('-password -confirmPassword');

     if(!getAllUser) {
          
        res.status(404).json({status: "failed" , msg: "Users not found"})
     }
     res.status(200).json({status: "Success" , msg: "Users found" , data: getAllUser})
})

export const deleteOne = async(req , res) => {
    const {id} = req.params

    const fetchById = await userModel.findById(id)

    if(!fetchById){
        res.status(404).json({status: "failed" , msg: "User not found"})
    }

    await userModel.findByIdAndDelete(id)

    res.status(404).json({status: "failed" , msg: "User deleted successfully"})
}

export const loginUser = expressAsyncHandler(async(req , res) => {
     
    const {email , password} = req.body
 if(email && password) {

 const isUserExist = await userModel.findOne({email})
    if(isUserExist)  {
        const isMatch = await bcrypt.compare(password , isUserExist.password)

        if(isMatch && (email === isUserExist.email))
            {
                const jwttoken = jwt.sign({userId: isUserExist._id} , process.env.SECRET_KEY , {expiresIn: '50m'})
                res.status(200).json({status: "success" , msg: "Login Successfull" , token: jwttoken , user : isUserExist})
            }
            else{
                res.status(200).json({status: "failure" , msg: "Email or Password does not match" })
            }
    }
    else{
        res.status(404).json({status: "failed" , msg: "User not exist"})
    }

}
else {
    res.status(404).json({status: "failed" , msg: "Provide both Email and Password"})
}
})

// export const logout = (async(req , res) => {
    
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     res.status(200).json({ status: "Success", msg: "Logout successful" });
// }
// )

export const changepassword = async(req , res) => {
   
    const {password , confirmPassword} = req.body

    if(password && confirmPassword) {
       
     if(password !== confirmPassword) {
         res.status(404).json({status: "failed" , msg : "Password does not match"})
     }
     else{
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password , salt)
          //console.log(req.user._id)

         await userModel.findByIdAndUpdate(req.user._id , {$set:{password: hashedPassword , confirmPassword: confirmPassword}})
         // req.user : u will get req.user from middleware where we have pass token that generate when user login then it will validate that token 
             //using jwt.verify(token , process.env.SECRET_key) and  in output req.user will get
          res.status(200).json({status: "success" , msg : "Password changed successfully"})
     }
    }
    else {
     res.status(404).json({status: "failed" , msg : "All fields are mandatory"})
    }
}

export const loggedUser = expressAsyncHandler(async(req , res) => {

    res.send({"Data" : req.user})
})

export const sendPasswordResetEmail = expressAsyncHandler(async(req , res) => {

    const {email} = req.body

    if(email){
         
        const user = await userModel.findOne({email})

        if(user){

            const secret =  user._id + process.env.SECRET_KEY
            const token = jwt.sign({userId: user._id} , secret , {expiresIn: '15m'})
            
            const link = `https://graceful-moxie-b01643.netlify.app/resetpassword/${user._id}/${token}`
            console.log(link)

          let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password Reset Link",
            html: `<a href=${link}/>Click here to reset password</a>`
          })
        

            res.status(200).json({status: "Success" , msg: "Email sent successfully on your Registered Email! Please check your email" , "info" : info}) 
        }
        else{
            res.status(404).json({status: "failed" , msg: "User does not exist"})
        }
    }
    else{
        res.status(404).json({status: "failed" , msg: "Please provide email first"})
    }

})


export const userPasswordReset = async(req , res) => {

    const {password , confirmPassword} = req.body
    const {id , token} = req.params

    const user = await userModel.findById(id)

    const newtoken = user._id + process.env.SECRET_KEY

    try{

        jwt.verify(token , newtoken)

        if(password && confirmPassword){
          
            if(password === confirmPassword){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password , salt)
                await userModel.findByIdAndUpdate(user._id , {$set: {password: hashedPassword , confirmPassword: confirmPassword}})
                res.status(404).json({status: "Succcess" , msg: "Password reset successfully"})
            }   
            else{
                res.status(404).json({status: "failed" , msg: "Password and ConfirmPassword do not match"})
            }
        }
        else{
            res.status(404).json({status: "failed" , msg: "All fields required"})
        }
    }
    catch(error){
        res.status(404).json({status: "failed" , msg: "Invalid token"})
    }
}