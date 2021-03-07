module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('movies', 'duration', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('movies', 'classification', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('movies', 'year_creation', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('movies', 'duration'),
      queryInterface.removeColumn('movies', 'classification'),
      queryInterface.removeColumn('movies', 'year_creation'),
    ]);
  },
};
