const { StatusCodes } = require('http-status-codes');
const { votesService } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  list: catchAsync(async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const movies = await votesService.list({
      page,
      perPage,
      sortBy,
    });

    return response.status(StatusCodes.OK).json(movies);
  }),
  create: catchAsync(async (request, response) => {
    const { body } = request;

    const vote = await votesService.create(body);

    return response.status(StatusCodes.CREATED).json(vote);
  }),
};
