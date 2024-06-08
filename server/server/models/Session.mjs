import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/init.mjs";

export class Session extends Model { }

Session.init({
    sid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'sessions',
    timestamps: false,
    underscored: true,
});

export function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId
    };
}