// import '../components/scripts/shim'

// import meta from 'vue-meta'
import Vue from 'vue'
// import $ from 'jquery'
// import bootstrap from 'bootstrap'
// import ECharts from 'vue-echarts'
// import i18n from '../i18n'
// import store from '../store'
import ViewUI from 'view-design'
import $axios from '../api/$axios'
import iviewx from '../components/iviewx'

import App from '../App.vue'
import 'view-design/dist/styles/iview.css'
import logo from '../assets/topic/logo.png'

// import fontawesome from '../components/fontawesome'
// import iviewx from '../components/iviewx'
// import gview from '../components/gview'
// import inside from '../components/inside'
// import valid from '../components/scripts/valid'

// import tool from '../components/scripts/util/tool'

// import checkbox from '../components/scripts/util/checkbox'
// import confirm from '../components/scripts/util/confirm'
// import detail from '../components/scripts/util/detail'
// import modal from '../components/scripts/util/modal'
// import select from '../components/scripts/util/select'
// import table from '../components/scripts/util/table'

import FrameBody from '../components/common/core/FrameBody.vue'

// import conf from '../conf'
// import refArray from '../components/scripts/directive/refArray'
// import notDisplay from '../components/scripts/directive/notDisplay'
// import appendIcon from '../components/scripts/directive/appendIcon'

// import favicon from '../assets/default/favicon.ico'
// import logo from '../assets/default/topic/logo.png'
// import topicBgImg from '../assets/default/topic/top-bg-skyblue.jpg'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../node_modules/bootstrap/dist/js/bootstrap.min'


// const isXadmin = process.env.VUE_APP_NAME === 'xadmin'
// const isPortal = process.env.VUE_APP_NAME === 'portal';
// 主题样式mazarine
Vue.prototype.$colorTheme = 'white'
Vue.prototype.$logo = logo
// (() => {
//   // 主题样式mazarine
//   Vue.prototype.$colorTheme = 'skyblue'
//   Vue.prototype.$topicMultiNavLayout = 'horizon'
//   Vue.prototype.$favicon = favicon
//   Vue.prototype.$logo = logo
//   Vue.prototype.$topicBgImg = topicBgImg
//   // Vue.prototype.$ = $
//   // Vue.prototype.bootstrap = bootstrap

//   Vue.prototype.$website = {
//     name: '多云管理平台',
//     title: (isXadmin ? '运维门户' : '运营门户') + '_G-CloudX_多云管理平台_云操作系统_国云科技',
//     meta: {
//       keywords: '多云管理平台,国云,G-Cloud,云操作系统,多云管理系统,G-Cloud,G-Cloud X,G-Cloud MCMP,国云科技,云操作系统,云平台',
//       description: 'G-Cloud X（Multi-Clouds Management Platform）多云管理平台是国云科技自主研发，帮助企业构建多云平台环境，实现多个公有云、私有云资源管理的平台产品。G-Cloud X 可以让企业选用不同云供应商，构建按需交付的多云服务体系。企业可以通过G-Cloud X实现多个云平台资源统一管理、IT资源自助服务管理，跨云资源互通、多云应用负载扩充、跨云数据备份、应用灾难恢复等复杂业务需求，提高IT工作效率和资源使用率，构建弹性多云计算平台，保障业务系统的持续稳定运行。'
//     },
//     icp: '国云科技股份有限公司©2010-2018 粤ICP备10232873号-3 增值电信许可证: 粤B2-20100556'
//   }

//   Vue.prototype.$tplName = process.env.VUE_APP_TPL
//   Vue.prototype.$appName = process.env.VUE_APP_NAME
//   Vue.prototype.$isXadmin = isXadmin
//   Vue.prototype.$isPortal = isPortal

//   Vue.prototype.$conf = conf
// })()

let _router
let _isinitconfed = false
let _isinitcomped = false


function load (type, callback) {
  import('../' + type + '/' + process.env.VUE_APP_TPL + '/' + process.env.VUE_APP_NAME).then((d) => {
    if (typeof callback === 'function') {
      callback(d)
    } else if (callback === true) {
      if (d.default) {
        Vue.prototype['$' + type] = d.default
      } else {
        Vue.prototype['$' + type] = d
      }
    }
  })
}

function loadRouter (callback) {
  console.log(process.env.VUE_APP_TPL)
  console.log(process.env.VUE_APP_NAME)
  import('../router/' + process.env.VUE_APP_TPL + '/' + process.env.VUE_APP_NAME).then((router) => {
    if (callback) {
      callback(router)
    }
  })
}

function loadMenu (menus) {
  if (menus) {
    Vue.prototype.$menus = menus
  } else if (process.env.VUE_APP_MENUS) {
    Vue.prototype.$menus = process.env.VUE_APP_MENUS
  } else {
    import('../menu/LeftMenus').then(
      (m) => {
        if (m.default) {
          Vue.prototype.$menus = m.default
        } else {
          Vue.prototype.$menus = m
        }
      }
    )
  }
}

// function loadStatic (data) {
//   if (data) {
//     Vue.prototype.$static = data
//   } else if (process.env.VUE_APP_STSTIC) {
//     Vue.prototype.$static = process.env.VUE_APP_STSTIC
//   } else {
//     import('../static/' + process.env.VUE_APP_TPL + '/' + process.env.VUE_APP_NAME).then(
//       (m) => {
//         if (m.default) {
//           Vue.prototype.$static = m.default
//         } else {
//           Vue.prototype.$static = m
//         }
//       }
//     )
//   }
// }

