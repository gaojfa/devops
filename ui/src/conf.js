const conf = {
  // 编译时修改为/api
  apiBase: '/api', // api、demodata、offline，其中offline模式，需要先从easy-mock导出数据，把文件夹命名为offline，放在nginx的html目录下面
  routerMode: 'hash', // history或者hash
  homeRouter: '/dashboard',
  loginRouter: '/login',
  // sso单点登录
  sso: false,
  ssoServer: 'https://ssoserver',
  // customWebsite: true,wzq
  customWebsite: true, // false是默认的网站信息，true为接口请求的网站信息(logo等信息)
  offlineFunctions: ['monitor'],
  noticeKeep: 2,
  messageKeep: 3,
  notificationKeep: 5,
  aliveKeep: 30 * 60 * 60 // 0表示关闭该功能
}

function setCustomWebsite (value) { conf.customWebsite = value }

export default conf
export {
  setCustomWebsite
}
