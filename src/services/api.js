import axios from 'axios';

const srvCadastroApi = axios.create({
  baseURL: 'http://localhost:3700',
});

export default { srvCadastroApi };
