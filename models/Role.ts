import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../config/dbConnect";

interface RoleAttribute {
  id?: number;
  roleName?: string | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttribute, "id">{ }
export interface Roleoutput extends Required<RoleAttribute>{ }

class Role extends Model<RoleAttribute, RoleInput> implements RoleAttribute {
  public id!: number;
  public roleName!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    roleName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnect,
    underscored: false,
  }
);

export default Role
