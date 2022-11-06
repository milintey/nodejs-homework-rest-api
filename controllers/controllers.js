const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');

const getContacts = async (req, res, next) => {
  const contactsList = await listContacts();

  return res.status(200).json(contactsList);
}

const getContactId = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json(contact);
}

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contactAdd = await addContact(name, email, phone);

  return res.status(201).json(contactAdd);
}

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);

  if (!deleteContact) {
    return res.status(404).json({ "message": 'Not found' });
  }

  return res.status(200).json({ "message": "contact deleted" });
}

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    return res.status(404).json({ "message": 'Not found' });
  }
  
  return res.status(200).json(contact);
}

module.exports = {
    getContacts,
    getContactId,
    postContact,
    deleteContactById,
    putContact
}