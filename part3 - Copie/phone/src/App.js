import React, { useState,useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import peopleService from './services/people'
import Notification from "./components/Notification"
import './index.css'
import { getAllByAltText } from '@testing-library/react'



 
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState('Welcome')
  const addPhone=(event)=>{
    event.preventDefault()
    const phoneObject={
        name:newName,
        number:newNumber
    }
    const changedPerson=persons.find(n => n.name === phoneObject.name)
    if (typeof changedPerson !== "undefined") {
    const result= window.confirm(newName +' already exists,do you wish to replace the number?')
    const changedPersons = { ...changedPerson,number:newNumber}
    const id=changedPerson.id
    if(result){
    peopleService
    .update(changedPersons.id, changedPersons)
    .then(returnedPersons => {
    setPersons(persons.map(p => p.id !== id ? p : returnedPersons))
    })
    setNewName('')
    setNewNumber('')
              }

    else{
      
    }
    
  }
    
    else {
    peopleService
    .create(phoneObject)
    .then(returnedPeople=>setPersons(persons.concat(returnedPeople)))
    setNewName('')
    setNewNumber('')
    setErrorMessage(
      `Added '${newName}'`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
    
  }

  const handlePhoneChange=(event)=>{
    
    setNewName(event.target.value)


  }

  const handleNumberChange=(event)=>{
    
    setNewNumber(event.target.value)
    console.log(newNumber)


  }

const handleFilterChange =(event)=>{
    //dont set persons directly
    setNewFilter(event.target.value)
    if (event.target.value !== ""){

        setPersons(persons.filter(  
            (p)=>p.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        ))

    }
   else{
    setPersons([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
}

}

const deleteNumberOf= (id,name) =>{
const result = window.confirm("do you really wish to delete this person?")
if (result){
peopleService
.axios_del(id)
.then(response => {
  console.log('success!')
})
.catch(error => {
  setErrorMessage(
    `Information of '${name}' was already deleted from server`
  )
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
 // setPersons(persons.filter(n => n.id !== id))
})
setPersons(persons.filter(person => person.id !== id))
}
else {
    console.log("aborted")
}




}

const hook = () => {
  peopleService
  .getAll()
  .then(initialPeople=>setPersons(initialPeople))
}

useEffect(hook, [])


  return (
    <div>
      <h2>Phonebook</h2>     
      <Notification message={errorMessage} />
     <Filter addPhone={addPhone} handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2> add a new </h2>
      <Persons addPhone={addPhone} newName={newName} handlePhoneChange={handlePhoneChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      {persons.map((p) => <PersonForm person={p} deleteNumber={()=>deleteNumberOf(p.id,p.name)}/>)}
      </ul>
    </div>
  )
}

export default App