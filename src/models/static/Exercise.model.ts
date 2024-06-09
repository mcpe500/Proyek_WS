import { DataTypes, Model } from "sequelize";
import sequelize from "../../connection/connectionStatic";

// Suggested code may be subject to a license. Learn more: ~LicenseLog:93466002.
class Exercies extends Model {
  public Exercise_id!: number;
  public Exercise_name!: string;
  public Exercise_description!: string;
  public Exercise_Sets!: number;
  public Exercise_Repetition!: number;
  public Exercise_RestBetweenSetsInSeconds!: number;
  
  
  
}

Exercies.init(
  {
    Exercise_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Exercise_description: {
      type: DataTypes.TEXT,
    },
    Exercise_Sets: {
      type: DataTypes.INTEGER,
    },
    Exercise_Repetition: {
      type: DataTypes.INTEGER,
    },
    Exercise_RestBetweenSetsInSeconds: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Exercies",
    tableName: "exercises",
    timestamps: false,
  }
);

export default Exercies;
