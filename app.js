const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error-handler');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '61e5a5a3eff1ea2a45d12bbd',
  };

  next();
});
app.use(router);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  //   useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
