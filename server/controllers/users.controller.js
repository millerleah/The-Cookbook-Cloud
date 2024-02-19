import { register, login, all } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _register = async (req, res) => {
  const { username, email, password } = req.body;
  const loweremail = email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);

  try {
    const userRows = await register(username, loweremail, hash);
    res.json(userRows);
  } catch (error) {
    console.log("_register=>", error);
    res.status(404).json({ msg: "Email already exists" });
  }
};

export const _login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const row = await login(email.toLowerCase());

    if (row.length === 0)
      return res.status(404).json({ msg: "Email not found" });

    const match = bcrypt.compareSync(password + "", row[0].password);
    if (!match) return res.status(404).json({ msg: "wrong password" });

    const userId = row[0].user_id;
    const userEmail = row[0].email;

    const secret = process.env.ACCESS_TOKEN_SECERT;

    const accesstoken = jwt.sign({ userId, userEmail }, secret, {
      expiresIn: "5d",
    });

    res.cookie("token", accesstoken, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.json({ token: accesstoken, userId });
  } catch (error) {
    console.log("_login=>", error);
    res.status(404).json({ msg: "something went wrong" });
  }
};

export const _all = async (req, res) => {
  try {
    const rows = await all();
    res.json(rows);
  } catch (error) {
    console.log("_all=>", error);
    res.status(404).json({ msg: "not found" });
  }
};
