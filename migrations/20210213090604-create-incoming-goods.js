'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('incomingGoods', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      goodsId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "goods",
          key: "id"
        },
      },
      supplierId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "suppliers",
          key: "id"
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('incomingGoods');
  }
};