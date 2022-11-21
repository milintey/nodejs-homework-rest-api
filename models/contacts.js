const { Contact } = require('../db/contactsModel');

async function listContacts(userId) {
  const contactsList = await Contact.find({ userId });

  return contactsList;
}

async function getContactById(contactId, userId) {
  const contacts = await Contact.findOne({ _id: contactId, userId });

  return contacts;
}

async function removeContact(contactId, userId) {
  const deleteContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return deleteContact;
}

async function addContact(name, email, phone, userId) {
  const contact = { name, email, phone, userId };
  const createContact = await Contact.create(contact);

  return createContact;
}

const updateContact = async (contactId, body, userId) => {
  const updatedContact = await Contact.findOneAndUpdate({ id: contactId, userId }, body);

  return updatedContact;
};

const updateStatusContact = async (contactId, favorite, userId) => {
  const updateFavorite = await Contact.findOneAndUpdate({ id: contactId, userId }, favorite);

  return updateFavorite;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
