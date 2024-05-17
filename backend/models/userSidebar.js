import mongoose from "mongoose";
import sidebarMenu from "./sidebarMenu";


const userSidebar = new mongoose.Schema({

    storeId : {
        type : String,
        required: true
    },
    userId : {
        type : String,
        required: true
    },
    sidebarMenu : [sidebarMenu]
})

export default mongoose.model("userSidebar" , userSidebar)