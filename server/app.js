import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import userRouter from "./controllers/users/index.js";
import adminRouter from "./controllers/admins/index.js";
import publicRouter from "./controllers/public/index.js";
import authMiddleware from "./middlewares/auth.js";

const app = express();
const PORT = config.get("PORT");
const URL = config.get("URL");

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello world!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
app.use(authMiddleware);
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
