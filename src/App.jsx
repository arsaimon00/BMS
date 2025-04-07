import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ShowroomDashboard from "./pages/ShowroomDashboard";
import BakeryDashboard from "./pages/BakeryDashboard";

function App() {
  return (
    <Router>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<Login />} />{" "}
        <Route path="/showroom-dashboard" element={<ShowroomDashboard />} />{" "}
        <Route path="/bakery-dashboard" element={<BakeryDashboard />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
