const jwt = require('jsonwebtoken');

const secret = 'oh_no_step_brother_im_stuck';

const expiration = '1h';

const signToken = function ({ _id, email }) {
  const payload = { _id, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req; 
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

module.exports = { authMiddleware, signToken };
