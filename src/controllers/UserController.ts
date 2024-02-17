import { type Request, type Response } from "express";
import User from "../../models/User";
import Helper from "../helper/ResponseData";
import PasswordHelper from "../helper/PasswordHelper";
import {
  ExtractRefreshToken,
  GenerateRefreshToken,
  GenerateToken,
} from "../helper/GenerateToken";

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
    if (!matched) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    // generate Token dari JWT for secure

    // 1. inisialisasi data yang akan di generate
    const dataUserWithoutToken = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };
    // 2.generate token
    const token = GenerateToken(dataUserWithoutToken);
    const refreshToken = GenerateRefreshToken(dataUserWithoutToken);

    // 3. dapatkan data dengan tambahan generete token
    const responseUserWithToken = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
      token: token,
    };

    // 4. update isi value tabel database user yang berisi refreshtoken
    user.accessToken = refreshToken;
    await user.save();

    // 5. kirim refresh token ke use cookie
    // note: "resfresh" token hanya nama yang menyesuaikan konteks
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // kalkulasi 1 hari dalam milisecond
    });

    return res
      .status(200)
      .send(Helper.ResponseData(200, "OK", null, responseUserWithToken));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const RefreshToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(201)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }
    const decodedUser = ExtractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(201)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }
    const token = GenerateToken(decodedUser);
    const user = {
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token,
    };

    return res.status(200).send(Helper.ResponseData(200, "OK", null, user));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
