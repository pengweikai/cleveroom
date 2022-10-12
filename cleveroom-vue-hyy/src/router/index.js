import Vue from 'vue'
import Router from 'vue-router'

import Keshihua from "../views/Keshi/Keshihua";
import Login from '@/views/login'
import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * 关于 route 的配置属性说明：
 *
 * alwaysShow: true       // if set true, will always show the root menu, whatever its child routes length
 *                        // if not set alwaysShow, only more than ont route under the children
 *                        // it will becomes nested mode, otherwise not show the root menu
 *                        // 如果设置为true,它将总是出现在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                        // 它的唯一子路由放到跟目录上来，而不显示它自己本身。
 *
 * hidden: true           // if set ture, 将不会出现在左侧菜单栏中
 */

/**
 * 基础路由： 任何角色都包含的路由
 * @type {Array}
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/device',
    children: [
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/device/index'),
        meta: {icon: 'film', title: '设备管理'}
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '个人中心'}
      }
    ]
  },
  {
    path: '/position',
    component: Layout,
    redirect: '/position/index',
    meta: {
      icon: 'location-information',
      title: '位置管理'
    },
    children: [
      {
        path: 'index',
        name: 'positionIndex',
        component: () => import('@/views/position/index'),
        meta: {icon: 'location-information', title: '位置管理'}
      }
    ]
  },
  {
    path: '/Keshi',
    component: Keshihua,
    // component: login,
    // hidden: true,
    // meta: {
    //   icon: 'tickets',
    //   title: '可视化'
    // },
    children: [
      {
        path: 'Keshihua',
        name: 'Keshihua',
        component: () => import('@/views/Keshi/Keshihua')
        // meta: {icon: 'warning', title: '可视化'}
      }
    ]
  },
  {
    path: '/region',
    component: Layout,
    redirect: '/region/index',
    meta: {
      icon: 'pie-chart',
      title: '区域选择'
    },
    children: [
      {
        path: 'index',
        name: 'Region',
        component: () => import('@/views/region/index'),
        meta: {icon: 'pie-chart', title: '区域选择'}
      }
    ]
  },
  {
    path: '/environment',
    component: Layout,
    redirect: '/environment/index',
    meta: {
      icon: 'pie-chart',
      title: '环境监测'
    },
    children: [
      {
        path: 'index',
        name: 'environment',
        component: () => import('@/views/envir/index'),
        meta: {icon: 'cpu', title: '环境监测'}
      }
    ]
  },
  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/index',
    meta: {
      icon: 'pie-chart',
      title: '预警信息'
    },
    children: [
      {
        path: 'index',
        name: 'alarm',
        component: () => import('@/views/alarm/index'),
        meta: {icon: 'sunset', title: '预警信息'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 动态路由： 根据用户角色
 * @type {Array}
 */
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
