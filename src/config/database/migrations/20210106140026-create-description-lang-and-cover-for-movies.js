module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('movies', 'description', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('movies', 'lang', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pt',
      }),
      queryInterface.addColumn('movies', 'cover', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('movies', 'description'),
      queryInterface.removeColumn('movies', 'lang'),
      queryInterface.removeColumn('movies', 'cover'),
    ]);
  },
};
