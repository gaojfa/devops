export default [
  {
    path: '/app/integration',
    name: 'AppIntegration',
    component: () => import('../views/app/AppIntegration.vue'),
    meta: {
      title: '集成管理'
    }
  },
  {
    path: '/app/release',
    name: 'AppRelease',
    component: () => import('../views/app/AppRelease.vue'),
    meta: {
      title: '发布管理'
    }
  },
  {
    path: '/app/task',
    name: 'AppTask',
    component: () => import('../views/app/AppTask.vue'),
    meta: {
      title: '任务管理'
    }
  },
  {
    path: '/app/life',
    name: 'AppLife',
    component: () => import('../views/app/AppLife.vue'),
    meta: {
      title: '生命周期'
    }
  }
]
