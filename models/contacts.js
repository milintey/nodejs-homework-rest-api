const { Contact } = require('../db/contactsModel');

async function listContacts(owner) {
  const contactsList = await Contact.find({ owner }).populate('owner', '_id email subscription');

  return contactsList;
}

async function getContactById(contactId, owner) {
  const contacts = await Contact.findOne({ _id: contactId, owner }).populate(
    'owner',
    '_id email subscription'
  );

  return contacts;
}

async function addContact(name, email, phone, owner) {
  const contact = { name, email, phone, owner };
  const createContact = await Contact.create(contact);

  return createContact;
}

async function removeContact(contactId, owner) {
  const deleteContact = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  }).populate('owner', '_id email subscription');

  return deleteContact;
}

const updateContact = async (contactId, body, owner) => {
  const updatedContact = await Contact.findOneAndUpdate({ id: contactId, owner }, body).populate(
    'owner',
    '_id email subscription'
  );

  return updatedContact;
};

const updateStatusContact = async (contactId, favorite, owner) => {
  const updateFavorite = await Contact.findOneAndUpdate(
    { id: contactId, owner },
    favorite
  ).populate('owner', '_id email subscription');

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
