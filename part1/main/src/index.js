import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =({handleClick,text}) =>{
  return <button style={{marginRight: 10}} onClick={handleClick}>{text}</button>

}
const Statistic = (props) =>{
 
    return (
    
      <tr>
      <td><b>{props.text}</b></td>
      <td><b>{props.value}</b></td>
      </tr>
      
 )}
 
 
const Statistics = (props) => {
  const alla=props.good+props.neutral+props.bad
  console.log(alla)
  if (alla===0){
    return (
      <div>
    <h1>statistics</h1>
    <p>no feedback given</p>
    </div>)
  }
  else{
  return(
    
    <div>
    
    <h1>statistics</h1>

    <table>
    <Statistic text="good" value={props.good}  />
    <Statistic text="neutral" value={props.neutral}  />
    <Statistic text="bad" value={props.bad}  />
    <Statistic text="all" value={alla}  />
    <Statistic text="average" value={props.good/(alla)}  />
    <Statistic text="positive" value={(props.good-props.bad)/alla}  />
    
    </table>
</div>)
}
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const all = bad + good + neutral
/*  const positive = () => {
    if (all===0) 
      {return 0}
    else
    {return good/(all)}
  }
  const average = () =>{
    if (all===0) 
      {return 0}
    else
    {
    return good-bad/all}
  }
*/
 
    const setToThing=(who) => {
        if (who==="Good"){return ()=>{setGood(good+1)}}
       
        if (who==="neutral"){return ()=>{setNeutral(neutral+1)}}
        if (who==="Bad"){return ()=>{setBad(bad+1)}}
    }


  return (
    <div>
    <div>
        <h1>give feedback</h1>
        <Button handleClick={setToThing("Good")} text="good"/>
        <Button handleClick={setToThing("neutral")} text="neutral"/>
        <Button handleClick={setToThing("Bad")} text="Bad"/>

    </div>

    <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)