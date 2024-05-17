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
        type : boolean ,
        required: true
    },
    
})

export default mongoose.model("Sidebar" , sidebarMenu)