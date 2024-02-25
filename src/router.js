const router = require('koa-router')()
const HomeController = require('./controller/home')
const AssetController = require('./controller/asset')

const UserController = require('./controller/user')

module.exports = (app) => {
  router.get('/', HomeController.index)
  /* 用户注册、登陆、验证
   * 从这里开始才是真代码
   * 
   */
  // 注册
  router.post('/api/user/register', UserController.register)
  // 登陆
  router.post('/api/user/login', UserController.login),
  // 用户列表
  router.post('/api/user/list', UserController.getUserList),
  // 添加用户
  router.post('/api/user/add', UserController.addUser),
   // 更新用户
   router.post('/api/user/update', UserController.updateUser),
   // 删除用户
   router.post('/api/user/delete', UserController.deleteUser),
  // 获取用户详细信息，包含资产
  router.post('/api/user/detail-and-assets',UserController.getUserWithAssets)

  /* 资产配置模块 */
  // 创建资产
  router.post('/api/asset/create',AssetController.createAsset)
  //资产列表
  router.post('/api/asset/list',AssetController.getAssetList)

    app.use(router.routes())
      .use(router.allowedMethods())
}
