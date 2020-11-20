export default {
  platformList: [
    {
      name: 'Dashboard',
      title: '系统概览',
      permission: '',
      showMenu: false,
      icon: 'ios-speedometer'
    },
    {
      name: 'EnvProject',
      title: '资源环境管理',
      permission: 'resource_p',
      showMenu: true,
      icon: 'ios-cloud'
    },
    {
      name: 'TemplateBlueprint',
      title: '应用蓝图管理',
      permission: 'business_p',
      icon: 'logo-codepen'
    },
    {
      name: 'Components',
      title: '组件管理',
      icon: 'md-pulse'
    },
    {
      name: 'App',
      title: '应用发布',
      icon: 'ios-partly-sunny'
    },
    {
      name: 'System',
      title: '系统配置',
      permission: 'system_p',
      icon: 'md-settings'
    }
  ]
}
