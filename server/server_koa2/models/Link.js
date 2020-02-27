module.exports = (sequelize, DataTypes) => {
    return sequelize.define('link', {
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
        freezeTableName: true,
        tableName: 'links',
        timestamps: false,
        underscored: true,
        comment: 'movie download links'
    });
}