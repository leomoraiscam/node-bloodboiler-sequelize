const { StatusCodes } = require('http-status-codes');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const { moviesRepository, genresMoviesRepository, genresRepository } = require('../../repositories');
const db = require('../../models');

module.exports = {
  create: async (params) => {
    const movieExists = await moviesRepository.get({
      name: params.name,
    });

    if (movieExists) {
      throw new ApplicationError(messages.alreadyExists('movie'), StatusCodes.CONFLICT);
    }

    let transaction;

    try {
      transaction = await db.sequelize.transaction();

      const movie = await moviesRepository.create(params, transaction);

      const parsedItems = await Promise.all(
        params.genresIds.map(async (genre) => {
          const findGenre = await genresRepository.getById(genre);

          if (!findGenre) {
            throw new ApplicationError(messages.notFound('genre'), StatusCodes.NOT_FOUND);
          }

          return {
            movieId: movie.id,
            genreId: genre,
          };
        }),
      );

      await genresMoviesRepository.createAll(parsedItems, transaction);

      await transaction.commit();

      return movie;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }

      if (error.response) {
        throw new ApplicationError(error.response.data[0].mensagem, error.response.status);
      }

      throw error;
    }
  },
};
