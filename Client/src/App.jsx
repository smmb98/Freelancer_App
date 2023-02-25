import { Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./scenes/HomePage";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import HireFreelancer from "./scenes/HireFreelancer";
import FindJobs from "./scenes/FindJobs";
import MyJobs from "./scenes/MyJobs";
import MyProjects from "./scenes/MyProjects";
import Profile from "./scenes/Profile";
// import SplashScreen from "./scenes/SplashScreen";
import Nav from "./scenes/global/nav";
import { useEffect } from "react";

import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (
      !isAuthenticated &&
      !window.location.pathname.includes("/register") &&
      !window.location.pathname.includes("/Register")
    ) {
      navigate("/login");
    } else if (
      (isAuthenticated && window.location.pathname.includes("/login")) ||
      window.location.pathname.includes("/Login") ||
      window.location.pathname.includes("/register") ||
      window.location.pathname.includes("/Register")
    ) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/"
          element={
            <Nav>
              <HomePage />
            </Nav>
          }
        ></Route>
        <Route
          path="/hire-freelancer"
          element={
            <Nav>
              <HireFreelancer />
            </Nav>
          }
        ></Route>
        <Route
          path="/my-projects"
          element={
            <Nav>
              <MyProjects />
            </Nav>
          }
        ></Route>
        <Route
          path="/find-jobs"
          element={
            <Nav>
              <FindJobs />
            </Nav>
          }
        ></Route>
        <Route
          path="/my-jobs"
          element={
            <Nav>
              <MyJobs />
            </Nav>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Nav>
              <Profile />
            </Nav>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
