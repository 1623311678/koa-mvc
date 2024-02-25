const Asset = require("../models/asset");
const User = require('../models/user'); // 导入用户模型
module.exports = {
    // 创建
    createAsset: async (data) => {
        const { name,
            type,
            contact,
            userId,name2 } = data
            // console.log('userId1111',userId)
        const assets = await Asset.create({
            name,
            type,
            contact,
            name2,
            creatorId:userId, // 关联当前用户
            // 其他资产属性...
        });
        return assets
    },
    //更新
    updateAsset: async (data) => {
        const { name,
            type,
            contact,
            id, } = data
        // 更新数据库中指定 ID 的资产记录
        const updatedAsset = await Asset.update(
            {
                name,
                type,
                contact,
                id
                // 其他需要更新的资产属性...
            },
            {
                where: { id },
            }
        );
        return updatedAsset

    },
    //个人资产详情
    findAssetsByUserId: async (userId) => {
        try {
            const assets = await Asset.findAll({ where: { creatorId:userId } });
            return assets;
        } catch (error) {
            console.error('Error finding assets:', error);
            throw error;
        }
    },
    //删除
    deleteAsset: async (id) => {
        // 删除数据库中指定 ID 的资产记录
        await Asset.destroy({
            where: { id },
        });
    },
    //每个资产详情
    getAssetDetail: async (id) => {
        // 在数据库中查找指定 ID 的资产记录
        const asset = await Asset.findByPk(id, {
            include: [{ model: User, as: 'creator' }], // 关联查询创建人信息
        });
        return asset
    },
    // 全部资产列表
    getAssetList: async (data) => {
        const { limit, offset } = data
        const res = await Asset.findAndCountAll({
            //attributes: ['id', 'name', 'type', 'createTime'], // 指定返回的属性
            include: [{ model: User, as: 'creator' }], // 使用正确的关联别名
            limit,
            offset, // 偏移量
        });
        // console.log('res1111',res)
        return res;
        // return res;
    }
}