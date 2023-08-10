// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Define a secret key for JWT signing and verification. The key should be kept secret in a real application.
const secret = 'oh_no_step_brother_im_stuck';

// Define a token expiration time
const expiration = '1h';

// Function to sign a token
const signToken = function ({ _id, email }) {
  // The data you want to store in the JWT
  const payload = { _id, email };
  
  // Sign the JWT using the secret key and set it to expire according to the predefined time
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

// Middleware to authenticate a user based on the provided JWT
const authMiddleware = function ({ req }) {
  // Try to get the token from the request body, query string, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token exists in headers, it may be in the format "Bearer <token>". We need to split and get only the token.
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If there's no token provided, set user to null
  if (!token) {
    return { user: null }; 
  }

  try {
    // Try to verify the token using the secret key
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    // If verification succeeds, return the user data stored in the token
    return { user: data }; 
  } catch {
    // If verification fails, log an error and set user to null
    console.log('Invalid token');
    return { user: null };
  }
};

// Export the signToken function and the authentication middleware for use in other modules
module.exports = { authMiddleware, signToken };