const express = require('express');
const { schemaUserLogin, schemaUserSignup } = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');
const { upload } = require('../../middleware/uploadFile');
const {
  signUp,
  logIn,
  logOut,
  current,
  updateAvatar,
} = require('../../controllers/authControllers');
const { auth } = require('../../middleware/authValidation');

const authRouter = express.Router();

authRouter.post('/signup', validationBody(schemaUserSignup), signUp);
authRouter.post('/login', validationBody(schemaUserLogin), logIn);
authRouter.get('/logout', auth, logOut);
authRouter.get('/current', auth, current);
authRouter.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = authRouter;
