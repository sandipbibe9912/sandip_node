import  jwt  from "jsonwebtoken";
import userModel from "../models/User.js"

export var validateUser = async(req , res , next) => {

    let token 

    const  {authorization} = req.headers

    if(authorization && authorization.startsWith('Bearer')) {

        try{
             
            token = authorization.split(' ')[1]

            const {userId} = jwt.verify(token , process.env.SECRET_KEY)
            console.log(authorization)
            //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNmMWVjMjk5MTZmNzNkM2VjNTU4MmIiLCJpYXQiOjE3MTU2NjUyOTIsImV4cCI6MTcxNTY2ODI5Mn0.EAqQSZpQLVpTy2XpTcU292q2kDihh8jahU9ZuKJi66M
          
            req.user = await userModel.findById(userId).select('-password')

            console.log(req.user)
            // {
            //     _id: new ObjectId('663f1ec29916f73d3ec5582b'),
            //     name: 'Sandip',
            //     email: 'sbie01@gmail.com',
            //     confirmPassword: '123456',
            //     tc: true,
            //     __v: 0
            //   }
              
           next()
        }
        catch(error){
            res.status(401).send({"status" : "failed" , "message" : "unauthorized user"})
        }
    }
    if(!token){
        res.status(401).send({"status" : "failed" , "message" : "unauthorized user, No token"})
    }
}