export default [
  {
    path: '/env/project',
    name: 'EnvProject',
    component: () => import('../views/env/EnvProject.vue'),
    meta: {
      title: '项目管理'
    }
  },
  {
    path: '/env/statistics',
    name: 'EnvStatistics',
    component: () => import('../views/env/EnvStatistics.vue'),
    meta: {
      title: '仪表盘'
    }
  },
  {
    path: '/env/code',
    name: 'EnvCode',
    component: () => import('../views/env/EnvCode.vue'),
    meta: {
      title: '代码管理'
    }
  },
  {
    path: '/env/privateService',
    name: 'EnvPrivateService',
    component: () => import('../views/env/EnvPrivateService.vue'),
    meta: {
      title: '私服管理'
    }
  }
]
