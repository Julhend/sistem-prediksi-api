'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: 'userId' })
      this.belongsTo(models.customers, { foreignKey: 'customerId' })
      this.hasMany(models.carts, { foreignKey: 'transactionId' })
    }
  };
  transactions.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4()
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    totalPay: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transactions',
  });
  return transactions;
};