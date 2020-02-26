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
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.fetchCIMA = this.debounce(this.fetchCIMA, 500);
    this.selectAnOption = this.selectAnOption.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }
  
  getInputValue(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
    this.fetchCIMA(name, value)
  }
  fetchCIMA (name, value){
    console.log('api llamada')
    fetchCIMA(value)
    .then(data => this.getSuggestions(name, data.resultados))
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
  getSuggestions(name, data){
    let suggestions = []
    for(let i = 0; i<data.length; i++){
      suggestions.push(data[i].nombre)
    }
    if (name==='query1'){
      this.setState({suggestionsDrug1: suggestions})
    } else {
      this.setState({suggestionsDrug2: suggestions})
    }
  }
  selectAnOption(field, value){
    field==='query1' ? this.setState({query1: value, suggestionsDrug1: []}) : this.setState({query2: value, suggestionsDrug2: []});
  }
  onSubmit = ev => {
    ev.preventDefault();
    this.getComponent()
  }
  async getComponent() {
    let drug1 = await fetchCIMA(this.state.query1).then(data => data.resultados[0].vtm.nombre);
    let drug2 = await fetchCIMA(this.state.query2).then(data => {return data.resultados[0].vtm.nombre});
    this.setState({
      drug1: drug1,
      drug2: drug2
    })
  }
  render() {
    const {suggestionsDrug1, suggestionsDrug2} = this.state;
    console.log(this.state.query1);
    console.log(this.state.query2);
    console.log(this.state.drug1);
    console.log(this.state.drug2);

    return (
      <React.Fragment>
        <header></header>
        <main className='main'>
          <form className='form' onSubmit={this.onSubmit}>
            <label className='label'>Introduzca los nombres de los medicamentos</label>
            <input
            className='input'
            type='text'
            name='query1'
            value={this.state.query1}
            onChange={this.getInputValue}
            autoComplete="off"
            />
            {suggestionsDrug1.length>0 ? 
            <Autocomplete suggestionsDrug = {this.state.suggestionsDrug1} name='query1' selectAnOption={this.selectAnOption}/>
            : null}
            <input
            className='input'
            type='text'
            name='query2'
            value={this.state.query2}
            onChange={this.getInputValue}
            autoComplete="off"
            />
            {suggestionsDrug2.length>0 ? 
            <Autocomplete suggestionsDrug = {this.state.suggestionsDrug2} name='query2' selectAnOption={this.selectAnOption}/> 
            : null}
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
