

import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/init.mjs";

export class Classify extends Model { }

Classify.init({

}, {
    sequelize,
    freezeTableName: true,
    tableName: 'classify',
    timestamps: false,
    underscored: true,
});