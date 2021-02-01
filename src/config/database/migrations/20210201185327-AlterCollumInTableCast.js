module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('casts', 'movie_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('casts', 'movie_id')]);
  },
};
