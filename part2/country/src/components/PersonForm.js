import React, { useRef,useState,useEffect } from 'react'
import axios from 'axios'




const PersonForm=(props)=>{
  

//prototype setshow array []
// 


const [show,setShow]=useState([])
const [ weather, setWeather ] = useState('') 
const [current,setCurrent]= useState({}) 

    const Name = ({ nam }) => {
    
        return (
          <li>{nam.name} </li>
          
        )
        
      }

// checksh= show.length == 0 ? props.persons : [] 


const checkStuff= show.length>0 ? show : []
// weather ($env:REACT_APP_API_KEY=1db205ac0293e06b97d9675d988db109) -and (npm start)
const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup


const hook = () => {
  axios
  
      .get('http://api.weatherstack.com/current?access_key='+
      api_key.slice(0, -1)+
      '&query='+ weather)
  
  
    
      .then(response => {
        console.log('http://api.weatherstack.com/current?access_key='+
        api_key.slice(0, -1)+
        '&query='+ weather)
        console.log("hooked")
        setCurrent(response.data.current)
  
       
          console.log("current",current)
          console.log("weathet",weather)
       
      })}
  
      useEffect(hook, [weather])





    const Info=(props)=>{
      console.log("props.current",props.current)
       return (
         
        props.persons.map( (x) =>  
        <div>
        <h1>{x.name}</h1>
        <p>capital {x.capital}</p>
        <p>population {x.population}</p>
        
        
        <h2>languages</h2>
      
        <ul>
            {x.languages.map(
            (p)=><Name key={p.name}  nam={p} />
            )}
      
        </ul>
        <img src={x.flag} width="120"></img>

        <h2>Weather in {x.capital}</h2>
        {/*
        <p><b>temperature {props.current.temperature}</b> </p>
        
          <img src={x.flag} width="50"></img>
          <p><b>wind {}</b> </p>
      */}

        </div>
       
        
      //  )
      )
       )
    }
      


      if (props.persons.length<=10  ){
    
    return (
   <div>
        <ul>
        {props.persons.map(
        (p)=><div><Name key={p.name}  nam={p} /> <button onClick={()=>{
         
       // setShow(!show)
        setShow([p])
        setWeather(p.capital)
      
        }
        }>
         show</button>

        
        </div>
        )}


        </ul>
        <div>
        
        <Info persons={checkStuff} current={current}/>
        </div>
        </div>



)

}

else  {
  return (
    <p>Too many matches,specify another filter</p>
  )

}
}

export default PersonForm