import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

class BusBoardingPoint extends Model {
    static associate(models) {
        BusBoardingPoint.belongsTo(models.Bus, {
            foreignKey: 'bus_id',
            as: 'bus',
        });
        BusBoardingPoint.belongsTo(models.Station, {
            foreignKey: 'station_id',
            as: 'station',
        });
    }
}

BusBoardingPoint.init({
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
    tableName: 'bus_boarding_point',
    timestamps: false,
    underscored: true,
});

export default BusBoardingPoint;