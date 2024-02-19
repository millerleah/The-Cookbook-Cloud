import express from "express";
import { _register, _all, _login } from "../controllers/users.controller.js";
import { verifytoken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", _register);
router.post("/login", _login);
router.get("/", verifytoken, _all);

router.get("/verify", verifytoken, (req, res) => {
  res.sendStatus(200);
});

export default router;
