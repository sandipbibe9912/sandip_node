import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

   name: {
     type: String,
     required: true,
   },
   email: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  storeId: {
    type: String,
    required: true,
  },
  tc: {
    type: Boolean,
    required: true,
  },

roles: {
   type : [{
      type: String,
      enum: ['ROLE_ADMIN' , 'ROLE-SUPER_ADMIN' , 'ROLE_USER'],
      default: ['ROLE_ADMIN']
   }]
}



})

export default mongoose.model("FinalUser" , userSchema)