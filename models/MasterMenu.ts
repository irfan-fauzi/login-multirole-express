import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../config/dbConnect";
import SubMenu from "./SubMenu";

interface MasterMenuAttribute {
  id?: number;
  name?: string | null;
  icon?: string | null;
  ordering?: number | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface MasterMenuInput extends Optional<MasterMenuAttribute, "id">{ }
export interface MasterMenuOutput extends Required<MasterMenuAttribute>{ }

class MasterMenu extends Model<MasterMenuAttribute, MasterMenuInput> implements MasterMenuAttribute {
  public id!: number;
  public name!: string;
  public icon!: string;
  public ordering!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MasterMenu.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ordering: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnect,
  }
);

// karena 1 master menu bisa punya banyak submenu 
// penting untuk mendefinisikan relasi di Model, kalau di model tidak didefinisakan
// maka di controller tidak akan muncul relasinya
MasterMenu.hasMany(SubMenu)


export default MasterMenu
