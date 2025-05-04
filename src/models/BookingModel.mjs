import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs'; // Adjust the path if needed

class Booking extends Model {
  static associate(models) {
    // Define associations here, for example:
    // Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    // Booking.belongsTo(models.Bus, { foreignKey: 'bus_id' });
  }
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    b_ref: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { // Removed to prevent errors, add back if the model User exists
      //   model: 'users',
      //   key: 'id',
      // },
    },
    user_child_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {  // Removed to prevent errors, add back if the model Bus exists
      //   model: 'bus',
      //   key: 'id',
      // },
    },
    offer_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    original_selling_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    travel_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    original_travel_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adult: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    used_bonus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    guest: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    guest_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    guest_mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    guest_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nrc_no: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_complete: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seat: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    selected_seat: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bank_remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_clear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dollar_collect: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ref: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    passenger_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    passenger_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    boarding_point: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dropping_point: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    booking_expire: {
      type: DataTypes.DATE,
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
     del_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'booking',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Booking;
