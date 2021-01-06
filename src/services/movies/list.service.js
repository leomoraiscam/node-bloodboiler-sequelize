const { moviesRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');

module.exports = {
  list: async (options) => {
    const query = queryHelper(options);

    const { count, rows } = await moviesRepository.list(query);
    const totalPages = Math.ceil(count / options.perPage);

    /*const [avaliationMovie] = rows.map((row) => { 
      const { votes } = row.dataValues;
      
      return votes; 
    });*/

    /*const mapeamento = avaliationMovie.map((i) => { 
      return i.dataValues.note; 
    });*/

    /*const media = mapeamento.reduce((acc, next) => { 
      const sum = acc + next; 
      const total = sum / mapeamento.length; 
    
      return total; 
    });*/

    return {
      metadata: {
        total: count,
        totalPages,
        ...(options.page > 1 && { previousPage: options.page - 1 }),
        ...(options.page < count && options.page < totalPages && { nextPage: options.page + 1 }),
      },
      data: rows,
    };
  },
};
