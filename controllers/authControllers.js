const { signUpUser, logInUser } = require('../models/authModels');
const { createConflictError, createUnauthorizedError } = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const path = require('path');
const User = require('../db/usersModel');

const signUp = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const newUser = await signUpUser(email, password, subscription);

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    return next(createConflictError());
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await logInUser(email);

  if (!user) {
    return next(createUnauthorizedError());
  }

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
};

const logOut = async (req, res, next) => {
  const { user } = req;

  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return res.status(204).json({});
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

const updateAvatar = async (req, res, next) => {
  const pathFile = path.join(__dirname, '../tmp', req.file.filename);
  const newFileName = req.user.email + req.file.filename;
  const newPathFile = path.join(__dirname, '../public/avatars', newFileName);
  const newUserPathAvatar = '/avatars/' + newFileName;

  const image = await jimp.read(pathFile);
  await image.resize(250, 250);
  await image.writeAsync(newPathFile);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatarURL: newUserPathAvatar },
    { new: true }
  );

  return res.status(200).json({ avatarURL: user.avatarURL });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
  updateAvatar,
};
