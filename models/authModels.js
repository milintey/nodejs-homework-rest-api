const User = require('../db/usersModel');
const bcrypt = require('bcrypt');

const signUpUser = async (email, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const user = new User({ email, password: hashedPassword });
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
