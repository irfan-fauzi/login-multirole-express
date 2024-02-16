import { type Request, type Response } from "express";
import User from "../../models/User";
import Helper from "../helper/Helper";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      active: true,
      verified: true,
      roleId: 1,
    });
    return res
      .status(201)
      .send(Helper.ResponseData(201, "Created", null, user));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
