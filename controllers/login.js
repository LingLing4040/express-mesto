const jwt = require('jsonwebtoken');
const User = require('../models/user');
const codes = require('../utils/const');

module.exports.login = (req, res) => {
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
      res.status(codes.UNAUTHORIZED_CODE).send({ message: err.message });
    });
};
