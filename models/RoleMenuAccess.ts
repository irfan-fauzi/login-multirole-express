import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../config/dbConnect";
import SubMenu from "./SubMenu";
import Role from "./Role";

interface RoleMenuAccessAttribute {
  id?: number;
  roleId?: number | null;
  subMenuId?: number | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleMenuAccessInput extends Optional<RoleMenuAccessAttribute, "id">{ }
export interface Roleoutput extends Required<RoleMenuAccessAttribute>{ }

class RoleMenuAccess extends Model<RoleMenuAccessAttribute, RoleMenuAccessInput> implements RoleMenuAccessAttribute {
  public id!: number;
  public roleId!: number;
  public subMenuId!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoleMenuAccess.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    roleId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    subMenuId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnect,
    underscored: false,
  }
);

RoleMenuAccess.belongsTo(SubMenu, {
  foreignKey: "subMenuId"
})

RoleMenuAccess.belongsTo(Role, {
  foreignKey: "roleId"
})

export default RoleMenuAccess
