import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';

class BusSeatPlan extends Model {
  static associate(models){
    BusSeatPlan.belongsTo(models.BusStructureType, {
      foreignKey: 'bus_structure_id',
      as: 'busStructure',
    });
    
    BusSeatPlan.belongsTo(models.Bus, {
      foreignKey: 'bus_id',
      as: 'bus',
    });

    BusSeatPlan.hasMany(models.Booking, {
      foreignKey: 'seat_id',
      as: 'bookings',
    })
  }
}

BusSeatPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bus', // Corrected table name
        key: 'id',
      },
    },
    bus_structure_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'busstructuretypes', // Corrected table name
        key: 'id',
      },
    },
    bus_travel_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    bus_info: {
      type: DataTypes.STRING('long'),
      allowNull: true,
    },
    prefix: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seatMap: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'seatMap',
    },
    blockMap: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'blockMap',
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
    tableName: 'bus_seat_plan', // Correct table name, all lowercase
    timestamps: false, // Enables created_at and updated_at
    underscored: true, // Uses snake_case for column names
  }
);


export default BusSeatPlan;
