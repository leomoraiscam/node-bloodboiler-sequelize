module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('genres', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('genres', 'description');
  },
};
