const { StatusCodes } = require('http-status-codes');
const { castsServices } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  list: catchAsync(async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const movies = await castsServices.list({
      page,
      perPage,
      sortBy,
    });

    if (!movies || movies.data.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(movies);
  }),

  get: catchAsync(async (request, response) => {
    const { id } = request.params;

    const cast = await castsServices.get(id);

    return response.status(StatusCodes.OK).json(cast);
  }),

  create: catchAsync(async (request, response) => {
    const { body } = request;

    const address = await castsServices.create(body);

    return response.status(StatusCodes.CREATED).json(address);
  }),
};
