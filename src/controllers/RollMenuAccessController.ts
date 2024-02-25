import { type Request, type Response } from "express";
import Role from "../../models/Role";
import Helper from "../helper/ResponseData";
import RoleMenuAccess from "../../models/RoleMenuAccess";
import SubMenu from "../../models/SubMenu";

// create
export const CreateRoleMenuAccess = async (req: Request, res: Response) => {
  try {
    const {roleId, subMenuId} = req.body
    const access = await RoleMenuAccess.create({
      roleId, 
      subMenuId,
      active: true
    })
    return res.status(201).send(Helper.ResponseData(201, "OK created", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// get List 
export const GetListRoleMenuAccess = async (req: Request, res: Response) => {
  try {
    const access = await RoleMenuAccess.findAll({
      where: {
        active: true
      },
      include: [
        {
          model: SubMenu,
          attributes: ['name']
        },
        {
          model: Role,
          attributes: ['roleName']
        }
      ]
    })
    return res.status(200).send(Helper.ResponseData(200, "OK get List", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// get All
export const GetAllRoleMenuAccess = async (req: Request, res: Response) => {
  try {
    const access = await RoleMenuAccess.findAll({
      include: [
        {
          model: SubMenu,
          attributes: ['name']
        },
        {
          model: Role,
          attributes: ['roleName']
        }
      ]
    })
    return res.status(201).send(Helper.ResponseData(200, "OK get all", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// get detail
export const GetDetailRoleMenuAccess = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const access = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true
      },
      
    })
    if(!access){
      return res.status(404).send(Helper.ResponseData(404, "Not found", null, null));
    }
    return res.status(201).send(Helper.ResponseData(200, "OK", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};


// update
export const UpdateRoleMenuAccess = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const {roleId, subMenuId} = req.body
    const access = await RoleMenuAccess.findOne({
      where: {
        id,
        active: true
      }
    })
    if(!access){
      return res.status(404).send(Helper.ResponseData(404, "Not found", null, null));
    }
    access.roleId = roleId
    access.subMenuId = subMenuId
    await access.save()
    return res.status(201).send(Helper.ResponseData(200, "OK updated", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// soft delete
export const SoftDeleteRollMenuAccess = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const access = await RoleMenuAccess.findOne({
      where: {
        id,
        active: true
      }
    })
    if(!access){
      return res.status(404).send(Helper.ResponseData(404, "Not found", null, null));
    }
    access.active = false
    await access.save()
    return res.status(201).send(Helper.ResponseData(200, "OK", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// destroy
export const DeleteRollMenuAccess = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const access = await RoleMenuAccess.findOne({
      where: {
        id,
        active: true
      }
    })
    if(!access){
      return res.status(404).send(Helper.ResponseData(404, "Not found", null, null));
    }
    await access.destroy()
    return res.status(201).send(Helper.ResponseData(200, "OK", null, access));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};