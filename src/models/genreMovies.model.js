module.exports = (sequelize, DataTypes) => {
  const GenreMovie = sequelize.define(
    'GenreMovie',
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'movie_id',
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'genre_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      tableName: 'movie_genres',
    },
  );

  return GenreMovie;
};
