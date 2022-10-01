const fs = require("fs").promises;
const path = require("path");

const { uid } = require("uid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const text = await fs.readFile(contactsPath);
  return JSON.parse(text);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === contactId.toString());

  return result || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = { id: uid(), name, email, phone };

  contacts.push(newContact);

  await updateContacts(contacts);

  // console.log(contacts);
  console.log(newContact);
  return newContact;
}
// подивитись чи не буде зациклюватись ато ебать клепає цю функцію

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId.toString());

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return contacts[result];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

//npm run startcon:dev
