import React from 'react';
import '../stylesheets/App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drug1: '',
      drug2: '',
      result: '',
      suggestion: []
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.fetchCIMA = this.fetchCIMA.bind(this);
    this.getData = this.getData.bind(this);
  }
  fetchCIMA = () => {
    const ENDPOINT = `https://cima.aemps.es/cima/rest/medicamentos?nombre=${this.state.drug1}`;
    fetch(ENDPOINT)
  .then(response => response.json())
  .then(data => this.getData(data.resultados))
  }
  getData (data) {
    console.log(data[0].nombre)
    const suggestionArray = []
    for (let item of data){
       suggestionArray.push(item.nombre)
    }
    console.log(suggestionArray)
    this.setState({
      suggestion: suggestionArray
    })
  }
  onSubmitHandler = event => {
    event.preventDefault();
  }
  getInputValue = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
    console.log(this.state.drug1)
    console.log(this.state.drug2)
  }
  onClickHandler = event => {
    this.fetchCIMA()
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
            name='drug1'
            value={this.state.drug1}
            onChange={this.getInputValue}
            />
            <input
            className='input'
            type='text'
            name='drug2'
            value={this.state.drug2}
            onChange={this.getInputValue}
            />
            <button
            type='submit'
            onClick={this.onClickHandler}>
              Comparar
            </button>
          </form>
          <section>
            <p>{this.state.result}</p>
          </section>
        </main>
        <footer></footer>
      </React.Fragment>
    );
  }
}

export default App;
