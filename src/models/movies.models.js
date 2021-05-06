module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    'Movies',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      classification: {
        type: DataTypes.ENUM('7+', '13+', '16+', '18+'),
        allowNull: false,
      },
      yearCreation: {
        type: DataTypes.INTEGER,
        field: 'year_creation',
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        field: 'created_by_user_id',
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        field: 'updated_by_user_id',
        allowNull: false,
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
      cover_url: {
        type: DataTypes.VIRTUAL,
        get() {
          switch (process.env.STORAGE_TYPE) {
            case 'local':
              return `${process.env.LOCAL_URL}:${process.env.PORT}/files/${this.cover}`;
            case 's3':
              return `${process.env.S3_URL}/${this.cover}`;
            default:
              return null;
          }
        },
      },
    },
    {
      paranoid: true,
      tableName: 'movies',
    },
  );

  Movies.associate = function associate(models) {
    models.Movies.belongsTo(models.Administrator, {
      foreignKey: 'createdBy',
    });
    models.Movies.belongsTo(models.Administrator, {
      foreignKey: 'updatedBy',
    });
    models.Movies.hasMany(models.Votes, {
      foreignKey: 'idMovie',
      as: 'votes',
    });
    models.Movies.hasMany(models.Casts, {
      foreignKey: 'idMovie',
      as: 'casts',
    });
    models.Movies.belongsToMany(models.Genres, {
      foreignKey: 'movie_id',
      through: 'movie_genres',
      as: 'genres',
    });
  };

  return Movies;
};
