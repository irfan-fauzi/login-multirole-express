import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/RolesController";
import { Authenticated } from "../middleware/Authenticated";
import { ManagerRole} from "../middleware/Authorization"

const RoleRoutes = express.Router();

RoleRoutes.get("/role", Authenticated, getAllRoles);
RoleRoutes.get("/role/:id", getRoleById);

RoleRoutes.post("/role",Authenticated, ManagerRole, createRole);
RoleRoutes.post("/role/:id", Authenticated, ManagerRole, updateRole);
RoleRoutes.delete("/role/:id",Authenticated, ManagerRole, deleteRole);

export default RoleRoutes;
