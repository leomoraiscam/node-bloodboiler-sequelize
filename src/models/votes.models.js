module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define(
    'Votes',
    {
      note: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },
      idMovie: {
        type: DataTypes.INTEGER,
        field: 'movie_id',
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
    },
    {
      tableName: 'votes',
    },
  );

  Votes.associate = function associate(models) {
    models.Votes.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
    models.Movies.belongsTo(models.Votes, {
      foreignKey: 'idMovie',
    });
  };

  return Votes;
};
