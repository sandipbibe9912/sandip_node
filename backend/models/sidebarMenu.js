import mongoose from "mongoose";


const sidebarMenu = new mongoose.Schema({

    name : {
        type : String , 
        required: true
    },
    path : {
        type : String ,
        required: true
    },
    status : {
        type : Boolean ,
        required: true
    },
    
})

export default sidebarMenu