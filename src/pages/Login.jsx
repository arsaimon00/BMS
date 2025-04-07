import React, { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import './Login.css';

const Login = () => { const [selectedRole, setSelectedRole] = useState('showroom'); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const navigate = useNavigate();

const handleLogin = (e) => { e.preventDefault();
    // Dummy accounts
const showroomUser = { email: 'showroom@example.com', password: '123456' };
const bakeryUser = { email: 'bakery@example.com', password: '123456' };

if (
  selectedRole === 'showroom' &&
  email === showroomUser.email &&
  password === showroomUser.password
) {
  navigate('/showroom-dashboard');
} else if (
  selectedRole === 'bakery' &&
  email === bakeryUser.email &&
  password === bakeryUser.password
) {
  navigate('/bakery-dashboard');
} else {
  alert('Invalid email or password');
}
};

return ( <div className="login-container"> <form className="login-form" onSubmit={handleLogin}> <div className="login-icon">🏪</div> <h2>Business Management System</h2>
    <div className="role-buttons">
      <button
        type="button"
        className={selectedRole === 'showroom' ? 'selected' : ''}
        onClick={() => setSelectedRole('showroom')}
      >
        Showroom Manager
      </button>
      <button
        type="button"
        className={selectedRole === 'bakery' ? 'selected' : ''}
        onClick={() => setSelectedRole('bakery')}
      >
        Bakery Staff
      </button>
    </div>

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

    <button type="submit" className="login-btn">
      Login
    </button>
  </form>
</div>
); };

export default Login;