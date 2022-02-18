// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');
// const validator = require('validator');
// const cors = require('cors');
// const errorHandler = require('./middlewares/error-handler');
// const router = require('./routes');
// const { createUser } = require('./controllers/users');
// const { login } = require('./controllers/login');
// const auth = require('./middlewares/auth');

// const method = (value) => {
//   const result = validator.isURL(value);
//   if (result) {
//     return value;
//   }
//   throw new Error('URL validation err');
// };

// const { PORT = 3000 } = process.env;

// const app = express();

// app.use(cors({
//   origin: 'http://cool.domainname.students.nomoredomains.xyz',
//   // origin: 'http://localhost:3000',
//   credentials: true,
// }));

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     avatar: Joi.string().custom(method),
//   }),
// }), createUser);
// app.use(auth);
// app.use(router);
// app.use(errors());
// app.use(errorHandler);

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   // useCreateIndex: true,
//   //   useFindAndModify: false
// });

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const { PORT = 3000 } = process.env;

const app = express();

// app.use(cors({
//   origin: 'http://filatov.students.nomoredomains.work',
//   // origin: 'http://localhost:3000',
//   credentials: true,
// }));
app.use(cors);
app.options('*', cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().custom(method),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.use(auth);
app.use(router);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
