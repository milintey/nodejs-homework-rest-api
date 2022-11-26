const User = require('../db/usersModel');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const signUpUser = async (email, password, subscription) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: '404' });

  const user = new User({ email, password: hashedPassword, subscription, avatarURL });
  await user.save();

  return user;
};

const logInUser = async email => {
  const user = await User.findOne({ email });

  return user;
};

module.exports = {
  signUpUser,
  logInUser,
};
