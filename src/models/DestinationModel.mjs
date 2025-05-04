import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';


class Destination extends Model { }

Destination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    meta_keyword: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING('long'),
      allowNull: true,
    },
    mm_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mm_description: {
      type: DataTypes.STRING('long'),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING(255),
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
    tableName: 'destination',
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['created_at', 'updated_at', 'deleted_at'],
      },
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Destination;
