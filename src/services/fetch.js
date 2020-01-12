const ENDPOINT = 'https://...';

const fetchCIMA = () => fetch(ENDPOINT).then(response => response.json());
const fetchDataBase = () => fetch('./data/interactions.json').then(response => response.json())

export { fetchCIMA, fetchDataBase };