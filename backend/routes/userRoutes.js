import express from "express"


import {  changepassword, deleteOne, editUser, fetchAll, fetchOne, fetchUserIdandName, loggedUser, loginUser, saveUser, sendPasswordResetEmail, userPasswordReset } from "../controllers/adminController.js";
import { validateUser } from "../middleware/auth-middleware.js";

const routes = express.Router();

routes.use("/changepassword" , validateUser)
routes.use("/logged-user" , validateUser)

routes.post("/create" , saveUser)
routes.put("/update/:id" , editUser)
routes.get("/getone/:id" , fetchOne)
routes.get("/getall" , fetchAll)
routes.get("/fetchOnlyNameAndId/:storeId" , fetchUserIdandName)
routes.delete("/delete/:id" , deleteOne)
routes.post("/login" , loginUser)
// routes.get("/logout" , logout)
routes.get("/changepassword" , changepassword)
routes.get("/logged-user" , loggedUser)
routes.post("/send-email" , sendPasswordResetEmail)
routes.post("/reset-password/:id/:token" , userPasswordReset)

export default routes