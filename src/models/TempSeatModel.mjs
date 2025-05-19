import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs'; // Adjust the path if needed

class TempSeat extends Model {
  static associate(models) {
    TempSeat.belongsTo(models.Bus, {
      foreignKey: 'bus_id',
      as: 'bus',
    });
    TempSeat.belongsTo(models.BusSeatPlan, {
      foreignKey: 'seat_id',
      as: 'seat',
    });
  }
}

TempSeat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    travel_date: {
      type: DataTypes.TEXT(255), //  matching the VARCHAR type
      allowNull: true, 
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bus', // Correct table name
        key: 'id',
      },
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bus_seat_plan', // Correct table name
        key: 'id',
      },
    },
    selected_seat: {
      type: DataTypes.TEXT(255), //  matching the VARCHAR type
      allowNull: true,
    },
    expiry_date: {
      type: DataTypes.DATE, //  it's a timestamp
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
    tableName: 'temp_seat',
    timestamps: false, //  If you don't want timestamps
    underscored: true, // Use snake_case for column names
  }
);

export default TempSeat;