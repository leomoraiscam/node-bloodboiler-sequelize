const { encryptor } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordResetToken: {
        type: DataTypes.STRING,
        field: 'password_reset_token',
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
      tableName: 'users',
    },
  );

  User.associate = function associate(models) {
    models.User.hasOne(models.Administrator, {
      foreignKey: 'idUser',
      as: 'administrator',
    });
    models.User.hasMany(models.Addresses, {
      foreignKey: 'idUser',
      as: 'addresses',
    });
    models.User.hasMany(models.Votes, {
      foreignKey: 'idUser',
      as: 'votes',
    });
  };

  User.beforeSave(async (user, options) => {
    const password = await encryptor.hashPassword(user.password);
    if (user.changed('password')) {
      Object.assign(user, { password });
    }
    return user;
  });

  User.prototype.toJSON = function() {
    const user = { ...this.get() };
    return Object.fromEntries(Object.entries(user).filter(([key]) => !['password'].includes(key)));
  };

  return User;
};
