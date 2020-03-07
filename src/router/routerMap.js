/* Layout */
import Layout from '@/layout'

export const routerMap = {
  // 会员管理
  user: {
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
  // 商品管理
  goods: {
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
  // 订单管理"
  order: {
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
  // 门店管理
  store: {
    path: '/store-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'StoreManage',
        component: () => import('@/views/StoreManage/index'),
        meta: { title: '门店管理', icon: 'example' }
      }
    ]
  },
  // 优惠券管理
  coupon: {
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
        meta: { title: '门店抵用券', icon: 'form', type: 2 }
      },
      {
        path: 'wash-coupon',
        name: 'WashCoupon',
        component: () => import('@/views/CouponManage/index'),
        meta: { title: '洗涤抵用券', icon: 'form', type: 1 }
      }
    ]
  },
  // 财务管理
  finance: {
    path: '/finance',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Finance',
        component: () => import('@/views/Finance/index'),
        meta: { title: '财务', icon: 'example' }
      }
    ]
  },
  // 核销
  check: {
    path: '/verify',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'verify',
        component: () => import('@/views/Verify/index'),
        meta: { title: '核销', icon: 'example' }
      }
    ]
  },
  // 门店
  shop: {
    path: '/store',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Store',
        component: () => import('@/views/Store/index'),
        meta: { title: '门店', icon: 'example' }
      }
    ]
  },
  // 全局设置
  global: {
    path: '/setting',
    component: Layout,
    redirect: '/setting/basic',
    name: 'Setting',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: 'basic-setting',
        name: 'BasicSetting',
        component: () => import('@/views/Setting/Basic/index'),
        meta: { title: '基础设置', icon: 'form' }
      },
      {
        path: 'trade-setting',
        name: 'TradeSetting',
        component: () => import('@/views/Setting/Trade/index'),
        meta: { title: '交易设置', icon: 'form' }
      },
      {
        path: 'message-setting',
        name: 'MessageSetting',
        component: () => import('@/views/Setting/Message/index'),
        meta: { title: '短信设置', icon: 'form' }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/Setting/News/index'),
        meta: { title: '消息推送', icon: 'form' }
      }
    ]
  },
  // 数据统计
  statistics: {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/pay',
    name: 'Statistics',
    meta: { title: '数据统计', icon: 'example' },
    children: [
      {
        path: 'pay',
        name: 'PayStatistics',
        component: () => import('@/views/Statistics/Pay/index'),
        meta: { title: '核销统计', icon: 'form' }
      },
      {
        path: 'order',
        name: 'OrderStatistics',
        component: () => import('@/views/Statistics/Order/index'),
        meta: { title: '订单统计', icon: 'form' }
      },
      {
        path: 'vip',
        name: 'VipStatistics',
        component: () => import('@/views/Statistics/Vip/index'),
        meta: { title: '会员统计', icon: 'form' }
      }
    ]
  },
  // 工作台
  worker: {
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
  // 权限管理
  right: {
    path: '/auth-manage',
    component: Layout,
    redirect: '/auth-manage/role',
    name: 'AuthManage',
    meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        path: 'role',
        name: 'RoleManage',
        component: () => import('@/views/AuthManage/Role'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'operation',
        name: 'OperationManage',
        component: () => import('@/views/AuthManage/Operation'),
        meta: { title: '操作员管理', icon: 'form' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/AuthManage/Log'),
        meta: { title: '操作日志', icon: 'form' }
      }
    ]
  },
}
