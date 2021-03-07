module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('casts', 'name', 'actor');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('casts', 'actor', 'name');
  },
};
