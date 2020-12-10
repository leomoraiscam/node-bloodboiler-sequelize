const { StatusCodes } = require('http-status-codes');
const { administratorsService } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  index: async (request, response) => {
    const administrators = await administratorsService.index();

    if (administrators.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(administrators);
  },
  list: async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const administrators = await administratorsService.list({ page, perPage, sortBy });

    if (!response || response.data.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(administrators);
  },
  create: catchAsync(async (request, response) => {
    const { body } = request;

    const administrator = await administratorsService.create(body);

    return response.status(StatusCodes.CREATED).json(administrator);
  }),
};
