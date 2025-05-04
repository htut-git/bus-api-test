import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";

class BusCompany extends Model {}

BusCompany.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    mm_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mm_description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    company_logo: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    ticket_contact: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
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
    tableName: "bus_company",
    timestamps: false,
    paranoid: true, 
    underscored: true,
  }
);

export default BusCompany;
