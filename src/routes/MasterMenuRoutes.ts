import express from "express";
import { CreateMenu, DeletePermanentMenu, GetAllMenu, GetDetailMenu, GetListMenu, SoftDeleteMenu, UpdateMenu } from "../controllers/MasterMenuController";
import { Authenticated } from "../middleware/Authenticated";

const MasterMenuRoutes = express.Router();

MasterMenuRoutes.get("/menu/all", Authenticated, GetAllMenu);
MasterMenuRoutes.get("/menu/list", Authenticated, GetListMenu);
MasterMenuRoutes.get("/menu/:id", Authenticated, GetDetailMenu);
MasterMenuRoutes.post("/menu", Authenticated, CreateMenu);
MasterMenuRoutes.post("/menu/update/:id", Authenticated, UpdateMenu)
MasterMenuRoutes.post("/menu/delete/:id", Authenticated, SoftDeleteMenu)
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated, DeletePermanentMenu)

export default MasterMenuRoutes;
