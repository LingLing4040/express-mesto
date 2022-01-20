const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use(usersRouter);
router.use(cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
