const axios = require('axios');
const URL = `https://viacep.com.br/ws/`;

async function getInfoByCep(zipCode) {
  const url = `${URL}/${zipCode}/json/`;
  const response = await axios.get(url);
  const { data } = response;
  return data;
}

module.exports = {
  getInfoByCep,
};
