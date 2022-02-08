const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
      // res.cookie('jwt', token, {
      //   maxAge: 3600000,
      //   httpOnly: true,
      // });
    })
    .catch((err) => {
      if (err.code === 401) {
        next(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      } else {
        next(err);
      }
    });
};
