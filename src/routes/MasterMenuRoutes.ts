import express from "express";
import { CreateMenu, DeletePermanentMenu, GetAllMenu, GetDetailMenu, GetListMenu, SoftDeleteMenu, UpdateMenu } from "../controllers/MasterMenuController";
import { Authenticated } from "../middleware/Authenticated";
import { AdminRole, ManagerRole } from "../middleware/Authorization";
import MenuValidation from "../middleware/validation/MenuValidation";

const MasterMenuRoutes = express.Router();

// GET ALL
MasterMenuRoutes.get("/menu/get/all", Authenticated, ManagerRole, GetAllMenu);

// GET ONLY ACTIVE
MasterMenuRoutes.get("/menu", Authenticated, GetListMenu);
// ----------------------------------------------------------------

// GET DETAIL ONE
MasterMenuRoutes.get("/menu/:id", Authenticated, GetDetailMenu);
// ----------------------------------------------------------------

// CREATE
MasterMenuRoutes.post("/menu", MenuValidation.CreateMenuValidation, Authenticated, AdminRole, CreateMenu);

// UPDATE
MasterMenuRoutes.patch("/menu/:id",MenuValidation.CreateMenuValidation, Authenticated, AdminRole, UpdateMenu);

// SOFT DELETE
MasterMenuRoutes.delete("/menu/:id", Authenticated, AdminRole, SoftDeleteMenu);

// DELETE PERMANENT
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated, ManagerRole, DeletePermanentMenu);

export default MasterMenuRoutes;
