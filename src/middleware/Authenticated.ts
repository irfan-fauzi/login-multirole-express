import { type Request, type Response, type NextFunction } from "express";
import Helper from "../helper/ResponseData";
import { ExtractToken } from "../helper/GenerateToken";

export const Authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ambil data dari header authorization, setiap request haru ada header authorization yang berisi token
    const authToken = req.headers["authorization"];
    // karena token valuenya "Bearer[spasi]isitoken" maka ambil yang index ke 2 yaitu token tsb
    const token = authToken && authToken.split(" ")[1];

    // jika token kosong maka unauthorized
    if (token === null) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "unAuthorized", null, null));
    }

    // extrackt token baru menggantikan token lama
    // extract token sudah di atur setiap 20 detik maka akan ganti dengan token baru
    const result = ExtractToken(token!);

    // jika null artinya token sudah kadaluarsa
    if (result === null) {
      // maka waktu akses habis
      return res
        .status(401)
        .send(Helper.ResponseData(401, "UnAuthorized time out", null, null));
    }

    //  NOTE -------kirim data email user yang sudah di ekstraxt setelah login ke variable res.local
    // NOTE ------ yang selanjutnya bisa di akses di controller / middleware selanjutnya
    res.locals.email = result?.email;
    res.locals.roleId = result?.roleId;
    // jika token berhasil diperbarui maka akan lanjut menjalankan controller di user Controller
    next();
  } catch (error) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "auth failed", error, null));
  }
};
