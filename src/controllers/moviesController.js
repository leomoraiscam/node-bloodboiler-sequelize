const { request } = require('express');
const { StatusCodes } = require('http-status-codes');
const { response } = require('../config/express');
const { moviesService } = require('../services');
const { catchAsync } = require('../utils');

module.exports = {
  index: catchAsync(async (request, response) => {
    const { id } = request.params;

    const movie = await moviesService.get(id);

    if (!movie) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(movie);
  }),
  list: catchAsync(async (request, response) => {
    const { page, perPage, sortBy } = request.query;

    const movies = await moviesService.index({ page, perPage, sortBy });

    if (movies.data.length === 0) {
      return response
        .status(StatusCodes.NO_CONTENT)
        .set({ 'Content-Length': '0' })
        .end();
    }

    return response.status(StatusCodes.OK).json(movies);
  }),
  create: catchAsync(async (request, response) => {
    const { body } = request;
    const movie = await moviesService.create(body);

    return response.status(StatusCodes.CREATED).json(movie);
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
