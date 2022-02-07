const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
// app.use(cookieParser());
// app.get('/posts', (req, res) => {
//   console.log(req.cookies.jwt);
// });
app.use(auth);
app.use(router);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  //   useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
