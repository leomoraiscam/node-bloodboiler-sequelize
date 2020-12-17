const { StatusCodes } = require('http-status-codes');
const { administratorsService } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  list: catchAsync(async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const administrators = await administratorsService.list({
      page,
      perPage,
      sortBy,
    });

    if (!administrators || !administrators.data.length) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(administrators);
  }),

  get: catchAsync(async (request, response) => {
    const { id } = request.params;

    const administrator = await administratorsService.get(id);

    if (!administrator) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(administrator);
  }),

  create: catchAsync(async (request, response) => {
    const { body } = request;

    const administrator = await administratorsService.create(body);

    return response.status(StatusCodes.CREATED).json(administrator);
  }),

  update: catchAsync(async (request, response) => {
    const {
      params: { id },
      body,
    } = request;

    await administratorsService.update(id, body);

    return response
      .status(StatusCodes.NO_CONTENT)
      .set({ 'Content-Length': '0' })
      .end();
  }),

  destroy: catchAsync(async (request, response) => {
    const { id } = request.params;

    await administratorsService.destroy(id);

    return response
      .status(StatusCodes.NO_CONTENT)
      .set({ 'Content-Length': '0' })
      .end();
  }),
};
