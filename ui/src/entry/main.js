// import Vue from 'vue'

// import ViewUI from 'view-design'
// import App from './App.vue'
// import 'view-design/dist/styles/iview.css'
// import logo from './assets/topic/logo.png'

// // Vue.use(Router)
// Vue.use(ViewUI)
// Vue.config.productionTip = false

// // 主题样式mazarine
// Vue.prototype.$colorTheme = 'skyblue'
// Vue.prototype.$logo = logo

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

import d from './init'
import router from '../router/index'
// import './conf'

d.run(router)
