import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

class Station extends Model {
    static associate(models) {

    }
}

Station.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    meta_tag: {
        type: DataTypes.TEXT,
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
}, {
    sequelize,
    tableName: 'station',
    timestamps: false,
    paranoid: true,
    underscored: true,
});

export default Station;