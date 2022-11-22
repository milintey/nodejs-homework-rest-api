const express = require('express');
const { schemaUserSignupAndLogin } = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');
const { signUp, logIn, logOut, current } = require('../../controllers/authControllers');
const { auth } = require('../../middleware/authValidation');

const authRouter = express.Router();

authRouter.post('/signup', validationBody(schemaUserSignupAndLogin), signUp);
authRouter.post('/login', validationBody(schemaUserSignupAndLogin), logIn);
authRouter.get('/logout', auth, logOut);
authRouter.get('/current', auth, current);

module.exports = authRouter;
