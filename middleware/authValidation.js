const { createUnauthorizedTokenError } = require('../helpers/index');
const jwt = require('jsonwebtoken');
const User = require('../db/usersModel');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';

  const [tokenType, token] = authHeader.split(' ');
  if (tokenType === 'Bearer' && token) {
    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(verifiedToken._id);
      if (!user) {
        return next(createUnauthorizedTokenError('No user with such id'));
      }

      if (!user.token) {
        return next(createUnauthorizedTokenError('token is invalid'));
      }

      req.user = user;

      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(createUnauthorizedTokenError(error.message));
      }
      if (error.name === 'JsonWebTokenError') {
        return next(createUnauthorizedTokenError(error.message));
      }

      return next(createUnauthorizedTokenError('Not authorized'));
    }
  }

  return next(createUnauthorizedTokenError('No token'));
}

module.exports = {
  auth,
};
