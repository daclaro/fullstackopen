import React from 'react'
const PersonForm=({ person, deleteNumber })=>{

    
        return (
          <li>{person.name} {person.number}
          <button onClick={deleteNumber}>delete</button>
          </li>
          
        )
        
      }
  

export default PersonForm