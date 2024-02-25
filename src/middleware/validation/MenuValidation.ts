import Validator from "validatorjs";
import { type Request, type Response, type NextFunction } from "express";
import Helper from "../../helper/ResponseData";
import MasterMenu from "../../../models/MasterMenu";
import SubMenu from "../../../models/SubMenu";
import Role from "../../../models/Role";



const CreateMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, ordering } = req.body;
    const _menu = {
      name,
      icon,
      ordering,
    };
    const rules: Validator.Rules = {
      name: "required|string|max:50",
      icon: "required|string",
      ordering: "required|numeric"
    };

    const validate = new Validator(_menu, rules);
    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }
    const menu = await MasterMenu.findOne({
      where: {
        name: _menu.name
      }
    })
    if(menu){
      const errorData = {
        errors: {
          name: ["name has already used"],
        },
      };
      return res
        .status(500)
        .send(Helper.ResponseData(400, "Bad Request", errorData, null));
    }
    next();
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const CreateSubMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
    const _menu = {
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
    };
    const rules: Validator.Rules = {
      name: "required|string|max:50",
      masterMenuId: "required|numeric",
      url: "required|string",
      title: "required|string|max:50",
      icon: "required|string",
      ordering: "required|numeric",
      isTargetSelf: "required|boolean"
    };

    const validate = new Validator(_menu, rules);
    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }
    const masterMenu = await MasterMenu.findOne({
      where: {
        id: masterMenuId,
        active: true
      }
    })
    if(!masterMenu){
      const errorData = {
        errors: {
          masterMenu: ["masterMenuID not valid"],
        },
      };
      return res
        .status(500)
        .send(Helper.ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const CreateAccessRoleValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId, subMenuId } = req.body;
    const _menu = {
      roleId,
      subMenuId
    };
    const rules: Validator.Rules = {
      roleId: "required|numeric",
      subMenuId: "required|numeric"
    };

    const validate = new Validator(_menu, rules);
    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }
    const role = await Role.findOne({
      where: {
        id: roleId,
        active: true
      }
    })
    if(!role){
      const errorData = {
        errors: {
          role: ["role id not valid"],
        },
      };
      return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null));
    }
    const subMenu = await SubMenu.findOne({
      where: {
        id: subMenuId,
        active: true
      }
    })
    if(!subMenu){
      const errorData = {
        errors: {
          submenu: ["submenu id not valid"],
        },
      };
      return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export default { CreateMenuValidation, CreateSubMenuValidation, CreateAccessRoleValidation };
