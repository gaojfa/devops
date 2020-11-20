import init from './init'
import appendErrorPage from './routersFilterFuns'
import env from './env'
import template from './template'
import app from './app'
import system from './system'

export default init.newInstance([
  {
    path: '/',
    name: 'Cloudui',
    redirect: '/cloudui'
  },
  //   {
  //     path: '/login',
  //     name: 'Login',
  //     component: () => import('../../views/cetc/Login.vue')
  //   },
  {
    path: '/cloudui',
    name: 'Console',
    component: () => import('../views/Console.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/env',
        name: 'Env',
        component: () => import('../views/env/Env.vue'),
        redirect: env[0].path,
        children: appendErrorPage(env)
      },
      {
        path: '/template',
        name: 'Template',
        component: () => import('../views/template/Template.vue'),
        redirect: template[0].path,
        children: appendErrorPage(template)
      },
      {
        path: '/components',
        name: 'Components',
        component: () => import('../views/Components.vue')
      },
      {
        path: '/app',
        name: 'App',
        component: () => import('../views/app/App.vue'),
        redirect: app[0].path,
        children: appendErrorPage(app)
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('../views/system/System.vue'),
        redirect: system[0].path,
        children: appendErrorPage(system)
      }
    ]
  }
//   {
//     path: '/mapfullscreen',
//     name: 'MapFullScreen',
//     component: () => import('../../views/default/xadmin/MapFullScreen.vue')
//   },
//   {
//     path: '/pageunauthorized',
//     name: 'PageUnauthorized',
//     component: () => import('../../views/default/PageUnauthorized.vue')
//   },
//   {
//     path: '/*',
//     name: 'PageNotFound',
//     component: () => import('../../views/default/PageNotFound.vue')
//   }
])
