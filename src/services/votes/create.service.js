const { StatusCodes } = require('http-status-codes');
const { votesRepository, usersRepository, moviesRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.create = async (params) => {
  console.log(params);

  const userExist = await usersRepository.getById(params.idUser);

  if (!userExist) {
    throw new ApplicationError(messages.notFound('user'), StatusCodes.CONFLICT);
  }

  const movieExist = await moviesRepository.getById(params.idMovie);

  if (!movieExist) {
    throw new ApplicationError(messages.notFound('movie'), StatusCodes.CONFLICT);
  }

  const existVoteByUserForMovie = await votesRepository.get({
    movie_id: params.idMovie,
    user_id: params.idUser,
  });

  if (existVoteByUserForMovie) {
    throw new ApplicationError(messages.alreadyExists('user alredy vote'), StatusCodes.CONFLICT);
  }

  return votesRepository.create(params);
};
