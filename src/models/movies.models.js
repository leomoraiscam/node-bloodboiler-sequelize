module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    'Movies',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      director: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      genre: { type: DataTypes.STRING, allowNull: false },
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
      deleteAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
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
  };

  return Movies;
};
