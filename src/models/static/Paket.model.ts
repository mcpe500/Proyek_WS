// models/Paket.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../../connection/connectionStatic";
import { IPaket } from "../../contracts/dto/Paket.dto";

class Paket extends Model<IPaket> {
  public Paket_id!: number;
  public Paket_name!: string;
  public Paket_description!: string;
  public Paket_Limit!: number;
  public Paket_price!: number;
  public Paket_price_currency!: string;
}

Paket.init(
  {
    Paket_id: {
      type: DataTypes.CHAR(6),
      primaryKey: true,
    },
    Paket_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Paket_description: {
      type: DataTypes.TEXT,
    },
    Paket_Limit: {
      type: DataTypes.INTEGER,
    },
    Paket_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Paket_price_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "IDR",
    },
  },
  {
    sequelize: sequelize,
    modelName: "Paket",
    tableName: "pakets",
    timestamps: false,
  }
);

export default Paket;
