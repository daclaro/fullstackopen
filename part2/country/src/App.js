import React, { useRef,useState,useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import axios from 'axios'



 
const App = () => {

 


  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')


  const addPhone=(event)=>{
    event.preventDefault()
    const phoneObject={
        name:newName
    }
    
    persons.some(e => e.name === phoneObject.name) ?  alert(newName + " is already added to the phonebook") : setPersons(persons.concat(phoneObject))
    
  }

  const handlePhoneChange=(event)=>{
    
    setNewName(event.target.value)


  }

  const [ newNumber, setNewNumber ] = useState('')

  const handleNumberChange=(event)=>{
    
    setNewNumber(event.target.value)
    console.log(newNumber)


  }


  const [ newFilter, setNewFilter ] = useState('')
const handleFilterChange =(event)=>{
    //dont set persons directly
    setNewFilter(event.target.value)
    let myTest=persons.filter((p)=>p.name.toLowerCase().includes(event.target.value.toLowerCase()))

    if (event.target.value !== "" ){
        
        
       setPersons(
          myTest
        )
    }

   else{
    
   hook()
  
}


}


function usePrevious(value) {

  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const prevCount = usePrevious(persons)





const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
 
      setPersons(response.data)
       
  
    
     

    })
}

useEffect(hook, [])


  return (
    <div>
            
           
     <Filter addPhone={addPhone} handleFilterChange={handleFilterChange} newFilter={newFilter} />
     

     
     <PersonForm persons={persons} />
    </div>
  )
}

export default App