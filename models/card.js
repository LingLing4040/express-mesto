const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// eslint-disable-next-line prefer-regex-literals
const urlPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlPattern.test(v),
        message: 'Поле "avatar" должно быть валидным url-адресом.',
      },
    },
    owner: {
      type: ObjectId,
      required: true,
    },
    likes: {
      type: [{ type: ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
