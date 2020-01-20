import React from 'react';

const Result = props => {
    const showDetails = () => {
props.showDetails()
    }
    return (
        <section className='result-container'>
            <p className='result-container__txt'>Riesgo: {props.result}</p>
            <button className='result-container__btn' onClick={showDetails}>Más información</button>
            <p className={`result-container__details ${props.detailsAreHidden ? 'hidden': null}`}>{props.details}</p>
        </section>
    )
}
export default Result;
