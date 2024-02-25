/**
 * api地址管理
 */
const domain = ""
const apiMap = {
  login: `${domain}/user/login`,
  register: `${domain}/user/register`,
  getInfo: `${domain}/user/getInfo`,
  getUserList: `${domain}/user/list`,
  addUser: `${domain}/user/add`,
  updateUser: `${domain}/user/update`,
  getUserDetail: `${domain}/user/detail-and-assets`,
  deleteUser: `${domain}/user/delete`,
  createAsset: `${domain}/asset/create`,
  getAssetList: `${domain}/asset/list`
}
export default apiMap
