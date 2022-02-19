const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const NotFoundError = require('../errors/not-found-error');

// const { logout } = require('./users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
// const auth = require('../middlewares/auth');
// const { createUser } = require('../controllers/users');
// const { login } = require('../controllers/users');

// const method = (value) => {
//   const result = validator.isURL(value);
//   if (result) {
//     return value;
//   }
//   throw new Error('URL validation err');
// };

// router.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     avatar: Joi.string().custom(method),
//   }),
// }), createUser);
// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), login);

router.use('/', usersRouter);
router.use('/', cardsRouter);
// router.get('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
