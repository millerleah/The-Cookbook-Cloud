import express from "express";
import {
  _allRecipes,
  _usersRecipes,
  _insertRecipe,
  _updateRecipe,
  _deleteRecipe,
} from "../controllers/recipes.controller.js";

const router = express.Router();

router.get("/", _allRecipes);
router.get("/users/:user_id", _usersRecipes);
router.post("/", _insertRecipe);
router.put("/:recipe_id", _updateRecipe);
router.delete("/:recipe_id", _deleteRecipe);

export default router;
