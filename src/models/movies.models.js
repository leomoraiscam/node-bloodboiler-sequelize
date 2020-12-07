module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    'Movies',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      director: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      genre: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'movies',
    },
  );

  Movies.associate = function associate(models) {
    models.Movies.belongsTo(models.Administrator, {
      foreignKey: 'id_user',
    });
  };

  return Movies;
};
