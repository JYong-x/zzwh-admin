// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard/workplace',
        name: 'Dashboard',
        meta: { title: '总览', keepAlive: true, icon: '' },
        component: () => import('@/views/dashboard/workplace')
      },
      {
        path: '/contract',
        name: 'Contract',
        meta: { title: '合同管理', keepAlive: true, icon: '' },
        component: () => import('@/views/contract/contract')
      },
      {
        path: '/cost',
        name: 'Cost',
        meta: { title: '费用', keepAlive: true, icon: '' },
        component: () => import('@/views/cost/cost')
      },
      {
        path: '/role',
        name: 'Role',
        meta: { title: '角色', keepAlive: true, icon: '' },
        component: () => import('@/views/role/role-list')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
