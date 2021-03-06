'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.cards, { foreignKey: 'userId' })
      // this.hasMany(models.subscriptions, { foreignKey: 'userId' })
      // this.hasMany(models.expenses, { foreignKey: 'userId' })
    }
  }
  users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4()
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'users',
  });
  return users;
};