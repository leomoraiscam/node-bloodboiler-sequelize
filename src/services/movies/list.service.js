const { moviesRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');
const { set, recover } = require('../../lib/cache');

module.exports = {
  list: async (options) => {
    const today = new Intl.DateTimeFormat('pt-BR').format(new Date(Date.now()));
    const cacheKey = `movies-list:${today}`;

    let movies = await recover(cacheKey);

    if (!movies) {
      const query = queryHelper(options);

      const { count, rows } = await moviesRepository.list(query);
      const totalPages = Math.ceil(count / options.perPage);

      movies = {
        metadata: {
          total: count,
          totalPages,
          ...(options.page > 1 && { previousPage: options.page - 1 }),
          ...(options.page < count && options.page < totalPages && { nextPage: options.page + 1 }),
        },
        data: rows,
      };

      await set(cacheKey, movies);
    }

    return movies;
  },
};
