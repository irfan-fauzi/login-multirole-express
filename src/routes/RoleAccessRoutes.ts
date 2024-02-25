import express from 'express'
import { Authenticated } from "../middleware/Authenticated";
import { CreateRoleMenuAccess, DeleteRollMenuAccess, GetAllRoleMenuAccess, GetDetailRoleMenuAccess, GetListRoleMenuAccess, SoftDeleteRollMenuAccess, UpdateRoleMenuAccess } from "../controllers/RollMenuAccessController";
import { AdminRole, ManagerRole } from '../middleware/Authorization';
import MenuValidation from "../middleware/validation/MenuValidation";


const RoleAccessRoutes = express.Router()

// Create
RoleAccessRoutes.post("/role-access",MenuValidation.CreateAccessRoleValidation, Authenticated, AdminRole, CreateRoleMenuAccess)

// Get All
RoleAccessRoutes.get("/role-access/get/all", Authenticated, AdminRole, GetAllRoleMenuAccess)

// Get List
RoleAccessRoutes.get("/role-access", Authenticated, GetListRoleMenuAccess)

// Get Detail
RoleAccessRoutes.get("/role-access/:id", Authenticated, GetDetailRoleMenuAccess)

// Update
RoleAccessRoutes.patch("/role-access/:id", MenuValidation.CreateAccessRoleValidation, Authenticated, AdminRole, UpdateRoleMenuAccess)

// Softdelete
RoleAccessRoutes.delete("/role-access/:id", Authenticated, AdminRole, SoftDeleteRollMenuAccess)

// destroy
RoleAccessRoutes.delete("/role-access/destroy/:id", Authenticated, ManagerRole, DeleteRollMenuAccess)

export default RoleAccessRoutes
