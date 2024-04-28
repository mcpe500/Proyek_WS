import sequelize from "../src/connection/connectionStatic";
import Paket from "../src/models/static/Paket.model";

const createTables = async () => {
  try {
    Paket;
    await sequelize.sync({ force: true, alter: true });
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
  //   process.exit(0);
};

createTables();
