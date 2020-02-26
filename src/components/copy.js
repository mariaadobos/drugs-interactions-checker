import React from 'react';
import '../stylesheets/App.scss';
import Result from './Result';
import Autocomplete from './Autocomplete';
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
      suggestionsDrug1: [],
      suggestionsDrug2: [],
      details: '',
      detailsAreHidden: true
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.fetchDataBase = this.fetchDataBase.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.getFirstComponent = this.debounce(this.getFirstComponent, 500)
    this.getSecondComponent = this.debounce(this.getSecondComponent, 500)
    this.chooseDrug = this.chooseDrug.bind(this)
    this.findComponent = this.findComponent.bind(this)
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
      this.getFirstComponent()
    }
    if (name==='query2'){
      this.getSecondComponent()
    }
  }
   async getFirstComponent () {
    const drug1 = await fetchCIMA(this.state.query1)
      if (this.checkResults(drug1) && this.state.query1){
        let suggestionsDrug1 = []
        console.log(drug1)
        for(let i = 0; i<drug1.resultados.length; i++){
          suggestionsDrug1.push(drug1.resultados[i].nombre)
        }
      this.setState({
        suggestionsDrug1: suggestionsDrug1
      })
    }
  }
  async getSecondComponent () {
    const drug2 = await fetchCIMA(this.state.query2)
      if (this.checkResults(drug2)){
      this.setState({
        drug2: drug2.resultados[0].vtm.nombre
      })
    }
  }
  debounce (fn, time){
    let timeOutId
    return function(){
      if(timeOutId){
        clearTimeout(timeOutId)
      }
      const context = this
      const args = arguments
      timeOutId = setTimeout(() => {
        fn.apply(context, args)
      }, time)
    }
  }
  checkResults(res){
    if (!res.resultados[0]){
      this.setState({
        drug1: '',
        drug2: '',
        result: '',
        details: ''
      })
      return false;
    } else {
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
   chooseDrug(name, value){
    if(name==='drug1'){
      this.setState({
        query1: value
      }, function() {
        this.findComponent();
      })
    } else {
      console.log('holi');

    }
  }
  async findComponent(){
    const drug1 = await fetchCIMA(this.state.query1)
    this.setState({
      drug1: drug1
    })

  }
  render() {
    console.log(this.state.query1);
    console.log(this.state.drug1);
    console.log(this.state.suggestionsDrug1);
    
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
            {this.state.suggestionsDrug1.length>0 ? <Autocomplete suggestionsDrug = {this.state.suggestionsDrug1} name='drug1' chooseDrug={this.chooseDrug}/> : null}
            <input
            className='input'
            type='text'
            name='query2'
            value={this.state.query2}
            onChange={this.getInputValue}
            />
            <Autocomplete
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