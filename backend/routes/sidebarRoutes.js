import express from "express"
import { addSidebar } from "../controllers/sidebarController.js";

const sidebarRoutes = express.Router();

sidebarRoutes.post("/sidebar/add" , addSidebar)

export default sidebarRoutes