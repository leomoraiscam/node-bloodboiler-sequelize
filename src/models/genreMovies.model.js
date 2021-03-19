module.exports = (sequelize, DataTypes) => {
  const GenreMovie = sequelize.define(
    'GenreMovie',
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'movie_genres',
    },
  );

  return GenreMovie;
};
