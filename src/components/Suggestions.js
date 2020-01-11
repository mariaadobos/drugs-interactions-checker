import React from 'react'

const Suggestions = props => {
    const getDrugName1 = event =>{
        props.getDrugName1(event)
    }
  return (
    <ul>
        {props.suggestions.map(item => {
            return (
                <li name={item} onClick={getDrugName1}>{item}</li>
            )
        })}
    </ul>
  )
}

export default Suggestions;