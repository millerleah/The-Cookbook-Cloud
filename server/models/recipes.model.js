import { db } from "../config/db.js";

export const allRecipes = () => {
  return db("recipes").select(
    "recipe_id",
    "title",
    "description",
    "ingredients",
    "instructions",
    "user_id"
  );
};

export const usersRecipes = (user_id) => {
  return db("recipes")
    .select(
      "recipe_id",
      "title",
      "description",
      "ingredients",
      "instructions",
      "user_id"
    )
    .where("user_id", user_id);
};

export const insertRecipes = (
  title,
  description,
  ingredients,
  instructions,
  user_id
) => {
  return db("recipes").insert(
    { title, description, ingredients, instructions, user_id },
    ["recipe_id"]
  );
};

export const updateRecipe = (
  recipe_id,
  title,
  description,
  ingredients,
  instructions,
  user_id
) => {
  return db("recipes")
    .where({ recipe_id: recipe_id })
    .update({ title, description, ingredients, instructions, user_id });
};

export const deleteRecipe = (recipe_id) => {
  return db("recipes").where({ recipe_id: recipe_id }).del();
};
