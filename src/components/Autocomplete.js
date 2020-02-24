import React from 'react';

const Autocomplete = props => {
    const chooseDrug = ev => {
        props.chooseDrug(ev.target.id, ev.target.id)
    }
    return (
        <ul className={props.suggestionsDrug ? 'autocomplete' : 'hidden'}>{!props.suggestionsDrug ? true : props.suggestionsDrug.map((item, index) => {
            return <li key={index} onClick={chooseDrug} name={props.name} id={item}>{item}</li>
          })}
        </ul>
    )
}
export default Autocomplete;