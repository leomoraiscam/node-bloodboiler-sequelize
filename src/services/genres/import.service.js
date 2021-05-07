const fs = require('fs');
const csvParse = require('csv-parse');
const { genresRepository } = require('../../repositories');

module.exports = {
  importGenres: async (params) => {
    const contactReadStream = fs.createReadStream(params.directory);

    const parsers = csvParse({
      delimiter: ',',
    });

    const parseCSV = contactReadStream.pipe(parsers);

    const genresCategories = [];

    parseCSV.on('data', async (line) => {
      const [name, description] = line;

      if (!name || !description) return;

      genresCategories.push({
        name,
        description,
        createdBy: params.createdBy,
        updatedBy: params.updatedBy,
      });
    });

    await new Promise((resolve) => parseCSV.on('end', resolve));

    const valuesGenres = genresCategories.map(async (genre) => {
      const { name, description, createdBy, updatedBy } = genre;

      const existGenre = await genresRepository.get({ name });

      if (!existGenre) {
        await genresRepository.create({
          name,
          description,
          createdBy,
          updatedBy,
        });
      }
    });

    await Promise.all(valuesGenres);

    await fs.promises.unlink(params.directory);
  },
};
