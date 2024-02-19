import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "./recipeSlice";
import { AuthContext } from "../../App";
import { useContext } from "react";

const RecipeForm = () => {
  const { user_id } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  const { title, description, ingredients, instructions } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      user_id,
    };
    dispatch(createRecipe(recipeData))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch((error) => {
        console.error("Failed to create recipe:", error);
      });
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea
            name="ingredients"
            value={ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={instructions}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
