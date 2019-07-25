export default (sequelize, DataTypes) => {
    return sequelize.define('session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        userId: DataTypes.STRING,
        expires: DataTypes.DATE,
        data: DataTypes.TEXT
    }, {
        // freezeTableName: true,
        // tableName: 'sessions',
        // timestamps: false,
        // underscored: true,
    });
}

export function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId
    };
}