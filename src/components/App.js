import React from 'react';
import '../stylesheets/App.scss';
import Result from './Result'
import {fetchCIMA} from '../services/fetch'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query1: '',
      query2: '',
      drug1: '',
      drug2: '',
      result: '',
      details: '',
      detailsAreHidden: true
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.fetchDataBase = this.fetchDataBase.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  fetchDataBase = async() => {
    const response = await fetch('./data/interactions.json')
    const json = await response.json();
    this.getInfo(json.interactions)
  } 
  getInfo(interactions){
    for (const item of interactions){
      if (this.state.drug1===item.ingredient){
        const selectedElement = item
        console.log(selectedElement)
        const ingredients = selectedElement.affected_ingredient
        for (const elem of ingredients){
          if (this.state.drug2===elem.name){
            this.setState({
              result: elem.severity,
              details: elem.description
            })
            break;
          } else {
            this.setState({
              result: 'no hay info',
              details: 'no hay info'
            })
          }
        }
      }
    }
  }
  onSubmitHandler = event => {
    event.preventDefault();
    this.fetchDataBase()

  }
  async getInputValue (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
    const drug1 = await fetchCIMA(this.state.query1)
    const drug2 = await fetchCIMA(this.state.query2)
    //console.log(drug1)
    //console.log(drug2)
    this.setState({
      drug1: drug1.resultados[0].vtm.nombre,
      drug2: drug2.resultados[0].vtm.nombre,

    })
    console.log(this.state.drug1)
    console.log(this.state.drug2)

  }
  fetchCIMA(id){
    fetchCIMA(id)
    .then(data => {
      return data.resultados[0].vtm.nombre
    })
  }
  onClickHandler = event => {
    console.log(this.state.drug1)
    console.log(this.state.drug2)
  }
  showDetails () {
    this.setState(prevState => {
      return {
        detailsAreHidden: !prevState.detailsAreHidden
      }
    })
  }
  render() {
    return (
      <React.Fragment>
        <header></header>
        <main className='main'>
          <form className='form' onSubmit={this.onSubmitHandler}>
            <label className='label'>Introduzca los nombres de los medicamentos</label>
            <input
            className='input'
            type='text'
            name='query1'
            value={this.state.query1}
            onChange={this.getInputValue}
            />
            <input
            className='input'
            type='text'
            name='query2'
            value={this.state.query2}
            onChange={this.getInputValue}
            />
            <button
            className='btn'
            type='submit'
            onClick={this.onClickHandler}>
              Buscar
            </button>
          </form>
          {this.state.result ? 
          <Result result={this.state.result}
          drug1={this.state.drug1}
          drug2={this.state.drug2}
          details={this.state.details}
          showDetails={this.showDetails}
          detailsAreHidden={this.state.detailsAreHidden}
          /> : null}
        </main>
        <footer></footer>
      </React.Fragment>
    );
  }
}

export default App;
