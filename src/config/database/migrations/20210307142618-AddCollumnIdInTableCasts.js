module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('casts', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('casts', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
