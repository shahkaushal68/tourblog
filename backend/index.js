import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import authRouter from "./routers/authRoute.js";
import tourRouter from "./routers/tourRoute.js";
import userRouter from "./routers/userRoute.js";

//Middlewares
const app = express();
app.use(cookieParser());
app.use(express.json()); // for postman //Used to parse JSON bodies
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false })); //for send the data via form //Parse URL-encoded bodies
const port = process.env.PORT || 4000;

//DB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

//Router Middleware
app.use("/api/auth", authRouter);
app.use("/api/tour", tourRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
