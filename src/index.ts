import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

interface SessionConfigInterface {
  secret: any;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: object;
}


const sessionConfig: SessionConfigInterface = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: "auto", // secure: true = http || secure: false = https
  },

};

app.use(session(sessionConfig));

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    msg: "🧑 🐱 💟 ",
  });
});

app.listen(PORT, () => {
  console.log(`app running in port: ${PORT}`);
});
