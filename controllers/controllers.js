const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../models/contacts');
const { createNotFoundHttpError } = require('../helpers/index');

const getContactsController = async (req, res, next) => {
  const owner = req.user._id;
  const contactsList = await listContacts(owner);

  return res.status(200).json(contactsList);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  const contact = await getContactById(contactId, owner);

  if (!contact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(contact);
};

const postContactController = async (req, res, next) => {
  const owner = req.user._id;
  const { name, email, phone } = req.body;
  const contactAdd = await addContact(name, email, phone, owner);

  return res.status(201).json(contactAdd);
};

const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  const deleteContact = await removeContact(contactId, owner);

  if (!deleteContact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(deleteContact);
};

const putContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  const contact = await updateContact(contactId, req.body, owner);

  if (!contact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(contact);
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  const updateStatus = await updateStatusContact(contactId, req.body, owner);

  if (!updateStatus) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(updateStatus);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactByIdController,
  putContactController,
  patchContactController,
};
