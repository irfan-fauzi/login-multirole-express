import { type Request, type Response } from "express";
import User from "../../models/User";
import Helper from "../helper/Helper";
import PasswordHelper from "../helper/PasswordHelper";

export const UserRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const hashPassword = await PasswordHelper.PasswordHashing(password);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
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

export const UserLogin = async (req: Request, res: Response) => {
  try {
    // ambil email dan password dari user
    const { email, password } = req.body;

    // cari email yang dimasukan user apakah ada yang sama dengan di database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // catatan: jika email tidak ada jangan pernah kasih respon "email tidak ditemukan, karena user bisa saja pakai email lain / potensi hack akun"
    if (!user) {
      // better kasih respon unauthorized
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    //  next step => komparasi password yang user input dengan password di database
    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );

    // jika tidak cocok antara input dari user dengan password database
    if(!matched){
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    return res.status(201).send(Helper.ResponseData(500, `welcome ${user.name} you're Login 😃`, null, user));

  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
