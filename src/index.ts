import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import RoleRoutes from "./routes/RolesRoutes";
import UserRoute from "./routes/UserRoutes";

const app: Application = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`app running in port: ${PORT}`);
});
