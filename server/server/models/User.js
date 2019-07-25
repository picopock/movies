export default (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT(11),
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(110),
            field: 'username',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(40),
            field: 'password',
            allowNull: false
        },
        permission: {
            type: DataTypes.ENUM,
            values: ['GUEST', 'ADMIN', 'OPERATOR'],
            field: 'permission',
            allowNull: false,
            validate: {
                isIn: {
                    args: [['GUEST', 'ADMIN', 'OPERATOR']],
                    msg: 'Invalidate permission params'
                }
            }
        },
        email: {
            type: DataTypes.STRING(110),
            field: 'email',
            allowNull: true
        },
        tel: {
            type: DataTypes.STRING(30),
            field: 'tel',
            allowNull: true
        },
        nickname: {
            type: DataTypes.STRING(110),
            field: 'nickname',
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'users',
        underscored: true,
        timestamps: true,
        // I don't want createdAt
        // createdAt: false,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'update_timestamp',
        // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
        deletedAt: 'destroy_time',
        paranoid: true
    })
}
