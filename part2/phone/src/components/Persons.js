import React from 'react'
const Persons=(props)=>{
    return (
<form onSubmit={props.addPhone}>
<div>
  name: <input 
  value={props.newName}
  onChange={props.handlePhoneChange}
  />
</div>
<div>number:<input
     value={props.newNumber}
     onChange={props.handleNumberChange} 

 />



</div>
<div>
  <button type="submit">add</button>
</div>
</form>
)
}
export default Persons