import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
  console.log("from verifytoken all cookies", req.cookies);
  const accesstoken = req.cookies.token || req.headers["x-access-token"];
  console.log(
    "from verifytoken",
    req.cookies.token,
    req.headers["x-access-token"]
  );

  if (!accesstoken) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
    if (err)
      return res.status(403).json({ error: err.message, msg: "forbidden" });
    next();
  });
};
