const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error("URL validation err");
};

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getMe);
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  getUser
);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default("Жак-Ив Кусто").required(),
      about: Joi.string().min(2).max(30).default("Исследователь").required(),
    }),
  }),
  updateProfile
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(method),
    }),
  }),
  updateAvatar
);

module.exports = router;
