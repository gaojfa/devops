export default [
  {
    path: '/template/blueprint',
    name: 'TemplateBlueprint',
    component: () => import('../views/template/TemplateBlueprint.vue'),
    meta: {
      title: '蓝图管理'
    }
  },
  {
    path: '/template/ins',
    name: 'TemplateIns',
    component: () => import('../views/template/TemplateIns.vue'),
    meta: {
      title: '蓝图实例'
    }
  },
  {
    path: '/template/app',
    name: 'TemplateApp',
    component: () => import('../views/template/TemplateApp.vue'),
    meta: {
      title: '应用管理'
    }
  }
]
