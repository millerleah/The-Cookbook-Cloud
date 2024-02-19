import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { AuthContext } from "../../App";

const LoginRegister = ({ page }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");

  const { setToken, setUser_id } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginregister = async () => {
    if (page === "Login") {
      try {
        const response = await axios.post("http://localhost:3001/users/login", {
          email,
          password,
        });
        if (response.status === 200) {
          setToken({ token: response.data.token });
          console.log(response.data);
          setUsername("");
          setEmail("");
          setPassword("");
          setMessage("");
          setUser_id(response.data.userId);
          navigate(`/user`);
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/users/register",
          {
            username,
            email,
            password,
          }
        );
        if (response.status === 200) {
          setMessage("");
          setUsername("");
          setEmail("");
          setPassword("");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1>{page}</h1>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete="off">
        {page === "Register" ? (
          <TextField
            sx={{ m: 1 }}
            id="username"
            type="username"
            label="Enter your username"
            value={username}
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : null}
        <TextField
          sx={{ m: 1 }}
          id="email"
          type="email"
          label="Enter your email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          type="password"
          label="Enter your password"
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={loginregister}>
        {page}
      </Button>
      <div>{message}</div>
    </div>
  );
};
export default LoginRegister;
