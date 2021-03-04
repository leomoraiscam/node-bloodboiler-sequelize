const { StatusCodes } = require('http-status-codes');
const { castsServices } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  get: catchAsync(async (request, response) => {
    const { cep } = request.params;

    const address = await castsServices.get(cep);

    return response.status(StatusCodes.OK).json(address);
  }),

  create: catchAsync(async (request, response) => {
    const { body } = request;

    const address = await castsServices.create(body);

    return response.status(StatusCodes.CREATED).json(address);
  }),
};
