import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/init.mjs";

export class Link extends Model { }

Link.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    link: {
        type: DataTypes.STRING(110),
        field: 'link'
    }
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'links',
    timestamps: false,
    underscored: true,
    comment: 'movie download links'
});