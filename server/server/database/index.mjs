
import { sequelize } from './init.mjs';
export * from '../models/index.mjs';

export { sequelize };

export const sync = () => {
    if (process.env.NODE_ENV !== 'production') {
        /**
         * sequelize.sync()                 // sync all models that aren't already in the database
         * sequelize.sync({force: true})    // Force sync all models
         */
        return sequelize.sync({ force: true })
            .then(() => {
                console.log('sync complete');
                process.exit(1);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        throw new Errow('Can not sync when NODE_ENV is set to \'production\'.');
    }
};

export const drop = () => {
    if (process.env.NODE_ENV !== 'production') {
        return sequelize.drop()
            .then(() => {
                console.log('drop complete');
                process.exit(1);
            })
            .catch((err) => {
                console.log(err.message || err);
            })
    } else {
        throw new Error('Can not drop when NODE_ENV is set to \'production\'.');
    }
};


try {
    await sequelize.sync({
        // 每次初始化表是否删除原表
        force: false,
        // 检查数据库中表的当前状态,进行必要的更改使其与模型匹配
        alter: true
    });
    console.log('Sync database successfully.');
} catch (error) {
    console.error('Sync database failed:', error);
}