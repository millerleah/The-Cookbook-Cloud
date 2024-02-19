// import { db } from "../config/db.js";

// export const insertFavorites = (user_id, recipe_id) => {
//   return db("favorites").insert({ user_id, recipe_id }, ["favorite_id"]);
// };
// export const allFavorites = () => {
//   return db("favorites")
//     .select("favorite_id", "user_id", "recipe_id")
//     .orderBy("user_id");
// };
