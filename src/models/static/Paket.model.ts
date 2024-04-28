// // models/Paket.ts
// import { DataTypes, Model } from "sequelize";
// import sequelize from "../db"; // Assuming you have a Sequelize instance already set up

// class Paket extends Model {
//   public Paket_id!: number;
//   public Paket_name!: string;
//   public Paket_description!: string;
//   public Paket_Limit!: number;
//   public Paket_price!: number;
// }

// Paket.init(
//   {
//     Paket_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     Paket_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Paket_description: {
//       type: DataTypes.TEXT,
//     },
//     Paket_Limit: {
//       type: DataTypes.INTEGER,
//     },
//     Paket_price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Paket",
//   }
// );

// export default Paket;
