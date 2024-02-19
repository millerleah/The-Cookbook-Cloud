import {
  allRecipes,
  usersRecipes,
  insertRecipes,
  updateRecipe,
  deleteRecipe,
} from "../models/recipes.model.js";

export const _allRecipes = async (req, res) => {
  try {
    const recipes = await allRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const _usersRecipes = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);

    const recipes = await usersRecipes(user_id);

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const _insertRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, user_id } = req.body;

    const [recipe_id] = await insertRecipes(
      title,
      description,
      ingredients,
      instructions,
      user_id
    );

    res.status(201).json({ recipe_id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const _updateRecipe = async (req, res) => {
  try {
    const id = Number(req.params.recipe_id);
    const { title, description, ingredients, instructions, user_id } = req.body;

    await updateRecipe(
      id,
      title,
      description,
      ingredients,
      instructions,
      user_id
    );

    res.status(200).json("Recipe updated");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const _deleteRecipe = async (req, res) => {
  try {
    const id = Number(req.params.recipe_id);

    await deleteRecipe(id);

    res.status(200).json("Recipe deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports = {
//   _allRecipes,
//   _usersRecipes,
//   _insertRecipe,
//   _updateRecipe,
//   _deleteRecipe,
// };
