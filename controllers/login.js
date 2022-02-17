// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorized-error');
// const User = require('../models/user');
// const codes = require('../utils/const');

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//       res.cookie('token', token, {
//         maxAge: 3600000,
//         httpOnly: true,
//       }).end();
//     })
//     .catch((err) => {
//       if (err.code === codes.UNAUTHORIZED_CODE) {
//         next(
//           new UnauthorizedError('Неправильные почта или пароль'),
//         );
//       } else {
//         next(err);
//       }
//     });
// };

// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorized-error');
// const User = require('../models/user');
// const codes = require('../utils/const');

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id },
// NODE_ENV === 'production' ? JWT_SECRET : 'jwtsecret');

//       res.cookie('jwt', token, {
//         maxAge: 3600000,
//         httpOnly: true,
//         sameSite: true,
//         secure: true,
//       }).end();
//     })
//     .catch((err) => {
//       if (err.code === codes.UNAUTHORIZED_CODE) {
//         next(
//           new UnauthorizedError('Неправильные почта или пароль'),
//         );
//       } else {
//         next(err);
//       }
//     });
// };
