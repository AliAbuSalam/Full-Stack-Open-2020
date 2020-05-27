import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsView from './components/PersonsView';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';
import dbConnect from './services/phonebookConnect';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationBox, setNotificationBox] = useState(null);
    const [errorBox, setErrorBox] = useState(null);

    useEffect(() => {
        dbConnect
            .getAll()
            .then(response => {
                console.log('data fetch success, ', response);
                setPersons(response);
            });
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const nameToAdd = {name: newName, number: newNumber};
        if(persons.some(person => person.name === nameToAdd.name)){
            handleDuplicate(nameToAdd);
            return;
        }

        dbConnect
            .input(nameToAdd)
            .then(response => {
                setPersons(persons.concat(response));
                setNotificationBox(` Added ${nameToAdd.name}`);
                setTimeout(() => {
                    setNotificationBox(null);
                }, 3000);
            });
        clearForm();
  }

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setFilter(event.target.value);
    }

    const handleDelete = (person) => {
        if(window.confirm(`Delete ${person.name} ?`)){
            dbConnect.deleteEntry(person.id);
            setPersons(persons.filter(entry => entry.id !== person.id))
        }
    }
  
    const handleDuplicate = (nameToAdd) => {
        if(window.confirm(`${nameToAdd.name} is already added to phonebook, replace the old number with a new one?`)){
            const personToUpdate = persons.find(person => person.name === nameToAdd.name);
            const updatedPerson = {...personToUpdate, number: nameToAdd.number};
      
            dbConnect
                .updateEntry(updatedPerson)
                .then(response => {
                    setPersons(persons.map(person => person.id !== response.id ? person: response ));
                    setNotificationBox(`${updatedPerson.name}'s number has been changed.`);
                    setTimeout(() => {
                        setNotificationBox(null);
                    }, 3000);
                })
                .catch(() => {
                    setPersons(persons.filter(person => person.id !== updatedPerson.id));
                    setErrorBox(`Information of ${updatedPerson.name} has already been removed from the server`);
                    setTimeout(() => {
                        setErrorBox(null);
                    }, 3000);
                });
        }
        clearForm();
        return;
    
    }

    const clearForm = () => {
        setNewName('');
        setNewNumber('');
    }

    return(
        <div>
        <h2>Phonebook</h2>
        <Notification message = {notificationBox} />
        <ErrorMessage message = {errorBox} />
        <Filter onChange = {handleFilterChange} value = {filter} />
        <h2>add a new</h2>
        <PersonForm nameChange = {handleNameChange} nameValue = {newName} numberChange = {handleNumberChange} numberValue = {newNumber} submit = {handleSubmit}/>
        <h2>Numbers</h2>
        <PersonsView personsList = {persons} filter = {filter} deleteEntry = {handleDelete}/>
        </div>
    );
}

export default App;
