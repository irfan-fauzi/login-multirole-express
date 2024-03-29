import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import RoleRoutes from "./routes/RolesRoutes";
import UserRoute from "./routes/UserRoutes";
import cookieParser from "cookie-parser";
import MasterMenuRoutes from "./routes/MasterMenuRoutes";
import SubMenuRouter from "./routes/SubMenuRoutes";
import RoleAccessRoutes from "./routes/RoleAccessRoutes";

const app: Application = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

// routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    msg: "🧑 🐱 💟 ",
  });
});

app.use(RoleRoutes);
app.use(UserRoute);
app.use(MasterMenuRoutes);
app.use(SubMenuRouter)
app.use(RoleAccessRoutes)

app.listen(PORT, () => {
  console.log(`app running in port: ${PORT}`);
});
