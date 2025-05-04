import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';

class Bus extends Model {
  static associate(models) {
    Bus.belongsTo(models.BusCompany, {
      foreignKey: 'bus_company_id',
      as: 'busCompany',
    });
    Bus.belongsTo(models.Bus, {
      foreignKey: 'parent_bus_id',
      as: 'parentBus',
    });
    Bus.belongsTo(models.Destination, {
      foreignKey: 'bus_from',
      as: 'busFrom',
    });
    Bus.belongsTo(models.Destination, {
      foreignKey: 'bus_to',
      as: 'busTo',
    });
    Bus.hasMany(models.BusSeatPlan, {
      foreignKey: 'bus_id',
      as: 'busSeatPlans',
    });
    Bus.hasMany(models.BusDroppingPoint, {
      foreignKey: 'bus_id',
      as: 'busDroppingPoints',
    });
    Bus.hasMany(models.BusBoardingPoint, {
      foreignKey: 'bus_id',
      as: 'busBoardingPoints',
    });
  }
}

Bus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Bus',
        key: 'id',
      },
    },
    bus_from: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bus_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bus_company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bus_company', // Corrected table name
        key: 'id',
      },
    },
    reseller_lcomission: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reseller_fcomission: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    local_sell_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    foreigner_sell_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    return_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    return_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    departure_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    class: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stock_category', // Corrected table name
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    mm_description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    enable_pay_later: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_share: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_round_trip: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    desire_loc: {
      type: DataTypes.INTEGER,
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
    tableName: 'bus',
    timestamps: false,
    paranoid: true,
    underscored: true,
  }
);

// Set up associations


export default Bus;
