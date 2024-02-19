import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersrouter from "./routers/users.router.js";
import recipesRouter from "./routers/recipes.router.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3001, () => {
  console.log(`running on ${process.env.PORT || 3001}`);
});

app.use("/users", usersrouter);
app.use("/recipes", recipesRouter);