// function checkFunction (functionKey) {
//   return (store.state.myself.functions).indexOf(functionKey) > -1
// }
// function filterMenuFunction (menus) {
//   const newmenus = []
//   for (let i = 0; i < menus.length; i++) {
//     const menu = { ...menus[i] }
//     const pm = menu.permission
//     if (!pm || checkFunction(pm)) {
//       if (menu.children && menu.children.length > 0) {
//         menu.children = filterMenuFunction(menu.children)
//       }
//       if (!(menu.children !== undefined && menu.children.length === 0)) {
//         newmenus.push(menu)
//       }
//     }
//   }
//   return newmenus
// }

function initComp () {
//   Vue.use(meta)
//   Vue.use(fontawesome)
//   Vue.use(iviewx)
//   Vue.use(gview)
//   Vue.use(inside)
//   Vue.use(valid)
  Vue.use(ViewUI)
  Vue.use(iviewx)
  Vue.component(FrameBody.name, FrameBody)
  //   Vue.component('chart', ECharts)
  // Vue.use($)
  // Vue.use(bootstrap)

  //   const toolInstance = tool.newInstance(router, i18n, Vue.prototype)
  //   Vue.prototype.$util = {
  //     tool: toolInstance,
  //     checkbox: checkbox.newInstance(toolInstance),
  //     confirm: confirm.newInstance(toolInstance),
  //     detail: detail.newInstance(toolInstance),
  //     modal: modal.newInstance(toolInstance),
  //     select: select.newInstance(toolInstance),
  //     table: table.newInstance(toolInstance)
  //   }

  //   Vue.prototype.$checkPlatform = (...platforms) => platforms.indexOf(store.state.app.platformType) > -1
  //   Vue.prototype.$checkMergedFunctions = functions => (store.state.myself.mergedFunctions).indexOf(functions) > -1
  //   Vue.prototype.$checkFunction = functionKey => checkFunction(functionKey)
  //   Vue.prototype.$filterMenuFunction = menus => filterMenuFunction(menus)
  // Vue.prototype.$checkFunction = functionKey => (store.state.myself.functions).indexOf(functionKey) > -1
  // Vue.prototype.$filterMenuFunction = (menus) => {
  //   const newmenus = []
  //   for (let i = 0; i < menus.length; i++) {
  //     const menu = { ...menus[i] }
  //     const pm = menu.permission
  //     if (!pm || this.$checkFunction(pm)) {
  //       if (menu.children && menu.children.length > 0) {
  //         menu.children = this.$filterMenuFunction(menu.children)
  //       }
  //       newmenus.push(menu)
  //     }
  //   }
  //   return newmenus
  // }

  _isinitcomped = true
}

function initConf (menus, staticdata, options = {}) {
  console.log(menus)
  console.log(staticdata)
  console.log(options)
  if (options) {
    // Vue.prototype.$options = options
    // for (const key in options) {
    //  Vue.prototype[key] = options[key]
    // }
    for (const [key, value] of Object.entries(options)) {
      Vue.prototype[key] = value
    }
  }

  loadMenu(menus)
  // loadStatic(staticdata)

  // /**
  //  * 获取静态资源服务器中的properties文件
  //  * 配置变量
  //  */
  // import(process.env.BASE_URL + 'properties.json').then(
  //   (properties) => {
  //     console.log(properties)
  //     Vue.prototype.$properties = properties
  //     if (typeof properties.closeUnfinished === 'boolean') {
  //       Vue.prototype.$closeUnfinished = properties.closeUnfinished
  //     }
  //   }
  // )

  /**
   * 获取静态资源服务器中的properties文件
   * 配置变量
   */
  $axios({ method: 'get', baseURL: process.env.BASE_URL, url: 'properties.json' })
    .then((rsp) => {
      if (rsp.status === 200) {
        const properties = rsp.data
        Vue.prototype.$properties = properties
        if (typeof properties.closeUnfinished === 'boolean') {
          Vue.prototype.$closeUnfinished = properties.closeUnfinished
        }
      }
    })

  _isinitconfed = true
}

function newInstance (router) {
  // 引入directives
//   Vue.directive('ref-array', refArray)
//   Vue.directive('not-display', notDisplay)
//   Vue.directive('append-icon', appendIcon)

  return new Vue({
    // i18n,
    router,
    // store,
    render: h => h(App)
  }).$mount('#app')
}

function init (router, menus, staticdata, options = {}) {
  Vue.config.productionTip = false
  _router = router
  if (menus || options || !_isinitconfed) {
    initConf(menus, staticdata, options)
  }
  if (!_isinitcomped) {
    initComp(router)
  }
}

function run (router, menus, staticdata) {
  console.log(router)
  console.log(menus)
  console.log(staticdata)
  if (!router && _router) {
    router = _router
  } else {
    if (!router) {
      loadRouter(r => run(r, menus))
      return
    }
    init(router, menus, staticdata)
  }
  newInstance(router)
}

export { Vue, init, run, load }
export default { Vue, init, run }
