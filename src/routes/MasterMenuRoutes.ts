import express from "express";
import { CreateMenu, DeletePermanentMenu, GetAllMenu, GetDetailMenu, GetListMenu, SoftDeleteMenu, UpdateMenu } from "../controllers/MasterMenuController";
import { Authenticated } from "../middleware/Authenticated";
import { AdminRole, ManagerRole } from "../middleware/Authorization";

const MasterMenuRoutes = express.Router();

MasterMenuRoutes.get("/menu/all", Authenticated, GetAllMenu);
MasterMenuRoutes.get("/menu/list", Authenticated, GetListMenu);
MasterMenuRoutes.get("/menu/:id", Authenticated, GetDetailMenu);
MasterMenuRoutes.post("/menu", Authenticated, AdminRole, CreateMenu);
MasterMenuRoutes.patch("/menu/:id", Authenticated, AdminRole, UpdateMenu)
MasterMenuRoutes.delete("/menu/delete/:id", Authenticated, AdminRole, SoftDeleteMenu)
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated, ManagerRole, DeletePermanentMenu)

export default MasterMenuRoutes;
