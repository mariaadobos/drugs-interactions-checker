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
    this.selectAnOption = this.selectAnOption.bind(this);
  }
  
  getInputValue(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
    fetchCIMA(value)
    .then(data => this.getSuggestions(name, data.resultados))
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
  render() {
    const {suggestionsDrug1, suggestionsDrug2} = this.state;
    console.log(this.state.query1);
    console.log(this.state.query2);
    console.log(this.state.suggestionsDrug1);
    console.log(this.state.suggestionsDrug2);

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
            {suggestionsDrug1.length>0 ? 
            <Autocomplete suggestionsDrug = {this.state.suggestionsDrug1} name='query1' selectAnOption={this.selectAnOption}/>
            : null}
            <input
            className='input'
            type='text'
            name='query2'
            value={this.state.query2}
            onChange={this.getInputValue}
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
