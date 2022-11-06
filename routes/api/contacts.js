const express = require('express');
const { schemaPutContact, schemaPostContact } = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');
const { getContacts, getContactId, postContact, deleteContactById, putContact } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', getContacts);

router.get('/:contactId', getContactId);

router.post('/', validationBody(schemaPostContact), postContact);

router.delete('/:contactId', deleteContactById)

router.put('/:contactId', validationBody(schemaPutContact), putContact)

module.exports = router
