const { StatusCodes } = require('http-status-codes');
const { moviesService } = require('../services');

module.exports = {
  index: async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const movies = await moviesService.index({ page, perPage, sortBy });

    if (movies.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(movies);
  },
  create: async (request, response) => {
    const { body } = request;
    const movie = await moviesService.create(body);

    return res.status(StatusCodes.CREATED).json(movie);
  },
};
