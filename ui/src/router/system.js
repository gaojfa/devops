export default [
  {
    path: '/system/limit/user',
    name: 'SystemLimitUser',
    component: () => import('../views/system/limit/SystemLimitUser.vue'),
    meta: {
      title: '权限管理'
    }
  },
  {
    path: '/system/limit/user',
    name: 'SystemLimitUser',
    component: () => import('../views/system/limit/SystemLimitUser.vue'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/system/limit/Roles',
    name: 'SystemLimitRoles',
    component: () => import('../views/system/limit/SystemLimitRoles.vue'),
    meta: {
      title: '角色管理'
    }
  },
  {
    path: '/system/limit/menus',
    name: 'SystemLimitMenus',
    component: () => import('../views/system/limit/SystemLimitMenus.vue'),
    meta: {
      title: '菜单管理'
    }
  },
  {
    path: '/system/plugin',
    name: 'SystemPlugin',
    component: () => import('../views/system/SystemPlugin.vue'),
    meta: {
      title: '操作管理'
    }
  },
  {
    path: '/system/package',
    name: 'SystemPackage',
    component: () => import('../views/system/SystemPackage.vue'),
    meta: {
      title: '工件管理'
    }
  },
  {
    path: '/system/script',
    name: 'SystemScript',
    component: () => import('../views/system/SystemScript.vue'),
    meta: {
      title: '脚本管理'
    }
  },
  {
    path: '/system/label',
    name: 'SystemLabel',
    component: () => import('../views/system/SystemLabel.vue'),
    meta: {
      title: '标签管理'
    }
  },
  {
    path: '/system/custom',
    name: 'SystemCustom',
    component: () => import('../views/system/SystemCustom.vue'),
    meta: {
      title: '定制管理'
    }
  },
  {
    path: '/system/quartz',
    name: 'SystemQuartz',
    component: () => import('../views/system/SystemQuartz.vue'),
    meta: {
      title: '定时任务'
    }
  },
  {
    path: '/system/operational',
    name: 'SystemOperational',
    component: () => import('../views/system/SystemOperational.vue'),
    meta: {
      title: '操作审计'
    }
  },
  {
    path: '/system/software',
    name: 'SystemSoftware',
    component: () => import('../views/system/SystemSoftware.vue'),
    meta: {
      title: '软件仓库'
    }
  },
  {
    path: '/system/image',
    name: 'SystemImage',
    component: () => import('../views/system/SystemImage.vue'),
    meta: {
      title: '镜像仓库'
    }
  }
]
