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
      genre: {
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
    },
    {
      tableName: 'movies',
      paranoid: true,
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
  };

  return Movies;
};
