import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';

class BusStructureType extends Model {}

BusStructureType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    structure_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    structure_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'busstructuretypes', // Correct table name, all lowercase
    timestamps: false, // Enables created_at and updated_at fields
    underscored: true, // Uses snake_case for column names
  }
);

export default BusStructureType;
