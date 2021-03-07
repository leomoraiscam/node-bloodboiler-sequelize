module.exports = (sequelize, DataTypes) => {
  const Casts = sequelize.define(
    'Casts',
    {
      actor: {
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
