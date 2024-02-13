import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbname: string = process.env.DATABASE_NAME!;
const dbUsername: string = process.env.DATABASE_USERNAME!;
const dbPassword: string = process.env.DATABASE_PASSWORD!;
const dbHost: string = process.env.DATABASE_HOSTING!;

const dbConnect = new Sequelize(dbname, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default dbConnect;
