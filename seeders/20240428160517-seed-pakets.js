"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("pakets", [
      {
        Paket_id: "PAK001",
        Paket_name: "Gratis",
        Paket_description: "Free package with limited rate",
        Paket_Limit: 2,
        Paket_price: 0,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK002",
        Paket_name: "Paket 1",
        Paket_description: "Basic package with moderate rate",
        Paket_Limit: 20,
        Paket_price: 50000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK003",
        Paket_name: "Paket 2",
        Paket_description: "Standard package with higher rate",
        Paket_Limit: 50,
        Paket_price: 100000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK004",
        Paket_name: "Paket 3",
        Paket_description: "Premium package with high rate",
        Paket_Limit: 150,
        Paket_price: 250000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK005",
        Paket_name: "Enterprise",
        Paket_description: "Custom package for high-demand applications",
        Paket_Limit: 1000,
        Paket_price: 2000000,
        Paket_price_currency: "IDR",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("pakets", null, {});
  },
};
