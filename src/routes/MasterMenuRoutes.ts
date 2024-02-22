import express from "express";
import { CreateMenu, DeletePermanentMenu, GetAllMenu, GetDetailMenu, GetListMenu, SoftDeleteMenu, UpdateMenu } from "../controllers/MasterMenuController";
import { Authenticated } from "../middleware/Authenticated";
import { AdminRole, ManagerRole } from "../middleware/Authorization";
import MenuValidation from "../middleware/validation/MenuValidation";

const MasterMenuRoutes = express.Router();

MasterMenuRoutes.get("/menu/all", Authenticated, GetAllMenu);
MasterMenuRoutes.get("/menu", Authenticated, GetListMenu);
MasterMenuRoutes.get("/menu/:id", Authenticated, GetDetailMenu);
MasterMenuRoutes.post("/menu", MenuValidation.CreateMenuValidation, Authenticated, AdminRole, CreateMenu);
MasterMenuRoutes.patch("/menu/:id",MenuValidation.CreateMenuValidation, Authenticated, AdminRole, UpdateMenu);
MasterMenuRoutes.delete("/menu/:id", Authenticated, AdminRole, SoftDeleteMenu);
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated, ManagerRole, DeletePermanentMenu);

export default MasterMenuRoutes;
