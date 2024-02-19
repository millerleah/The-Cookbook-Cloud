import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchRecipeById, updateRecipe, deleteRecipe } from "./recipeSlice";

const RecipeDetails = (props) => {
  const { recipeId } = props;
  console.log(props);
  //   const { recipeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  console.log(selectedRecipe);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(selectedRecipe);

  //   useEffect(() => {
  //     dispatch(fetchRecipeById(recipeId));
  //   }, [dispatch, recipeId]);

  //   useEffect(() => {
  //     setEditedRecipe(selectedRecipe);
  //   }, [selectedRecipe]);

  const handleUpdate = () => {
    dispatch(updateRecipe(editedRecipe));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteRecipe(recipeId));
    navigate("/"); // Use navigate function to redirect to home after deleting
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  const { title, description, ingredients, instructions } = selectedRecipe;

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <ol>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          <button onClick={handleDelete}>Delete Recipe</button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
