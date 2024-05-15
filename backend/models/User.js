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
  tc: {
    type: Boolean,
    required: true,
  },

})

export default mongoose.model("FinalUser" , userSchema)