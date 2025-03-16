import { useState, useEffect } from "react";
import Filter from './components/Filter'
import Input from './components/Input'
import Display from './components/Display'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNo, setNewNo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    console.log("useEffect");
    personsService.getAll()
      .then(initialPersons => {
        console.log("promise fulfilled");
        setPersons(initialPersons);
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (!newName || !newNo) {
      alert("Please enter both field");
      return;
    }
    console.log("Add clicked");
    const nameObj = {
      name: newName,
      number: newNo
    }
    const person = persons.find(p => p.name === newName);
    if (person) {
      if (person.number === newNo) {
        alert(`${newName} already exists`);
      }
      else {
        if (window.confirm(`${person.name} already exists. Replace old number with new one ?`)) {
          const changedPerson = { ...person, number: newNo }
          const returnedPerson = personsService.update(changedPerson, person.id);
          returnedPerson.then((updatedPerson) => {
            setPersons(persons.map((p) =>
              p.id !== person.id ? p : updatedPerson
            ));
            setErrorMsg('Updated Successfully!');
            setErrorType('success');
            setNewName('');
            setNewNo('');
          })
            .catch(error => {
              console.log('error: ', error);
              setErrorMsg(`${person.name} has already been removed from the server`);
              setErrorType('error');
              setPersons(persons.filter((p) =>p.id !== person.id ));
              setTimeout(() => {
                setErrorMsg('');
                setErrorType('');
                setNewName('');
                setNewNo('');
              }, 5000);
            })
        }
      }
    }
    else {
      personsService.create(nameObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setErrorType('success');
          setErrorMsg('Added successfully!');

          setTimeout(() => {
            setErrorMsg('');
            setErrorType('')
          }, 5000);
          setNewName('');
          setNewNo('');
        })
        .catch(error => {
          console.log('error: ', error);
          setErrorMsg('Some error occurred :(');
          setErrorType('error')
          setTimeout(() => {
            setErrorMsg('');
            setErrorType('')
          }, 5000);
        })

    }

  }

  const handledeleteContact = (id) => {
    const person = persons.find(person => person.id === id);
    if (person && window.confirm(`Delete ${person.name} ?`)) {
      personsService.deleteContact(id)
        .then(() => {
          console.log('Deleted successfully');
          setPersons(persons.filter(person => person.id !== id));
          setErrorMsg('Deleted successfully!');
          setErrorType('success');
          setTimeout(() => {
            setErrorMsg('');
            setErrorType('')
          }, 5000);
          setNewName('');
          setNewNo('');
        })

        .catch(error => {
          console.log('error: ', error);
          setErrorMsg('This contact has already deleted');
          setErrorType('error');
          setTimeout(() => {
            setErrorMsg('');
            setErrorType('')
          }, 5000);
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNoChange = (event) => {
    setNewNo(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">PhoneBook</h1>

        <Notification msg={errorMsg} type={errorType} />

        <div className="mb-6">
          <Filter handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
        </div>

        <form className="space-y-4 mb-6">
          <Input text="Name" type="text" value={newName} onChange={handleNameChange} />
          <Input text="Number" type="text" value={newNo} onChange={handleNoChange} />
          <button
            type="submit"
            onClick={addName}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add Contact
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Contacts</h2>
        <Display list={searchTerm ? filteredPersons : persons} handledeleteContact={handledeleteContact} />
      </div>
    </div>
  )
}

export default App;