"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pakets", {
      Paket_id: {
        type: Sequelize.CHAR(6),
        primaryKey: true,
      },
      Paket_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Paket_description: {
        type: Sequelize.TEXT,
      },
      Paket_Limit: {
        type: Sequelize.INTEGER,
      },
      Paket_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Paket_price_currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "IDR",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pakets");
  },
};
