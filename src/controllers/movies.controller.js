const { StatusCodes } = require('http-status-codes');
const { moviesService } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  list: catchAsync(async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const movies = await moviesService.list({
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

    const movie = await moviesService.get(id);

    return response.status(StatusCodes.OK).json(movie);
  }),

  create: catchAsync(async (request, response) => {
    const {
      body,
      session: { id },
    } = request;

    const finalbody = {
      ...body,
      createdBy: id,
      updatedBy: id,
    };

    const movie = await moviesService.create(finalbody);

    return response.status(StatusCodes.CREATED).json(movie);
  }),

  update: catchAsync(async (request, response) => {
    const {
      params: { id },
      session,
      body,
    } = request;

    const finalbody = {
      ...body,
      updatedBy: session.id,
    };

    await moviesService.update(id, finalbody);

    return response
      .status(StatusCodes.NO_CONTENT)
      .set({ 'Content-Length': '0' })
      .end();
  }),

  destroy: catchAsync(async (request, response) => {
    const { id } = request.params;

    await moviesService.destroy(id);

    return response
      .status(StatusCodes.NO_CONTENT)
      .set({ 'Content-Length': '0' })
      .end();
  }),
};
