const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../models/contacts');


const getContactsController = async (req, res, next) => {
    const contactsList = await listContacts();
  
    return res.status(200).json(contactsList);
}

const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json(contact);
}

const postContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contactAdd = await addContact(name, email, phone);

  return res.status(201).json(contactAdd);
}

const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);

  if (!deleteContact) {
    return res.status(404).json({ "message": 'Not found' });
  }

  return res.status(200).json(deleteContact);
}

const putContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    return res.status(404).json({ "message": 'Not found' });
  }
  
  return res.status(200).json(contact);
}

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!req.body) {
    return res.status(404).json({"message": "missing field favorite"});
  }

  const updateStatus = await updateStatusContact(contactId, req.body);

  return res.status(200).json(updateStatus);
}

module.exports = {
    getContactsController,
    getContactIdController,
    postContactController,
    deleteContactByIdController,
    putContactController,
    patchContactController,
}
