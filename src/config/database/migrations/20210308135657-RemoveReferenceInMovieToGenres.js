module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('movies', 'id_genre');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'id_genre', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'genres', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
