import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../config/dbConnect";

interface UserAttribute {
  id?: number;
  name?: string | null;
  email?: string | null;
  roleId?: number | null;
  password?: string | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttribute, "id"> {}
export interface Useroutput extends Required<UserAttribute> {}

class User extends Model<UserAttribute, UserInput> implements UserAttribute {
  public id!: number;
  public name!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;
  public accessToken!: string;
  public verified!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnect,
    underscored: false,
  }
);

export default User;
