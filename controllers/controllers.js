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
  const { _id: userId } = req.user;
  const contactsList = await listContacts(userId);

  return res.status(200).json(contactsList);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(contact);
};

const postContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email, phone } = req.body;
  const contactAdd = await addContact(name, email, phone, userId);

  return res.status(201).json(contactAdd);
};

const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const deleteContact = await removeContact(contactId, userId);

  if (!deleteContact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(deleteContact);
};

const putContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await updateContact(contactId, req.body, userId);

  if (!contact) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(contact);
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const updateStatus = await updateStatusContact(contactId, req.body, userId);

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
