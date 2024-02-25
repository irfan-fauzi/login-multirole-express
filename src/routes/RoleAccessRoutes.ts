import express from 'express'
import { Authenticated } from "../middleware/Authenticated";
import { CreateRoleMenuAccess, DeleteRollMenuAccess, GetAllRoleMenuAccess, GetDetailRoleMenuAccess, GetListRoleMenuAccess, SoftDeleteRollMenuAccess, UpdateRoleMenuAccess } from "../controllers/RollMenuAccessController";

const RoleAccessRoutes = express.Router()

// Create
RoleAccessRoutes.post("/role-access", Authenticated, CreateRoleMenuAccess)

// Get All
RoleAccessRoutes.get("/role-access/get/all", Authenticated, GetAllRoleMenuAccess)

// Get List
RoleAccessRoutes.get("/role-access", Authenticated, GetListRoleMenuAccess)

// Get Detail
RoleAccessRoutes.get("/role-access/:id", Authenticated, GetDetailRoleMenuAccess)

// Update
RoleAccessRoutes.patch("/role-access/:id", Authenticated, UpdateRoleMenuAccess)

// Softdelete
RoleAccessRoutes.delete("/role-access/:id", Authenticated, SoftDeleteRollMenuAccess)

// destroy
RoleAccessRoutes.delete("/role-access/destroy/:id", Authenticated, DeleteRollMenuAccess)

export default RoleAccessRoutes
