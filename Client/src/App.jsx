import { Route, Routes } from "react-router-dom";
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

import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      {/* <h1 style={{ color: "red" }}>ghjkl</h1> */}
      {/* <Routes>
      </Routes> */}

      <Nav>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/hire-freelancer" element={<HireFreelancer />}></Route>
          <Route path="/my-projects" element={<MyProjects />}></Route>
          <Route path="/find-jobs" element={<FindJobs />}></Route>
          <Route path="/my-jobs" element={<MyJobs />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Nav>
    </div>
  );
}

export default App;
