const fs = require('fs/promises');
const path = require('path');
const { uid } = require('uid');

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, 'utf-8');
  const parceContactsList = JSON.parse(contactsList);
  
  return parceContactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const getContact = contacts.find(contact => contact.id === contactId);
  if (!getContact) {
    return null;
  }

  return getContact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const deleteContact = contactsList.find(cont => cont.id === contactId);
  if (!deleteContact) {
    return null;
  }
  
  const filterContacts = contactsList.filter(cont => cont.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));

  return deleteContact;
}

async function addContact(name, email, phone) {
  const id = uid();
  const contact = {id, name, email, phone};
  const contactsList = await listContacts();
  contactsList.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return contact;
}

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  contactsList.forEach(cont => {
    if (cont.id === contactId) {
      cont.name = body.name;
      cont.email = body.email;
      cont.phone = body.phone;
    }
  })

  const contactUpdate = contactsList.find(cont => cont.id === contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return contactUpdate;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
