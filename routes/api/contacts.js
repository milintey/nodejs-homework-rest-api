const express = require('express');
const {
  schemaPutContact,
  schemaPostContact,
  schemaPatchContact,
} = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');
const { auth } = require('../../middleware/authValidation');
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactByIdController,
  putContactController,
  patchContactController,
} = require('../../controllers/controllers');

const router = express.Router();

router.use(auth);

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', validationBody(schemaPostContact), postContactController);

router.delete('/:contactId', deleteContactByIdController);

router.put('/:contactId', validationBody(schemaPutContact), putContactController);

router.patch('/:contactId/favorite', validationBody(schemaPatchContact), patchContactController);

module.exports = router;
