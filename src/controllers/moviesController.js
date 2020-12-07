const { StatusCodes } = require('http-status-codes');
const { moviesService } = require('../services');

module.exports = {
  index: async (request, response) => {
    const movies = await moviesService.index();

    if (movies.length === 0) {
      return response.status(StatusCodes.NO_CONTENT).end();
    }

    return response.status(StatusCodes.OK).json(movies);
  },
  create: async (req, res) => {
    const { body } = req;
    const response = await moviesService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  },
};
