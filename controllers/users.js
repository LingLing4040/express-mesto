const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const codes = require('../utils/const');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(codes.SUCCESS_CREATED_CODE).send({ data: user }))
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
        next();
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
      next();
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
      next();
    }
  });
