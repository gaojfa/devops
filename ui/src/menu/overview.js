export default [
  {
    title: '弹性计算',
    icon: 'sliders-h',
    children: [
      { title: '云服务器', icon: 'desktop', name: 'ConsoleInstance' },
      { title: '镜像服务', icon: 'dot-circle', name: 'ConsoleImage' },
      { title: '弹性伸缩', icon: '', name: 'ConsoleAutoscale' },
      { title: '安全组', icon: 'shield-alt', name: 'ConsoleSecurityGroup' },
      { title: '集群', icon: 'th', name: 'ConsoleCluster' }
    ]
  },
  {
    title: 'DevOps',
    icon: 'object-group',
    platformUrl: 'devopsUrl',
    children: [
      { title: '项目管理', icon: 'box-open', url: '/cloudui/#/orchestration/env_manage' },
      { title: '代码管理', icon: 'box-open', url: '/cloudui/#/orchestration/git_data_source' },
      { title: '私服管理', icon: 'box-open', url: '/cloudui/#/orchestration/private_service_source' },
      { title: '蓝图管理', icon: 'box-open', url: '/cloudui/#/orchestration/blueprint_manage' },
      { title: '实例管理', icon: 'file-invoice', url: '/cloudui/#/orchestration/blueprint_ins_manage' },
      { title: '应用管理', icon: 'box-open', url: '/cloudui/#/orchestration/application_list' },
      { title: '组件管理', icon: 'cube', url: '/cloudui/#/orchestration/component_manage' },
      // { name: 'ConsoleOrchestrationOperational', icon: 'box-open', title: '操作审计' },
      { title: '集成管理', icon: 'box-open', url: '/cloudui/#/orchestration/release_integration_manage' },
      { title: '定时任务', icon: 'box-open', url: '/cloudui/#/orchestration/quartz' },
      { title: '软件仓库', icon: 'box-open', url: '/cloudui/#/orchestration/software_repository/mine' },
      { title: '镜像仓库', icon: 'box-open', url: '/cloudui/#/orchestration/mirror_repository_list' }
    ]
  },
  {
    title: '分布式存储',
    icon: 'database',
    platformUrl: 'storageUrl',
    children: [
      { title: '集群管理', icon: 'hdd', url: '/storage/#/cluster/nodes' },
      { title: '块存储管理', icon: 'cubes', url: '/storage/#/cluster/rbds' },
      { title: '文件存储管理', icon: 'square', url: '/storage/#/filesystems' },
      { title: '对象存储管理', icon: 'square', url: '/storage/#/cluster/rgw/users' }
    ]
  },
  {
    title: '安全(SAAS)',
    icon: 'cloud',
    children: [
      { title: '平台首页', icon: 'users-cog' },
      { title: '用户管理', icon: 'users-cog' },
      { title: '角色管理', icon: 'user-tag' },
      { title: '应用管理', icon: 'users-cog' },
      { title: '文件管理', icon: 'users-cog' },
      { title: '桌面管理', icon: 'users-cog' },
      // { title: '云盒管理', icon: 'users-cog' },
      { title: '消息中心', icon: 'comment-alt' },
      { title: '日志管理', icon: 'list-alt' }
      // { name: '', title: '监控审计', icon: 'users-cog' },
      // { name: '', title: '组织管理', icon: 'users-cog' }
    ]
  },
  {
    title: '网络',
    icon: 'globe',
    children: [
      { title: '网络拓扑', icon: 'sitemap', name: 'ConsoleNetTopo' },
      { title: '外部网络', icon: 'share-alt', name: 'ConsoleExtranet' },
      { title: '虚拟机私有云(VPC)', icon: 'layer-group', name: 'ConsoleNetwork' },
      { title: '虚拟网卡', icon: 'calendar-minus', name: 'ConsoleNetcard' },
      { title: '弹性IP', icon: 'podcast', name: 'ConsoleFloatingIp' },
      { title: '弹性负载均衡', icon: 'random', name: 'ConsoleSlb' },
      { title: '虚拟专用网络(VPN)', icon: 'newspaper' },
      { title: '防火墙', icon: 'fire', name: 'ConsoleVfw' }
    ]
  },
  {
    title: '云监控',
    platformUrl: 'cloudMonitorUrl',
    children: [
      { title: '监控总览', icon: 'eye', url: '/portal/login/toIndex.do' },
      { title: '资源管理', icon: 'eye', url: '/portal/login/toResManage' },
      { title: '告警管理', icon: 'eye', url: '/portal/login/toWarningManage' },
      { title: '拓扑', icon: 'align-left', url: '/portal/login/toTopo' },
      { title: '巡检', icon: 'address-book', url: '/portal/login/toInspection' },
      { title: '报表', icon: 'bell', url: '/portal/login/toReport' },
      { title: '系统管理', icon: 'server', url: '/portal/login/toComponment' }
    ]
  },
  {
    title: '物理硬件',
    children: [
      { name: 'MonitorHomePage', title: '物理机管理', icon: 'eye' }
    ]
  },
  {
    title: 'AIOps',
    children: [
      { name: 'ConsoleAiopsAbnormal', title: '异常点检测', icon: 'eye' }
    ]
  },
  {
    title: '容器云',
    icon: 'globe',
    platformUrl: 'ContainerCloudUrl',
    children: [
      { title: '全局', icon: 'sitemap', url: '/g/screen-page' },
      { title: '集群', icon: 'sitemap', url: '/g/clusters' },
      { title: '多集群应用', icon: 'share-alt', url: '/g/apps' },
      { title: '镜像仓库', icon: 'layer-group', url: '/custom-extension/image-repo/admin-config' },
      { title: '用户', icon: 'calendar-minus', url: '/g/accounts' },
      { title: '工具', icon: 'random', url: '/g/catalog' }
    ]
  },
  {
    title: '融合集成服务网关',
    icon: 'globe',
    platformUrl: 'gatewayUrl',
    children: [
      { title: 'API集成', icon: 'sitemap', url: '/klink/dkylogin' },
      { title: '流量限流', icon: 'share-alt', url: '/klink/dkylogin' },
      { title: '运维监控', icon: 'layer-group', url: '/klink/dkylogin' },
      { title: '系统管理', icon: 'calendar-minus', url: '/klink/dkylogin' }
    ]
  },
  {
    title: '应用性能监控',
    platformUrl: 'performanceUrl',
    children: [
      { title: '总览', icon: 'eye', url: '/ai/redirect?to=applications' },
      { title: '报表', icon: 'eye', url: '/ai/redirect?to=applications/reports' },
      { title: '探针', icon: 'eye', url: '/ai/redirect?to=applications/agentManage' }
    ]
  },
  {
    title: '系统管理',
    children: [
      { title: '云管理域', icon: 'cloud', name: 'SystemDomain' },
      { title: '用户管理', icon: 'users-cog', name: 'SystemUserManager' },
      { title: '项目管理', icon: 'address-book', name: 'SystemDepartment' },
      { title: '角色管理', icon: 'user-tag', name: 'SystemRole' },
      { title: '日志管理', icon: 'list-alt', name: 'SystemLog' },
      { title: '门户配置', icon: 'cogs', name: 'SystemWebsite' },
      { title: '平台资源概览', icon: 'cogs', name: 'Home' },
      { name: 'SystemMessage', icon: 'comment-alt', title: '消息管理' }
    ]
  },
  {
    title: '业务管理',
    children: [
      { name: 'BusinessApply', title: '申请单', icon: 'clipboard' },
      { name: 'BusinessWorkorder', title: '工单管理', icon: 'list-ul' },
      { name: 'BusinessProductServiceDir', title: '产品管理', icon: 'server' },
      { name: 'BusinessProductUser', title: '用户产品', icon: 'poll-h' },
      { name: 'BusinessBacklog', title: '待办', icon: 'clipboard' }
    ]
  },
  {
    title: '数据服务',
    children: [
      { title: '计算产品', name: '', icon: 'list-ul' },
      { title: '网络产品', name: '', icon: 'list-ul' },
      { title: '存储产品', name: '', icon: 'list-ul' },
      { title: '大数据产品', name: '', icon: 'list-ul' },
      { title: '数据库产品', name: '', icon: 'list-ul' },
      { title: '缓存产品', name: '', icon: 'list-ul' },
      { title: '企业应用', name: '', icon: 'list-ul' }
    ]
  },
  {
    title: '区块链产品(BAAS)',
    platformUrl: 'BaasUrl',
    children: [
      { title: '仪表板', icon: 'list-ul', url: '/chain/index' },
      { title: '区块链开设', icon: 'list-ul', url: '/system/set' },
      { title: '组织管理', icon: 'list-ul', url: '/organization/list' },
      { title: '节点管理', icon: 'list-ul', url: '/node/index' },
      { title: '通道管理', icon: 'list-ul', url: '/channel/index' },
      { title: '区块链浏览器', icon: 'list-ul', url: '' }
    ]
  },

  {
    title: '工作协同',
    children: [
      { title: '工作协同', icon: 'eye', name: 'ConsoleCoordination' }
    ]
  },
  {
    title: '服务器虚拟化',
    platformUrl: 'ServerVirtualizationUrl',
    children: [
      { title: '仪表板', icon: 'list-ul', url: '/ccsvm/webadmin/#dashboard-main' },
      { title: '数据中心', icon: 'list-ul', url: '/ccsvm/webadmin/#dataCenters' },
      { title: '集群', icon: 'list-ul', url: '/ccsvm/webadmin/#clusters' },
      { title: '主机', icon: 'list-ul', url: '/ccsvm/webadmin/#hosts' },
      { title: '虚拟机', icon: 'list-ul', url: '/ccsvm/webadmin/#vms' },
      { title: '虚拟机池', icon: 'list-ul', url: '/ccsvm/webadmin/#pools' },
      { title: '模板', icon: 'list-ul', url: '/ccsvm/webadmin/#templates' },
      { title: '存储', icon: 'list-ul', url: '/ccsvm/webadmin/#storage' },
      { title: '用户', icon: 'list-ul', url: '/ccsvm/webadmin/#users' },
      { title: '网络配置集', icon: 'list-ul', url: '/ccsvm/webadmin/#vnicProfiles' },
      { title: '网络', icon: 'list-ul', url: '/ccsvm/webadmin/#networks' },
      { title: '磁盘', icon: 'list-ul', url: '/ccsvm/webadmin/#disks' },
      { title: '事件', icon: 'list-ul', url: '/ccsvm/webadmin/#events' }
    ]
  },
  {
    title: '安全云桌面',
    platformUrl: 'SecureCloudDesktopUrl',
    children: [
      { title: '仪表板', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/dashboard' },
      { title: '资源概览', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/resource' },
      { title: '桌面管理', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/desktop' },
      { title: '桌面池', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/pool' },
      { title: '桌面组', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/vmgroup' },
      { title: '模板管理', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/template' },
      { title: '终端管理', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/terminal' },
      { title: '外设控制', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/device' },
      { title: '准入控制', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/access' },
      { title: '终端升级包', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/upgrade' },
      { title: '用户', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/user' },
      { title: '计划任务', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/task' },
      { title: '终端任务', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/terminalTask' },
      { title: '桌面日志', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/vmlog' },
      { title: '终端日志', icon: 'list-ul', url: '/ccsvm/desktop/index.html#/tclog' }
    ]
  }
]
