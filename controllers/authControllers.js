const { signUpUser, logInUser } = require('../models/authModels');
const { createConflictError, createUnauthorizedError } = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/usersModel');

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await signUpUser(email, password);

    return res.status(201).json({
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    return next(createConflictError());
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await logInUser(email);

    const passwordTheSame = await bcrypt.compare(password, user.password);

    if (!passwordTheSame) {
      return next(createUnauthorizedError());
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    user.token = token;
    await User.findByIdAndUpdate(user._id, user);

    return res.status(200).json({
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return next(createUnauthorizedError());
  }
};

const logOut = async (req, res, next) => {
  const { user } = req;

  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return res.status(204).json({ message: 'LOG OUT' });
};

const current = async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
};
