import express from "express"
import { deleteById, findAllbyAdminId, getone, saveStore, updateStore } from "../controllers/storeController.js";

const storeRoutes = express.Router();

storeRoutes.post("/store/save" , saveStore)
storeRoutes.get("/store/findbyAdminId/:adminId" , findAllbyAdminId)
storeRoutes.delete("/store/delete/:id" , deleteById)
storeRoutes.get("/store/getone/:id" , getone)
storeRoutes.patch("/store/update/:id" , updateStore)

export default storeRoutes