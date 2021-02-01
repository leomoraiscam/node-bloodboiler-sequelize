module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('movies', 'description', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('movies', 'lang', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('movies', 'cover', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('movies', 'description'),
      queryInterface.removeColumn('movies', 'lang'),
      queryInterface.removeColumn('movies', 'cover'),
    ]);
  },
};
