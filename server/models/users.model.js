import { db } from "../config/db.js";

export const register = (username, email, password) => {
  return db("users").insert({ username, email, password }, [
    "user_id",
    "email",
  ]);
};

export const login = (email) => {
  return db("users").select("user_id", "email", "password").where({ email });
};

export const all = () => {
  return db("users").select("user_id", "email", "password").orderBy("user_id");
};
