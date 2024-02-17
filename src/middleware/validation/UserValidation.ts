import Validator from "validatorjs";
import { type Request, type Response, type NextFunction } from "express";
import Helper from "../../helper/ResponseData";
import User from "../../../models/User";

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ambil data dari req body
    const { name, email, password, confirmPassword } = req.body;
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    // buat rules untuk validasi
    const rules: Validator.Rules = {
      name: "required|string|max:50",
      email: "required|email",
      password: "required|min:8",
      confirmPassword: "required|same:password",
    };

    // bandingkan data yang dikirim dengan rules
    const validate = new Validator(data, rules);
    // jika validasi gagal
    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }

    // jika email sudah digunakan user lain
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const errorData = {
        errors: {
          email: ["Email has already used"],
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

export default { RegisterValidation };
