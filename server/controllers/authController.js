const jwt = require('jsonwebtoken');
const users = require('../data/users'); // Hardcoded users

// Handle login request
const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user from the hardcoded users array
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Send response with token and role
  res.json({
    token,
    role: user.role,
  });
};

module.exports = { login };
