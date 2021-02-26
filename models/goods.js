'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.categories, { foreignKey: 'categoryId' })
      this.hasMany(models.carts, { foreignKey: 'goodsId' })
      this.hasMany(models.incomingGoods, { foreignKey: 'goodsId' })
      this.hasMany(models.bookings, { foreignKey: 'goodsId' })
    }
  };
  goods.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'goods',
  });
  return goods;
};