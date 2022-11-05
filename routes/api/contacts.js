const express = require('express');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');
const { schemaPutContact, schemaPostContact } = require('../../schema/schems.js');
const { validationBody } = require('../../middleware/validationBody');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contactsList = await listContacts();

  return res.status(200).json(contactsList);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json(contact);
});



router.post('/', validationBody(schemaPostContact), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contactAdd = await addContact(name, email, phone);

  return res.status(201).json(contactAdd);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);

  if (!deleteContact) {
    return res.status(404).json({ "message": 'Not found' });
  }

  return res.status(200).json({ "message": "contact deleted" });
})



router.put('/:contactId', validationBody(schemaPutContact), async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  
  return res.status(200).json(contact);
})

module.exports = router
