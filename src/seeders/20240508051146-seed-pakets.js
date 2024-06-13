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
        Paket_name: "Starter",
        Paket_description: "Free package with limited rate",
        Paket_Limit: 15,
        Paket_price: 0,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK002",
        Paket_name: "Essential",
        Paket_description: "Basic package with moderate rate",
        Paket_Limit: 100,
        Paket_price: 75000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK003",
        Paket_name: "Pro",
        Paket_description: "Intermediate package with higher rate",
        Paket_Limit: 300,
        Paket_price: 150000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK004",
        Paket_name: "Premium",
        Paket_description: "Advanced package with high rate",
        Paket_Limit: 800,
        Paket_price: 300000,
        Paket_price_currency: "IDR",
      },
      {
        Paket_id: "PAK005",
        Paket_name: "Unlimited",
        Paket_description: "Enterprise package for high-demand applications",
        Paket_Limit: 5000,
        Paket_price: 1500000,
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
