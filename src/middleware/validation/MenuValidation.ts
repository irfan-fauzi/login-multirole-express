import Validator from "validatorjs";
import { type Request, type Response, type NextFunction } from "express";
import Helper from "../../helper/ResponseData";
import MasterMenu from "../../../models/MasterMenu";


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
      ordering: "required|integer"
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
      masterMenuId: "required|integer",
      url: "required|string",
      title: "required|string|max:50",
      icon: "required|string",
      ordering: "required|integer",
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

export default { CreateMenuValidation, CreateSubMenuValidation };
