export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]
export const asyncRouters = [
  // {
  //   path: '/',
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard'),
  //       meta: { title: 'Dashboard', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   alwaysShow: false,
  //   redirect: '/example/table',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'mock-test',
  //       component: () => import('@/views/example/mock/MockTest'),
  //       name: 'MockTest',
  //       meta: { title: 'MockTest', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'svg-icon',
  //       component: () => import('@/views/example/svg-icon/SvgIconDemo'),
  //       name: 'SvgIcon',
  //       hidden: false,
  //       meta: { title: 'SvgIcon', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   redirect: '/nested/menu1-1',
  //   alwaysShow: true,
  //   meta: { title: 'Nested', icon: 'nested' },
  //   children: [
  //     {
  //       path: 'menu1-1',
  //       name: 'menu1-1',
  //       meta: { title: 'menu1-1', icon: 'nested' },
  //       component: () => import('@/views/nested/menu1/menu1-1')
  //     },
  //     {
  //       path: 'menu1-2',
  //       name: 'menu1-2',
  //       meta: { title: 'menu1-2', icon: 'nested' },
  //       alwaysShow: false,
  //       children: [
  //         {
  //           path: 'menu1-2-1',
  //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //           name: 'menu1-2-1',
  //           hidden: false,
  //           meta: { title: 'menu1-2-1', icon: 'nested' }
  //         },
  //         {
  //           path: 'menu1-2-2',
  //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //           name: 'menu1-2-2',
  //           meta: { title: 'menu1-2-2', icon: 'home' }
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: '/',
    redirect: '/home',
    children:
    [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          affix: true,
          permission: 'p_0_0'
        }
      }
    ]
  },
  {
    path: '/sys-account-manage',
    redirect: 'noRedirect',
    meta: { title: '系统账户管理', icon: 'el-icon-user-solid', breadcrumb: true, permission: 'p_1_0' },
    alwaysShow: true,
    children:
    [
      {
        path: 'role',
        component: () => import('@/views/role/index'),
        name: 'Role',
        meta: { title: '角色管理', permission: 'p_1_1' }
      },
      {
        path: 'sys-account',
        component: () => import('@/views/sysAccount/index'),
        name: 'SysAccount',
        meta: { title: '系统账户管理', permission: 'p_1_2' }
      }
    ]
  },
  {
    path: '/system-monitoring',
    redirect: 'noRedirect',
    meta: { title: '系统监控', icon: 'el-icon-phone-outline', breadcrumb: true, permission: 'p_2_0' },
    alwaysShow: true,
    children:
    [
      {
        path: 'detail',
        component: () => import('@/views/detail/index'),
        name: 'Detail',
        meta: { title: '明细监控', permission: 'p_2_1' }
      },
      // {
      //   path: '/chartOne',
      //   component: () => import('@/views/detail/components/chartOne.vue'),
      //   name: 'chartOne',
      //   meta: { title: '明细监控', permission: 'p_2_1' },
      //   hidden: true
      // },
      // {
      //   path: '/global',
      //   redirect: 'noRedirect',
      //   meta: { title: '全局监控', permission: 'p_2_2' },
      //   target: true
      // },
      // {
      //   path: '/globalTwo',
      //   redirect: 'noRedirect',
      //   meta: { title: '全局监控', permission: 'p_2_2' },
      //   target: true
      // },
      {
        path: 'online-user',
        component: () => import('@/views/onlineUser/index'),
        name: 'OnlineUser',
        meta: { title: '实时在线用户', permission: 'p_2_3' }
      },
      {
        path: 'packetMonitor',
        component: () => import('@/views/packetMonitor/index'),
        name: 'packetMonitor',
        meta: { title: '数据包监控', permission: 'p_2_6' }
      },
      {
        path: 'warning-setting',
        component: () => import('@/views/warningSetting/index'),
        name: 'WarningSetting',
        meta: { title: '异常告警设置', permission: 'p_2_4' }
      },
      {
        path: 'abnormal-notice',
        name: 'AbnormalNotice',
        meta: { title: '异常通知', permission: 'p_2_5' },
        component: () => import('@/views/abnormalNotice/index')
      }
    ]
  },
  {
    path: '/system-config',
    redirect: 'noRedirect',
    meta: {
      title: '系统配置',
      icon: 'el-icon-s-tools',
      breadcrumb: true,
      permission: 'p_6_0'
    },
    alwaysShow: true,
    children: [
      {
        path: 'calendar',
        component: () => import('@/views/calendar/index'),
        name: 'Calendar',
        meta: { title: '交易日历配置', permission: 'p_6_1' }
      }
    ]
  },
  {
    path: '/operator',
    redirect: 'noRedirect',
    meta: { title: '用户管理', icon: 'el-icon-s-check', breadcrumb: true, permission: 'p_3_0' },
    alwaysShow: true,
    children:
    [
      {
        path: 'operator-management',
        component: () => import('@/views/operatorManagement/index'),
        name: 'OperatorManagement',
        meta: { title: '用户管理', permission: 'p_3_1' }
      },
      {
        path: 'audit-todo',
        component: () => import('@/views/auditTodo/index'),
        name: 'AuditTodo',
        meta: { title: '审核待办', permission: 'p_3_2' }
      }
    ]
  },
  {
    path: '/data-report',
    redirect: 'noRedirect',
    meta: { title: '数据报表', icon: 'el-icon-s-data', breadcrumb: true, permission: 'p_4_0' },
    alwaysShow: true,
    children:
    [
      {
        path: 'user-statistics',
        component: () => import('@/views/userStatistics/index'),
        name: 'UserStatistics',
        meta: { title: '用户统计', permission: 'p_4_3' }
      },
      {
        path: 'sz-monthly-statistics',
        component: () => import('@/views/szMonthlyStatistics/index'),
        name: 'SzMonthlyStatistics',
        meta: { title: '月度统计（深）', permission: 'p_4_1' }
      },
      {
        path: 'sh-monthly-statistics',
        component: () => import('@/views/shMonthlyStatistics/index'),
        name: 'ShMonthlyStatistics',
        meta: { title: '月度统计（沪）', permission: 'p_4_2' }
      }
    ]
  },
  {
    path: '/log-management',
    redirect: 'noRedirect',
    meta: { title: '日志管理', icon: 'el-icon-document-copy', breadcrumb: true, permission: 'p_5_0' },
    alwaysShow: true,
    children:
    [
      {
        path: 'operation-log',
        component: () => import('@/views/operationLog/index'),
        name: 'OperationLog',
        meta: { title: '系统操作日志', permission: 'p_5_1' }
      },
      {
        path: 'connect-log',
        component: () => import('@/views/connectLog/index'),
        name: 'ConnectLog',
        meta: { title: '建联日志', permission: 'p_5_2' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true,component: () => import('@/views/error-page/404') }
]
