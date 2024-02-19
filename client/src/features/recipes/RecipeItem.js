import React from "react";
import { Link } from "react-router-dom";

const RecipeItem = (props) => {
  const { recipe_id, title } = props.recipe;

  return (
    <div>
      <h3>{title}</h3>
      <Link to={`/recipe/${recipe_id}`}>View Details</Link>
    </div>
  );
};

export default RecipeItem;
