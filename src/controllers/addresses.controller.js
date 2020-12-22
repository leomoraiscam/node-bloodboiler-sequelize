const { StatusCodes } = require('http-status-codes');
const { addressesServives } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  get: catchAsync(async (request, response) => {
    const { cep } = request.params;

    const address = await addressesServives.get(cep);

    return response.status(StatusCodes.OK).json(address);
  }),
  create: catchAsync(async (request, response) => {
    const { body } = request;

    const address = await addressesServives.create(body);

    return response.status(StatusCodes.CREATED).json(address);
  }),
};
