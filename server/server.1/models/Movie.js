module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movie', {
        id: {
            type: DataTypes.BIGINT(11),
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(110),
            field: 'name',
            allowNull: false
        },
        aliasName: {
            type: DataTypes.STRING(110),
            field: 'alias_name',
        },
        classify: DataTypes.STRING(50),
        publishDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'publish_date'
        },
        country: DataTypes.STRING(30),
        language: DataTypes.STRING(30),
        fileFormat: {
            type: DataTypes.STRING(30),
            field: 'file_format'
        },
        clarity: DataTypes.STRING(110),
        resolutionW: {
            type: DataTypes.INTEGER(),
            field: 'resolution_w',
            validate: {
                min: {
                    args: [0],
                    msg: 'The minimum width of resolution is 0'
                },
                max: {
                    args: [1280],
                    msg: 'The maximum width of resolution is 1280'
                }
            }
        },
        resolutionH: {
            type: DataTypes.INTEGER(),
            field: 'resolution_h',
            validate: {
                min: {
                    args: [0],
                    msg: 'The minimum height of resolution is 0'
                },
                max: {
                    args: [1280],
                    msg: 'The maximum hegiht of resolution is 1280'
                }
            }
        },
        duration: DataTypes.BIGINT(11),
        fileSize: {
            type: DataTypes.FLOAT(11),
            field: 'file_size',
            validate: {
                isFloat: true,

            }
        },
        description: DataTypes.TEXT(),
        imgUrl: {
            type: DataTypes.STRING(110),
            field: 'img_url',
            // validate: {
            //     isUrl: {
            //         // custom message
            //         msg: 'img url Must be url'
            //     }
            // }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'movies',
        underscored: true,
        validate: {
            bothResolutionOrNull: function() {
                if((this.resolutionW === '') !== (this.resolutionH === '')) {
                    throw new Error('Require either both resolutionW and resolutionH or neither');
                }
            }
        },
        comment: "Movie Model"
    });
}