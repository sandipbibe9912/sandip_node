import mongoose from "mongoose";
import sidebarMenu from "./sidebarMenu.js";


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



// const userSidebar = mongoose.model("UserSidebar", userSidebarSchema);
// export default userSidebar;

export default mongoose.model("UserSidebar" , userSidebar)