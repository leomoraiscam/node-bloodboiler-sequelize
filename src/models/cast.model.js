module.exports = (sequelize, DataTypes) => {
  const Casts = sequelize.define(
    'Casts',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      character: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idMovie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_movie',
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
      tableName: 'casts',
    },
  );

  Casts.associate = function associate(models) {
    models.Casts.belongsTo(models.Movies, {
      foreignKey: 'idMovie',
      as: 'movie',
    });
  };

  return Casts;
};
