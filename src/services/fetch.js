const CIMA = 'https://cima.aemps.es/cima/rest/medicamentos?nombre=';

const fetchCIMA = query => fetch(CIMA+query).then(response => response.json());


export { fetchCIMA };