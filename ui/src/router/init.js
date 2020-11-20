import Vue from 'vue'
// import iView from 'iview'
// import iView from 'view-design'
// import 'view-design/dist/styles/iview.css'
import Router from 'vue-router'
import conf from '../conf'
// import myself from '../store/modules/myself'
// import regionApi from '../api/region/regionApi'
// import userApi from '../api/user/userApi'
// import backupsApi from '../api/backups/backupsApi'
// import $axios from '../api/$axios'

/**
 * 修改VueRouter的push方法，避免同一导航重复点击报错
 */
// const originRoutePush = Router.prototype.push
// eslint-disable-next-line
// Router.prototype.push = function (location) {
//   return originRoutePush.call(this, location).catch(err => err)
// }
/**
 * 根据传入的functions判断
 * 是否有权限前往的目标路由
 * @param matchPaths 符合条件的路由
 * @param functions 权限判断依据
 * @returns {boolean}
 */
// function judgeFunction (matchPaths, functions) {
//   const requiredFuns = matchPaths
//     .filter(route => route.props.default && route.props.default.permission)
//     .map(route => route.props.default.permission)
//   let fullAuthorized = true
//   if (requiredFuns.filter(fun => functions.indexOf(fun) === -1).length > 0)fullAuthorized = false
//   return fullAuthorized
// }

/**
 * 获取路由同级深度下的错误页面路由地址
 * 以此保证页面不会发生全屏跳转，仅局局部跳转
 * @param matchedRouters 即将进入目标路由对象数组，顶级树index=0
 * @param errorPage 错误页面路径名path
 * @returns {string} 正确的错误页面path
 */
// function routerErrorPagePath (matchedRouters, errorPage) {
//   const matchedRouter = matchedRouters[matchedRouters.length - 1]
//   return matchedRouter.path.substr(0, matchedRouter.path.lastIndexOf('/')) + '/' + errorPage
// }

// export { judgeFunction, routerErrorPagePath }
export default {
  newInstance (routes) {
    Vue.use(Router)

    const router = new Router({
      mode: conf.routerMode,
      base: process.env.BASE_URL,
      routes
    })
    console.log(router)

    // router.beforeEach((to, from, next) => {
    // hash模式下，直接在项目路径上添加token，如: http://云管地址?token=123时，地址会变成http://云管地址/?token=123#/，导致无法获取token
    // 这里用正则匹配url，如果存在/?token=123#/时，修复url后重新跳转
    //   const matchData = window.location.href.match(/\/\?token=[a-zA-Z0-9-_.]*#\//ig)
    //   if (matchData && matchData.length) {
    //     const newUrl = window.location.href.replace(/\/\?token=[a-zA-Z0-9-_.]*#\//ig, '/#/')
    //     if (newUrl.indexOf('?') > -1) {
    //       window.location.href = newUrl + '&' + matchData[0].substring(2, matchData[0].length - 2)
    //     } else {
    //       window.location.href = newUrl + '?' + matchData[0].substring(2, matchData[0].length - 2)
    //     }
    //   }
    // 1、path不存在时，name会变为路由配置的404地址名称PageNotFound
    // 2、name不存在时，matched会长度为0
    //   if (!to.matched || to.matched.length <= 0) {
    //     next({ name: 'PageNotFound' })
    //   }
    //   if (to.meta && to.meta.skipLoginCheck) {
    //     next()
    //   } else if (to.query && to.query.token && to.name !== 'SsoLogin') { // 如果不是SsoLogin的任意云管页面带上了token，判断是否登录，未登录则跳转到SsoLogin
    //     // userApi.myInfo().then((userRes) => {
    //     //   if (userRes.status !== 200 || (userRes.data.data && userRes.data.data.errorCode)) {
    //     //     next({
    //     //       name: 'SsoLogin',
    //     //       query: {
    //     //         token: to.query.token,
    //     //         url: encodeURIComponent(window.location.href.split('?')[0]),
    //     //         cmp: true
    //     //       },
    //     //       meta: { skipLoginCheck: true }
    //     //     })
    //     //   } else {
    //     //     iView.LoadingBar.start()
    //     //     next()
    //     //   }
    //     // })
    //   }
    // else if (!myself.state.userId && to.name !== 'Login') { // 当前store未存有用户信息，请求一遍获取用户信息
    // regionApi.list().then((regionRes) => { // 获取默认的platformType
    //   if (regionRes.status === 500) {
    //     next({ name: 'Login' })
    //   } else if (regionRes.status === 200) {
    //     if (regionRes.data.success !== undefined && regionRes.data.success === false) {
    //       if (regionRes.data.data && regionRes.data.data.errorCode && regionRes.data.data.errorCode.indexOf('TOKEN-') === 0) {
    //         // 用户未认证，配置单点登录后带上当前url返回单点登录页面
    //         let properties = null
    //         if (!Vue.prototype || Vue.prototype.$properties) {
    //           $axios({
    //             method: 'get',
    //             baseURL: router.options.base,
    //             url: 'properties.json'
    //           })
    //             .then((rsp) => {
    //               if (rsp.status === 200) {
    //                 properties = rsp.data
    //               }
    //               if (properties.sso && properties.loginServer) {
    //                 const backUrl = window.location.href.replace(/[\\?]?token=[a-zA-Z0-9-_.]*[&]*/ig, '')
    //                 window.location.href = properties.loginServer + '/?url=' + encodeURIComponent(backUrl)
    //               } else {
    //                 next({ name: 'Login' })
    //               }
    //             }).catch(() => {
    //               next({ name: 'Login' })
    //             })
    //         } else {
    //           properties = Vue.prototype.$properties
    //           if (properties.sso && properties.loginServer) {
    //             const backUrl = window.location.href.replace(/[\\?]?token=[a-zA-Z0-9-_.]*[&]*/ig, '')
    //             window.location.href = properties.loginServer + '/?url=' + encodeURIComponent(backUrl)
    //           } else {
    //             next({ name: 'Login' })
    //           }
    //         }
    //       }
    //     }

    //     userApi.userPermission().then((permissionRes) => {
    //       if (!judgeFunction(to.matched, permissionRes.data.data.functions)) {
    //         next({
    //           path: routerErrorPagePath(to.matched, 'pageUnauthorized'),
    //           query: { destPath: to.matched.pop().path }
    //         })
    //       } else {
    //         iView.LoadingBar.start()
    //         next()
    //       }
    //     })
    //   }
    // })
    //   }
    //   else if (!judgeFunction(to.matched, myself.state.functions)) {
    //     next({
    //       path: routerErrorPagePath(to.matched, 'pageUnauthorized'),
    //       query: { destPath: to.matched.pop().path }
    //     })
    //   } else {
    //     iView.LoadingBar.start()
    //     next()
    //   }
    // })

    // router.afterEach(() => {
    //   const fb = window.document.body.getElementsByClassName('frame-bottom')
    //   if (fb && fb.length > 0) {
    //     fb[0].scrollTop = 0
    //   }
    //   // iView.LoadingBar.finish()
    // })

    return router
  }
}
