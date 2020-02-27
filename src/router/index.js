import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },
  {
    path: '/vip-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'VipManage',
        component: () => import('@/views/VipManage/index'),
        meta: { title: '会员管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/product-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ProductManage',
        component: () => import('@/views/ProductManage/index'),
        meta: { title: '商品管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/order-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'OrderManage',
        component: () => import('@/views/OrderManage/index'),
        meta: { title: '订单管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/coupon-manage',
    component: Layout,
    redirect: '/coupon-manage/store-coupon',
    name: 'CouponManage',
    meta: { title: '优惠券管理', icon: 'example' },
    children: [
      {
        path: 'store-coupon',
        name: 'StoreCoupon',
        component: () => import('@/views/CouponManage/index'),
        meta: { title: '门店抵用券', icon: 'form', type: 1 }
      },
      {
        path: 'wash-coupon',
        name: 'WashCoupon',
        component: () => import('@/views/CouponManage/index'),
        meta: { title: '洗涤抵用券', icon: 'form', type: 2 }
      }
    ]
  },
  {
    path: '/auth-manage',
    component: Layout,
    redirect: '/auth-manage/role',
    name: 'AuthManage',
    meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/AuthManage/Role'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'operation',
        name: 'Operation',
        component: () => import('@/views/form/index'),
        meta: { title: '操作员管理', icon: 'form' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/form/index'),
        meta: { title: '操作日志', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/basic',
    name: 'Setting',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: 'basic-setting',
        name: 'BasicSetting',
        component: () => import('@/views/form/index'),
        meta: { title: '基础设置', icon: 'form' }
      },
      {
        path: 'trade-setting',
        name: 'TradeSetting',
        component: () => import('@/views/form/index'),
        meta: { title: '交易设置', icon: 'form' }
      },
      {
        path: 'message-setting',
        name: 'MessageSetting',
        component: () => import('@/views/form/index'),
        meta: { title: '短信设置', icon: 'form' }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/form/index'),
        meta: { title: '消息推送', icon: 'form' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/pay',
    name: 'Statistics',
    meta: { title: '数据统计', icon: 'example' },
    children: [
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('@/views/form/index'),
        meta: { title: '核销统计', icon: 'form' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/form/index'),
        meta: { title: '订单统计', icon: 'form' }
      },
      {
        path: 'vip',
        name: 'Vip',
        component: () => import('@/views/form/index'),
        meta: { title: '会员统计', icon: 'form' }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Finance',
        component: () => import('@/views/form/index'),
        meta: { title: '财务', icon: 'example' }
      }
    ]
  },
  {
    path: '/store-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'StoreManage',
        component: () => import('@/views/form/index'),
        meta: { title: '门店管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Store',
        component: () => import('@/views/form/index'),
        meta: { title: '门店', icon: 'example' }
      }
    ]
  },
  {
    path: '/verify',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'verifyManage',
        component: () => import('@/views/form/index'),
        meta: { title: '核销', icon: 'example' }
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
