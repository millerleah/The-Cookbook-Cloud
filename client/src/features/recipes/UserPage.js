import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipesByUserId } from "./recipeSlice";
import RecipeItem from "./RecipeItem";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { user_id } = useContext(AuthContext);
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    console.log(user_id);
    dispatch(fetchRecipesByUserId(user_id));
  }, [dispatch, user_id]);

  return (
    <div>
      <h2>User Recipes</h2>
      <Link to="/create">Create New Recipe</Link>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default UserPage;
