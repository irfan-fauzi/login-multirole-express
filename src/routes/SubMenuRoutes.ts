import express from "express";
import { Authenticated } from "../middleware/Authenticated";
import { AdminRole, ManagerRole } from "../middleware/Authorization";
import {
  CreateSubMenu,
  DeletePermanentSubMenu,
  GetAllSubMenu,
  GetDetailSubMenu,
  GetListSubMenu,
  SoftDeleteSubMenu,
  UpdateSubMenu,
} from "../controllers/SubMenuController";
import MenuValidation from "../middleware/validation/MenuValidation";

const SubMenuRouter = express.Router();

// GET ALL
SubMenuRouter.get(
  "/submenu/get/all", 
  Authenticated, 
  GetAllSubMenu
);

// CREATE
SubMenuRouter.post(
  "/submenu",
  MenuValidation.CreateSubMenuValidation,
  Authenticated,
  AdminRole,
  CreateSubMenu
);

// GET ONLY ACTIVE
SubMenuRouter.get(
  "/submenu", 
  Authenticated, 
  GetListSubMenu
);

// GET DETAIL
SubMenuRouter.get(
  "/submenu/:id",
   Authenticated, 
   GetDetailSubMenu
);

// UPDATE
SubMenuRouter.patch(
  "/submenu/:id",
  // MenuValidation.CreateSubMenuValidation,
  Authenticated,
  AdminRole,
  UpdateSubMenu
);

// SOFT DELETE
SubMenuRouter.delete(
  "/submenu/:id",
  Authenticated,
  AdminRole,
  SoftDeleteSubMenu
);

// DELETE PERMANANET
SubMenuRouter.delete(
  "/submenu/destroy/:id",
  Authenticated,
  ManagerRole,
  DeletePermanentSubMenu
);

export default SubMenuRouter;
