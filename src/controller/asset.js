const jwt = require('jsonwebtoken');
const assetModel = require("../db/api/asset");
const { secret } = require('../constant')

module.exports = {
    findAssetsByUserId: async (ctx, next) => {
        const userId = ctx.state.userId
        await assetModel.findAssetsByUserId(userId)
    },
    createAsset: async (ctx, next) => {
        // 从请求体中获取资产信息
        const { name, type, contact,name2 } = ctx.request.body;
        // 从上下文中获取当前用户的 userId
        const userId = ctx.state.userId;
        console.log('state-userId', userId)
        const newAsset = await assetModel.createAsset({
            name,
            name2,
            type,
            contact,
            userId, // 关联当前用户
            // 其他资产属性...
        })
        ctx.status = 200;
        ctx.body = { success: true, data: newAsset,code:200 };
    },
    updateAsset: async (ctx, next) => {
        const userId = ctx.state.userId;
        // 从请求体中获取资产信息
        const { id, name, type, contact } = ctx.request.body;
        const newAsset = await assetModel.updateAsset({
            name,
            type,
            contact,
            id, // 关联当前用户
            // 其他资产属性...
        })
        ctx.status = 200; // HTTP 状态码 201 表示创建成功
        ctx.body = { success: true, data: newAsset };
    },
    deleteAsset: async (ctx) => {
        const { id, } = ctx.request.body;
        await assetModel.deleteAsset(id)
        ctx.body = { success: true, message: 'Asset deleted successfully' };
    },
    getAssetDetail:async(ctx)=>{
        const { id, } = ctx.request.body;
        const detail = await assetModel.getAssetDetail(id)
        ctx.body = detail
    },
    getAssetList:async(ctx)=>{
           // 从查询参数中获取分页参数
    const { page = 1, pageSize = 10 } = ctx.query;
    // 计算偏移量
    const offset = (page - 1) * pageSize;
    // 查询数据库，获取当前页的资产列表和总记录数
    const { rows: assets, count: total } = await assetModel.getAssetList({
        limit: pageSize, // 每页记录数量
      offset, // 偏移量
    })
    ctx.status = 200;
    ctx.body =  {
         data:{list:assets,total},code:200
    }
    }
}