import { type Request, type Response, type NextFunction } from "express";
import Helper from "../helper/ResponseData";
import SubMenu from "../../models/SubMenu";

// CREATE 
export const CreateSubMenu = async (req: Request, res: Response) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body
    const subMenu = await SubMenu.create({
      name: name, 
      masterMenuId: masterMenuId,
      url: url, 
      title: title, 
      icon: icon,
      ordering: ordering,
      isTargetSelf: isTargetSelf,
      active: true
    })
    return res.status(201).send(Helper.ResponseData(201, "menu created success 🧮", null, subMenu));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// GET ALL 
export const GetAllSubMenu = async (req: Request, res: Response) => {
  try {
    const menu = await SubMenu.findAll()
    return res.status(201).send(Helper.ResponseData(201, "OK", null, menu));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// GET ALL ONLY ACTIVE
export const GetListSubMenu = async (req: Request, res: Response) => {
  try {
    const menu = await SubMenu.findAll({
      where: {
        active: true
      }
    })
    return res.status(201).send(Helper.ResponseData(201, "OK", null, menu));
  } catch (error) {
     return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// GET DETAILS ONE
export const GetDetailSubMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const detailMenu = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!detailMenu) {
      return res.status(404).send(Helper.ResponseData(404, "not found 😢", null, null));
    }
    return res.status(200).send(Helper.ResponseData(201, "OK", null, detailMenu));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// UPDATE
export const UpdateSubMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body
    const subMenu = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if(!subMenu){
      return res.status(404).send(Helper.ResponseData(404, "not found 😢", null, null));
    }

    subMenu.name = name
    subMenu.masterMenuId = masterMenuId
    subMenu.url = url
    subMenu.title = title
    subMenu.icon = icon
    subMenu.ordering = ordering
    subMenu.isTargetSelf = isTargetSelf

    await subMenu.save()
    return res.status(200).send(Helper.ResponseData(201, "OK updated", null, subMenu));
  } catch (error) {
     return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// SOFT DELETE
export const SoftDeleteSubMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subMenu = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if(!subMenu){
      return res.status(404).send(Helper.ResponseData(404, "not found 😢", null, null));
    }
    subMenu.active = false
    await subMenu.save()
    return res.status(200).send(Helper.ResponseData(201, "OK removed 🚯", null, null));
  } catch (error) {
     return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

// HARD DELETE
export const DeletePermanentSubMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subMenu = await SubMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if(!subMenu){
      return res.status(404).send(Helper.ResponseData(404, "not found 😢", null, null));
    }
    await subMenu.destroy()
    return res.status(200).send(Helper.ResponseData(201, "OK removed 🚯 permanant", null, null));
  } catch (error) {
     return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};