import mongoose from "mongoose";

const storeModel = new mongoose.Schema({

    storeName: {
        type: String,
        required: true,
      },
      storeEmail: {
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
     adminId: {
       type: String,
       required: true,
     },
     createdDate: {
        type: Date,
        default: Date.now,
      },
      updatedDate: {
        type: Date,
      },
     roles : {
        type : [{
                type: String,
                enum: ['ROLE_STORE_ADMIN' , 'ROLE_ADMIN' , 'ROLE_USER'],
                default: ['ROLE_STORE_ADMIN']
              }]           
     }


})


export default mongoose.model("Store" , storeModel)

