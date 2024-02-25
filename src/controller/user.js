const jwt = require('jsonwebtoken');
const userModel = require("../db/api/user");
const { secret } = require('../constant')

module.exports = {
    login: async (ctx, next) => {
        const { userName, password } = ctx.request.body;
        // 查找用户
        const user = await userModel.findOne(userName);
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: '用户名不存在', code: 401, };
            return;
        }
        // 验证密码
        if (user.password !== password) {
            ctx.status = 401;
            ctx.body = { message: '密码不正确', code: 401, };
            return;
        }
        // 生成 JWT
        const token = jwt.sign({ userId: user.id }, secret);
        ctx.body = { message: '登录成功', code: 200, data: { userName: user.userName, phoneNumber: user.phoneNumber, token, } };

    },
    register: async (ctx, next) => {
        // ctx.status = 200;
        const { userName, password, phoneNumber } = ctx.request.body;
        const user = await userModel.register({
            userName, password, phoneNumber: phoneNumber
        })
        // 生成 JWT
        const token = jwt.sign({ userId: user.id }, secret);
        ctx.status = 200;
        ctx.body = {
            message: 'register successful', code: 200,
            data: {
                userName: user.userName, phoneNumber: user.phoneNumber, token,
            }
        };
    },
    addUser: async (ctx, next) => {
        const { userName, password, phoneNumber } = ctx.request.body;
        const user = await userModel.register({
            userName, password, phoneNumber: phoneNumber
        })
        ctx.status = 200;
        ctx.body = {
            message: 'register successful', code: 200,
            data: {
                userName: user.userName, phoneNumber: user.phoneNumber,
            }
        };
    },
    updateUser: async (ctx, next) => {
        const { userId, userName, password, phoneNumber } = ctx.request.body;
        
        // 检查是否提供了必要的参数
        if (!userId || !userName || !password || !phoneNumber) {
            ctx.status = 400; // Bad Request
            ctx.body = { message: 'Missing required parameters', code: 400 };
            return;
        }
    
        // 更新用户信息
        const updatedUser = await userModel.update( userId,{
            userName, // 更新后的用户名
            password, // 更新后的密码
            phoneNumber, // 更新后的手机号
        });
       
        // 如果用户不存在，返回错误信息
        if (!updatedUser) {
            ctx.status = 404; // Not Found
            ctx.body = { message: 'User not found', code: 404 };
            return;
        }
    
        // 返回更新成功的信息
        ctx.status = 200;
        ctx.body = {
            message: 'User updated successfully', code: 200,
            data: {
                userName: updatedUser.userName, 
                password:updatedUser.password,
                phoneNumber: updatedUser.phoneNumber,
            }
        };
    },
    
    getUserList: async (ctx, next) => {
        const body = ctx.request.body;
        const page = parseInt(body.pageNumber) || 1; // 当前页数，默认为第一页
        const pageSize = parseInt(body.pageSize) || 10; // 每页显示的数量，默认为 10
        const offset = (page - 1) * pageSize;
        let list = []
        list = await userModel.getUserList({
            pageSize, offset
        })
        const total = await userModel.getTotal()
        ctx.body = {
            message: '查询成功', code: 200,
            data: {
                list,
                total
            }
        };
    },
    deleteUser: async (ctx, next) => {
        const { userId } = ctx.request.body
        res = userModel.deleteUser(userId)
        ctx.body = {
            message: '删除成功', code: 200,
            data: res
        };
    },
    getUserWithAssets: async (ctx, next) => {
        const id = ctx.request.body.userId //body有从body获取
        let userId = ctx.state.userId
        if (id) {
            userId = id
        }
        const res = await userModel.getUserWithAssets(userId)
        // console.log('res',res)
        if (res.success) {
            ctx.body = {
                message: '查询成功', code: 200,
                data: {
                    ...res.data.dataValues,
                    assets:res.data.assets
                }
            };
        } else {
            ctx.body = {
                message: '查询成功', code: 200,
                data: null
            };
        }
    }
}