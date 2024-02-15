import { type Request, type Response } from "express";
import Role from "../../models/Role";

export const getRoles = async (req: Request, res: Response) => {
  try {
    // const response = await Role.findAll({
    //   where: {
    //     active: true, // show only status active
    //   },
    // });
    const response = await Role.findAll();
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

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).send({
        status: 404,
        message: "😢 Data not found",
        data: null,
      });
    }

    role.roleName = roleName;
    role.active = active;

    await role.save();

    return res.status(200).send({
      status: 200,
      message: "🎉 role succesfully updated",
      data: role,
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
