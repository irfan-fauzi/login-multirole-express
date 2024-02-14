import { type Request, type Response } from "express";
import Role from "../../models/Role";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await Role.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
