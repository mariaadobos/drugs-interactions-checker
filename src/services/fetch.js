const CIMA = 'https://cima.aemps.es/cima/rest/medicamentos?nombre=';

const fetchCIMA = query => fetch(CIMA+query).then(response => response.json());
const fetchDataBase = () => fetch('./data/interactions.json').then(response => response.json())

export { fetchCIMA, fetchDataBase };