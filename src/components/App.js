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
    if (name==='query1'){
      const drug1 = await fetchCIMA(this.state.query1)
      if (this.checkResults(drug1)){
      this.setState({
        drug1: drug1.resultados[0].vtm.nombre
      })
    }
    }
    if (name==='query2'){
      const drug2 = await fetchCIMA(this.state.query2)
      if (this.checkResults(drug2)){
      this.setState({
        drug2: drug2.resultados[0].vtm.nombre
      })
    }
    }
  }
  checkResults(res){
    console.log(res)
    if (!res.resultados[0]){
      this.setState({
        drug1: '',
        drug2: '',
        result: '',
        details: ''
      })
      return false;
    }else{
      return true
    }
  }
  fetchCIMA(id){
    fetchCIMA(id)
    .then(data => {
      return data.resultados[0].vtm.nombre
    })
  }
  
  showDetails () {
    this.setState(prevState => {
      return {
        detailsAreHidden: !prevState.detailsAreHidden
      }
    })
  }
  render() {
    console.log(this.state.drug1);
    console.log(this.state.drug2);

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
            type='submit'>
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
