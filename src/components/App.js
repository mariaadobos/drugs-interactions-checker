import React from 'react';
import '../stylesheets/App.scss';
import Result from './Result'
import {fetchCIMA, fetchDataBase} from '../services/fetch'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query1: '',
      query2: '',
      drug1: '',
      drug2: '',
      result: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.getValue = this.getValue.bind(this)
    this.fetchDataBase = this.fetchDataBase.bind(this)
  }

  fetchDataBase(){
    fetchDataBase()
    .then(data => this.getInfo(data.interactions))
  } 
  getInfo(interactions){
    for (const item of interactions){
      if (this.state.drug1===item.ingredient){
        const selectedElement = item
        const ingredients = selectedElement.affected_ingredient
        for (const elem of ingredients){
          if (this.state.drug2===elem.name){
            this.setState({
              result: elem.severity
            })
          } else {
            this.setState({
              result: 'noni'
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
  getInputValue = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
    this.getValue(name)
  }
  getValue(name){
    if (this.state.query1 || name==='query1'){
      fetchCIMA(this.state.query1)
      .then(data => {
        this.setState({
          drug1: data.resultados[0].vtm.nombre
        })
      })
      }
      if (this.state.query2 || name==='query2'){
        fetchCIMA(this.state.query2)
        .then(data => {
          this.setState({
            drug2: data.resultados[0].vtm.nombre
          })
        }) 
      }
  }
  onClickHandler = event => {
    console.log(this.state.drug1)
    console.log(this.state.drug2)
    this.fetchDataBase()
  }
  render() {
    return (
      <React.Fragment>
        <header></header>
        <main className='main'>
          <form className='form' onSubmit={this.onSubmitHandler}>
            <label>Introduzca los nombres de los medicamentos</label>
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
            type='submit'
            onClick={this.onClickHandler}>
              Comparar
            </button>
          </form>
          {this.state.result ? <Result result={this.state.result}/> : null}
        </main>
        <footer></footer>
      </React.Fragment>
    );
  }
}

export default App;
