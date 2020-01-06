const ENDPOINT = 'https://...';

const fetchCIMA = () => fetch(ENDPOINT).then(response => response.json());

export { fetchCIMA };