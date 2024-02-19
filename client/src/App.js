import { Routes, Route } from "react-router-dom";
import { useState, useContext, createContext } from "react";
import Home from "./features/page/Home";
import Nav from "./features/page/Nav";
import LoginRegister from "./features/loginregistration/LoginRegister";
import Auth from "./features/authorization/Authorization";
import UserPage from "./features/recipes/UserPage";
import CreateRecipePage from "./features/recipes/CreateRecipePage";
import RecipeDetails from "./features/recipes/RecipeDetails";
import "./App.css";

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState();
  const [user_id, setUser_id] = useState();
  return (
    <AuthContext.Provider value={{ token, setToken, user_id, setUser_id }}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister page={"Login"} />} />
          <Route
            path="/register"
            element={<LoginRegister page={"Register"} />}
          />
          <Route
            path="/user"
            element={
              <Auth>
                <UserPage />
              </Auth>
            }
          />
          <Route
            path="/create"
            element={
              <Auth>
                <CreateRecipePage />
              </Auth>
            }
          />
          <Route
            path="/recipe/:recipeId"
            element={
              <Auth>
                <RecipeDetails />
              </Auth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
