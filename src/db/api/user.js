const User = require("../models/user");
const { Op } = require("sequelize");
const Asset = require("../models/asset"); // 引入 Asset 模型
module.exports = {
    register: async (data) => {
        return User.create(data);
    },
    update: async (userId, newData) => {
        const [numAffectedRows] = await User.update(newData, {
            where: { id: userId }
        });

        if (numAffectedRows === 0) {
            return null;
        }
        const updatedUser = await User.findByPk(userId);
        return updatedUser;
    },
    findOne: async (data) => {
        return User.findOne({ where: { userName: data } });
    },
    findOneById: async (data) => {
        return User.findOne({ where: { id: data } });
    },
    getUserList: async ({ pageSize, offset }) => {
        console.log('pageInfo', pageSize, offset)
        return User.findAll({
            limit: pageSize,
            offset: offset,
            order: [['updatedAt', 'DESC']], // 按照更新时间倒序排列
        });
    },
    getTotal: async () => {
        const total = await User.count();
        return total
    },
    deleteUser: async (userId) => {
        // 使用 userId 查询要删除的用户
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            // 如果找不到对应 userId 的用户，返回错误信息
            return { success: false, message: 'User not found' };
        }
        // 执行删除操作
        // 执行删除操作，指定删除条件为用户的主键
        await User.destroy({ where: { id: userId } });


        // 返回成功信息
        return { success: true, message: 'User deleted successfully' };
    },
    getUserWithAssets: async (userId) => {
        try {
            // 在数据库中查找指定 ID 的用户记录，并同时查询关联的资产信息
            const user = await User.findOne({
                where: { id: userId },
                include: [{ model: Asset, as: 'assets' }],
            }).catch((err) => {
                console.log('Error:', err);
            });
            if (!user) {
                // 如果找不到指定 ID 的用户记录，返回错误信息
                return { success: false, message: 'User not found' };
            }

            // 返回用户信息及其关联的资产信息
            return { success: true, data: user };
        } catch (error) {
            // 返回错误信息
            return { success: false, message: error.message };
        }

    }

}