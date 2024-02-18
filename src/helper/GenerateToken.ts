import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface UserData {
  name?: string | null;
  email?: string | null;
  roleId?: number | null;
  verified?: boolean | null;
  active?: boolean | null;
}

export const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: "60m",
  });
  return token;
};

export const GenerateRefreshToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "1d",
  });
  return token;
};

export const ExtractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;
  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }

  return null;
};

export const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

  let resData: any;
  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }

  return null;
};
