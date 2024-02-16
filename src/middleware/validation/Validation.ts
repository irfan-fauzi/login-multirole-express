import Validator from "validatorjs";
import { type Request, type Response, type NextFunction } from "express";
import Helper from "../../helper/Helper";

export const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, confirmPassword } = req.body;
  const data = {
    name,
    email,
    password,
    confirmPassword,
  };

  const rules: Validator.Rules = {
    name: "required|string|max:50",
    email: "required|email",
    password: "required|min:8",
    confirmPassword: "required|same:password",
  };

  const validate = new Validator(data, rules);

  if (validate.fails()) {
    return res
      .status(400)
      .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
  }
  next();
};

