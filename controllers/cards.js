const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const codes = require('../utils/const');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(codes.SUCCESS_CREATED_CODE).send({ data: card }))
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
};

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(codes.SUCCESS_OK_CODE).send({ data: cards }))
  .catch(next);

module.exports.deleteCard = (req, res, next) => {
  const currentUser = req.user._id;
  const id = req.params.cardId;

  return Card.findById(id)
    .orFail(new NotFoundError(`Карточка с id ${id} не найдена`))
    .then((card) => {
      if (!card.owner.equals(currentUser)) {
        throw new ForbiddenError('Вы не можете удалите карточку другого пользователя');
      }
      return card.remove;
    })
    .then((card) => {
      res.status(codes.SUCCESS_OK_CODE).send({ data: card });
    })
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

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`))
  .then((card) => res.status(codes.SUCCESS_OK_CODE).send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        ),
      );
    } else if (err.name === 'CastError') {
      next(
        new BadRequestError('Невалидный id'),
      );
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`))
  .then((card) => res.status(codes.SUCCESS_OK_CODE).send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        ),
      );
    } else if (err.name === 'CastError') {
      next(
        new BadRequestError('Невалидный id'),
      );
    } else {
      next(err);
    }
  });
