const axios = require('axios');
const URL = `https://viacep.com.br/ws/`;

async function getInfoByCep(cep) {
  const url = `${URL}/${cep}/json/`;
  const response = await axios.get(url);
  const { data } = response;
  return data;
}

module.exports = {
  getInfoByCep,
};
