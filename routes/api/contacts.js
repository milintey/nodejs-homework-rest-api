const express = require('express');
const { schemaPutContact, schemaPostContact, schemaPatchContact } = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');
const { tryCatchWrapper } = require('../../helpers/index');
const { getContactsController, getContactByIdController, postContactController, deleteContactByIdController, putContactController, patchContactController } = require('../../controllers/controllers');

const router = express.Router()

router.get('/', tryCatchWrapper(getContactsController));

router.get('/:contactId', tryCatchWrapper(getContactByIdController));

router.post('/', validationBody(schemaPostContact), tryCatchWrapper(postContactController));

router.delete('/:contactId', tryCatchWrapper(deleteContactByIdController));

router.put('/:contactId', validationBody(schemaPutContact), tryCatchWrapper(putContactController));

router.patch('/:contactId/favorite',validationBody(schemaPatchContact), tryCatchWrapper(patchContactController));

module.exports = router;


