const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');  // Ensure you're requiring the correct db.js

// Register a new user
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  // Validate role (only School, Parent, or Student are valid)
  const validRoles = ['School', 'Parent', 'Student'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be School, Parent, or Student.' });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the 'users' table
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, role]
    );

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login a user and return a JWT token
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email and role
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with the userId and role
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // Token expiration (1 hour)
    );

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Fetch student achievements (only accessible for Parents and Students)
exports.getAchievements = async (req, res) => {
  const { userId, role } = req.user;

  // Allow only Parents and Students to access achievements
  if (role !== 'Parent' && role !== 'Student') {
    return res.status(403).json({ message: 'You are not authorized to view achievements' });
  }

  try {
    // Query to fetch achievements (replace with your actual query)
    const result = await pool.query('SELECT * FROM achievements WHERE student_id = $1', [userId]);

    res.json(result.rows);  // Return the achievements
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};
