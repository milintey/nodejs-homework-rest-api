const { Contact } = require('../db/contactsModel');


async function listContacts() {
  const contactsList = await Contact.find();
  
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await Contact.findById(contactId);
  
  if (!contacts) {
    return null;
  }

  return contacts;
}

async function removeContact(contactId) {
  const deleteContact = await Contact.findById(contactId);
  console.log(deleteContact);

  if (!deleteContact) {
    return null;
  }

  await Contact.findByIdAndDelete(contactId);

  return deleteContact;
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone };
  
  const createContact = await Contact.create(contact);

  return createContact;
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  return updatedContact;
}

const updateStatusContact = async (contactId, favorite) => {
  const updateFavorite = await Contact.findByIdAndUpdate(contactId, favorite, { new: true });

  return updateFavorite;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
