
const sequenlizeConn = require('./dbConn.js');


sequenlizeConn.authenticate()
    .then(() => {
        console.log('数据库链接成功.');
        // 继续同步 asset 表
        sequenlizeConn.sync({alert:true}).then(()=>{
            console.log('表结构同步成功')
        }).catch(err => {
            console.error('表结构同步失败:', err);
        });;
        // 加载模型并设置关联关系
        // const { setUserAssociations } = require('./models/user');
        // setUserAssociations();
    }).catch(err => {
        console.error('数据库链接错误:', err);
    });