module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('movies', 'classification', {
      type: Sequelize.ENUM('7+', '13+', '16+', '18+'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('movies', 'classification', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_movies_classification";');
  },
};
