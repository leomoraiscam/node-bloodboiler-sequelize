const { StatusCodes } = require('http-status-codes');
const { getInfoByCep } = require('../api/viacep');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  get: async (cep) => {
    const address = await getInfoByCep(cep);

    if (!address) {
      throw new ApplicationError(messages.notFound('address'), StatusCodes.NOT_FOUND);
    }

    return address;
  },
};
