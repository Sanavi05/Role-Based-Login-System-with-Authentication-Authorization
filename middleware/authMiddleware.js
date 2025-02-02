const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info (userId and role) to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
