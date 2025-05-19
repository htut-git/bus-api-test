import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs'; // Adjust the path if needed

class ReservedSeat extends Model {
  static associate(models) {
    ReservedSeat.belongsTo(models.BusSeatPlan, {
      foreignKey: 'seat_id', // Corrected to seat_id
      as: 'seat',
    });
     ReservedSeat.belongsTo(models.Bus, {
      foreignKey: 'bus_id',
      as: 'bus',
    });
  }
}

ReservedSeat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Or false, depending on your requirements
      references: {
        model: 'users', // Correct table name
        key: 'id',
      },
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Or false
      references: {
        model: 'bus_seat_plan', // Correct table name
        key: 'id',
      },
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Or false
       references: {
        model: 'bus', // Correct table name
        key: 'id',
      },
    },
    blockMap: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'blockMap',
    },
    start: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    end: {
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
    tableName: 'reserved_seat', // Correct table name, all lowercase
    timestamps: false, //  If you don't want timestamps
    underscored: true, // Use snake_case for column names
  }
);

export default ReservedSeat;