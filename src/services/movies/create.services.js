const { moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');

module.exports = {
  create: async (params) => {
    const movieExists = await moviesRepository.getByName(params.name);

    if (movieExists) {
      throw new ApplicationError('the movie already exists', 400);
    }

    const createMovies = await moviesRepository.create({
      name: params.name,
      director: params.director,
      author: params.author,
      genre: params.genre,
    });

    return createMovies;
  },
};
