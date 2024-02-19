import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
  selectedRecipe: null,
};

const RECIPES_URL = "http://localhost:3001/recipes";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await axios.get(RECIPES_URL);
    return response.data;
  }
);

export const fetchRecipesByUserId = createAsyncThunk(
  "recipes/fetchRecipesByUserId",
  async (user_id) => {
    try {
      const response = await axios.get(`${RECIPES_URL}/users/${user_id}`);
      console.log(`${RECIPES_URL}/users/${user_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (recipe_id) => {
    try {
      console.log(`${RECIPES_URL}/${recipe_id}`);
      const response = await axios.get(`${RECIPES_URL}/${recipe_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipeData) => {
    const response = await axios.post(RECIPES_URL, recipeData);
    return response.data;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipeData) => {
    const { recipe_id, ...updatedData } = recipeData;
    const response = await axios.put(
      `${RECIPES_URL}/${recipe_id}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipe_id) => {
    await axios.delete(`${RECIPES_URL}/${recipe_id}`);
    return recipe_id;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipesByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const updatedRecipeIndex = state.recipes.findIndex(
          (recipe) => recipe.recipe_id === action.payload.recipe_id
        );
        if (updatedRecipeIndex !== -1) {
          state.recipes[updatedRecipeIndex] = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe.recipe_id !== action.payload
        );
      });
  },
});

export default recipeSlice.reducer;
