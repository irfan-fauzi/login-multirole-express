import { type Request, type Response } from "express";
import User from "../../models/User";
import Helper from "../helper/ResponseData";
import PasswordHelper from "../helper/PasswordHelper";
import {
  ExtractRefreshToken,
  GenerateRefreshToken,
  GenerateToken,
} from "../helper/GenerateToken";
import Role from "../../models/Role";

export const UserRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, active, roleId } = req.body;
    const hashPassword = await PasswordHelper.PasswordHashing(password);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      active: active,
      verified: true,
      roleId: roleId,
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

    // 3. dapatkan data dengan tambahan generete token baru
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

export const RefreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken; // req.cookies?."refreshToken" di ambil dari nama

    //  ------------------- jika refresh token tidak ada

    if (!refreshToken) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    // refresh token
    const decodedUser = ExtractRefreshToken(refreshToken);

    //  ------------------- jika refresh token tidak ada
    if (!decodedUser) {
      return res
        .status(201)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    const token = GenerateToken({
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

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

export const UserDetail = async (req: Request, res: Response) => {
  try {
    // ambil email dari res.local (dari file Auth.ts) di middleware
    const email = res.locals.email;
    // cari email apakah ada yang sama dengan di database
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Role,
        attributes: ["id", "roleName"]
      }
    });
    if (!user) {
      return res
        .status(500)
        .send(Helper.ResponseData(404, "Not found", null, null));
    }

    // bisa juga dikosongkan password dan tokennya untuk keamanan
    user.password = "";
    user.accessToken = "";

    return res.status(500).send(Helper.ResponseData(200, "", null, user));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export const UserLogout = async (req: Request, res: Response) => {
  try {
    //
    const email = res.locals.email;
    const refreshToken = req.cookies?.refreshToken;
    // jika refresh token di cookie tidak ada
    if (!refreshToken) {
      // ya pasti sudah logout
      return res
        .status(200)
        .send(Helper.ResponseData(200, "User Logout", null, null));
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user)
    // jika user tidak ditemukan (bisa karena token nya sudah kadaluarsa)
    if (!user) {
      // maka bisa kita langsung hapus saja cookeis nya
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(Helper.ResponseData(200, "User Logout", null, null));
    }
    // jika user ditemukan, maka update personal akses tokennya dibuang di database
    await User.update(
      { accessToken: null },
      {
        where: {
          email: email,
        },
      }
    );
    // setelah itu hapus refresh tokennya di cookie
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .send(Helper.ResponseData(200, "User Logout", null, null));
  } catch (error) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
