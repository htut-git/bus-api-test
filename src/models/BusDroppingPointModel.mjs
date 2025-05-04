import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

class BusDroppingPoint extends Model {
    static associate(models) {
        BusDroppingPoint.belongsTo(models.Bus, {
            foreignKey: 'bus_id',
            as: 'bus',
        });
        BusDroppingPoint.belongsTo(models.Station, {
            foreignKey: 'station_id',
            as: 'station',
        });
    }
}

BusDroppingPoint.init({
    bus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bus',
            key: 'id',
        },
        primaryKey: true,
    },
    station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'station',
            key: 'id',
        },
        primaryKey: true,
    },
}, {
    sequelize : sequelize,
    tableName: 'bus_dropping_point',
    timestamps: false,
    underscored: true,
});

export default BusDroppingPoint;