const { StatusCodes } = require('http-status-codes');
const { addressesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports = {
  destroy: async (id) => {
    const address = await addressesRepository.getById(id);

    if (!address) {
      throw new ApplicationError(messages.notFound('address'), StatusCodes.NOT_FOUND);
    }

    return addressesRepository.destroy(id);
  },
};
