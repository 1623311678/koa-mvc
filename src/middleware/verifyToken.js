
const jwt = require('jsonwebtoken');
const { secret } = require('../constant')
const userModel = require("../db/api/user");
// Token 验证中间件
const verifyToken = async (ctx, next) => {
    // 排除不需要 Token 验证的路由
    if (ctx.url === '/api/user/login' || ctx.url === '/api/user/register' || ctx.url === '/api/user/add') {
        await next(); // 继续处理请求
        return;
    }
    const token = ctx.headers.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { message: '未提供 Token', code: 401 };
        return;
    }

    try {
        const decoded = jwt.verify(token, secret);
        console.log('decode', decoded)
        // 查找用户
        const user = await userModel.findOneById(decoded.userId);
        // console.log('user111',user)
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: '用户不存在', code: 401 };
            return;
        }
        ctx.state.userId = decoded.userId; // 将解码后的用户 ID 存储到 ctx.state 中
        ctx.state.userName = user.userName;
        await next(); // 继续处理请求
    } catch (error) {
        ctx.status = 401;
        ctx.body = { message: '无效的 Token', code: 401 };
    }
};
module.exports = () => verifyToken