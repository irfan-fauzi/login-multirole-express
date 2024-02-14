import { type Request, type Response } from "express";
import Role from "../../models/Role";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await Role.findAll({
      where: {
        active: true,
      },
    });
    return res.status(200).send({
      status: 200,
      message: "👍 OKE",
      data: response,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: `😢 error because: ${error.message}`,
        errors: error,
      });
    }
    return res.status(500).send({
      status: 500,
      message: `🖥 internal server error`,
      errors: error,
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { roleName, active } = req.body;
    const newRole = await Role.create({ roleName, active });
    return res.status(201).send({
      status: 201,
      message: "💟 created",
      data: newRole,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: `😢 error because: ${error.message}`,
        errors: error,
      });
    }
    return res.status(500).send({
      status: 500,
      message: `🖥 internal server error`,
      errors: error,
    });
  }
};
