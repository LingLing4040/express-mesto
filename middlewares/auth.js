const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(
        new UnauthorizedError('Требуется авторизация'),
      );
    } else {
      next(err);
    }
  }

  req.user = payload;

  next();
};
