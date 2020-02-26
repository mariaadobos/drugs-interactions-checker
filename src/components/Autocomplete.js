import React from 'react';

const Autocomplete = props => {
    const selectAnOption = ev => {        
        console.log(ev.target.id);
        
        props.selectAnOption(ev.target.dataset.name, ev.target.id)
    }
    return (
        <ul className={props.suggestionsDrug ? 'autocomplete' : 'hidden'}>
            {!props.suggestionsDrug ? true : props.suggestionsDrug.map((item, index) => {
            return <li key={index} onClick={selectAnOption} data-name={props.name} id={item}>{item}</li>
          })}
        </ul>
    )
}
export default Autocomplete;