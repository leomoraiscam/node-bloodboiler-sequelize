module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define(
    'Genres',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'created_by_user_id',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'updated_by_user_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      paramoid: true,
      tableName: 'genres',
    },
  );

  Genres.associate = function associate(models) {
    models.Genres.belongsToMany(models.Movies, {
      foreignKey: 'genre_id',
      through: 'movie_genres',
      as: 'movies',
    });
  };

  return Genres;
};
