import { type Request, type Response, type NextFunction } from "express";
import Helper from "../helper/ResponseData";

export const ManagerRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    // di bagian authenticated kita mendefinisikan re.locals.roleId
    // disini kita tangkap sebagai identifikasi roleId
    const roleId = res.locals.roleId;
    
    // // jika roleId tidak sesuai -> maka forbidden
    if (roleId !== 1) {
      return res
        .status(500)
        .send(Helper.ResponseData(403, "Forbidden", null, null));
    }
    // jika roleId sesuai, maka bisa dilanjut ke middleware selanjutnya
    next();
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const BasicUser = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};


