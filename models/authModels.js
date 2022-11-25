const User = require('../db/usersModel');
const bcrypt = require('bcrypt');

const signUpUser = async (email, password, subscription) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword, subscription });
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
