import React, { useState } from "react";
import './LoginPopup.css';

function LoginPopup() {
  const [role, setRole] = useState("Showroom Manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", { role, email, password });
    // Add login logic here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon">
          🏬 {/* You can use an icon here like FontAwesome or SVG */}
        </div>
        <h2>Business Management System</h2>

        <div className="role-switch">
          <button
            className={role === "Showroom Manager" ? "active" : ""}
            onClick={() => handleRoleSelect("Showroom Manager")}
          >
            Showroom Manager
          </button>
          <button
            className={role === "Bakery Staff" ? "active" : ""}
            onClick={() => handleRoleSelect("Bakery Staff")}
          >
            Bakery Staff
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
