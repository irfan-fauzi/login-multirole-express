import { type Request, type Response, type NextFunction } from "express";
import MasterMenu from "../../models/MasterMenu";
import Helper from "../helper/ResponseData";

export const CreateMenu = async (req: Request, res: Response) => {
  try {
    const { name, icon, ordering } = req.body;
    const masterMenu = await MasterMenu.create({
      name,
      icon,
      ordering,
      active: true,
    });
    return res
      .status(201)
      .send(
        Helper.ResponseData(201, "menu created success 🧮 ", null, masterMenu)
      );
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const GetListMenu = async (req: Request, res: Response) => {
  try {
    const listMenuActive = await MasterMenu.findAll({
      where: {
        active: true,
      },
    });
    return res
      .status(200)
      .send(Helper.ResponseData(201, "OK", null, listMenuActive));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const GetAllMenu = async (req: Request, res: Response) => {
  try {
    const listMenu = await MasterMenu.findAll();
    return res.status(200).send(Helper.ResponseData(201, "OK", null, listMenu));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const GetDetailMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const detailMenu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!detailMenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "not found 😢", null, null));
    }
    return res
      .status(200)
      .send(Helper.ResponseData(201, "OK", null, detailMenu));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "💀", error, null));
  }
};

export const UpdateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, icon, ordering } = req.body;
    const masterMenu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!masterMenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "not found 😢", null, null));
    }

    masterMenu.name = name;
    masterMenu.icon = icon;
    masterMenu.ordering = ordering;

    await masterMenu.save();
    return res
      .status(200)
      .send(
        Helper.ResponseData(
          201,
          "master Menu updated successfully 💝",
          null,
          masterMenu
        )
      );
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "💀", error, null));
  }
};

export const SoftDeleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const masterMenu = await MasterMenu.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!masterMenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "not found 😢", null, null));
    }

    masterMenu.active = false;
    await masterMenu.save();
    return res
      .status(200)
      .send(
        Helper.ResponseData(
          201,
          "removed 🚯",
          null,
          masterMenu
        )
      );
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const DeletePermanentMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const masterMenu = await MasterMenu.findByPk(id);

    if (!masterMenu) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "not found 😢", null, null));
    }
    await masterMenu.destroy()
    return res
      .status(201)
      .send(
        Helper.ResponseData(
          201,
          "master menu deleted succesfully 🚯",
          null,
          null
        )
      );
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
