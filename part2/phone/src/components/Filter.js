import React from 'react'


const Filter=(props)=>{
    return (
  <form onSubmit={props.addPhone}>
   
      filter shown with: <input 
      value={props.newFilter}
      onChange={props.handleFilterChange}
      />
     </form>
  
    )
  }


export default Filter