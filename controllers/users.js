const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const codes = require('../utils/const');
const ConflictError = require('../errors/conflict-error');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(codes.SUCCESS_CREATED_CODE).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(
          new ConflictError('Такой email уже зарегистрирован'),
        );
      } else {
        next(new ConflictError('Такой email уже зарегистрирован!'));
      }
    });
};

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(codes.SUCCESS_OK_CODE).send({ data: users }))
  .catch(next);

module.exports.getUser = (req, res, next) => {
  const id = req.params.userId;

  return User.findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => res.status(codes.SUCCESS_OK_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('Невалидный id'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => res.status(codes.SUCCESS_OK_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('Невалидный id'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  { new: true, runValidators: true },
)
  .orFail(new NotFoundError(`Пользователь с id ${req.user._id} не найден`))
  .then((user) => res.status(codes.SUCCESS_OK_CODE).send({ data: user }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        ),
      );
    } else {
      next(err);
    }
  });

module.exports.updateAvatar = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  {
    avatar: req.body.avatar,
  },
  { new: true, runValidators: true },
)
  .orFail(new NotFoundError(`Пользователь с id ${req.user._id} не найден`))
  .then((user) => res.status(codes.SUCCESS_OK_CODE).send({ data: user }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        ),
      );
    } else {
      next(err);
    }
  });
