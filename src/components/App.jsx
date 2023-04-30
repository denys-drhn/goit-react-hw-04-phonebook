import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notofication/Notification';
import startContacts from '../contacts.json';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ??
      localStorage.setItem('contacts', JSON.stringify(startContacts))
  );
  const [filter, setFilter] = useState('');

  //add contact + Alert =========================================
  const addContact = ({ name, number }) => {
    // Check if contact with same name already exists
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    // Check if contact with same number already exists
    const existingNumber = contacts.find(contact => contact.number === number);
    if (existingNumber) {
      alert(`Contact with number ${number} already exists.`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  //delete contact ========================================
  const deleteContact = contactid => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactid)
    );
  };

  // contacts filter ==============================================
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // method filtered contacts for render + ! lowerCase x2 ========

  const getVisibleContacts = () => {
    //  const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setContacts(contacts);
  }, [contacts]);

  const filteredContacts = getVisibleContacts();

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length === 0 ? (
          <Notification message="No contacts found." />
        ) : (
          <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={deleteContact}
            />{' '}
          </>
        )}
      </Section>
    </>
  );
}
