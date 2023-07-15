import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth'

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
  }
}
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '../layouts/main/index-layout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: { title: 'Dashbopard - Split Bill' },
        component: () => import('../views/dashboard/index-page.vue'),
      },
      {
        path: '/bill',
        redirect: { name: 'billCreate' },
        children: [
          {
            path: 'create',
            name: 'billCreate',
            meta: { title: 'Create Bill - Split Bill' },
            component: () => import('../views/splitbill/index-page.vue'),
          },
          {
            path: ':order_id',
            name: 'billEdit',
            meta: { title: 'Edit Bill - Split Bill' },
            component: () => import('../views/splitbill/index-page.vue'),
          },
        ],
      },
      {
        path: '/settings',
        name: 'settings',
        meta: { title: 'Setting - Split Bill' },
        component: () => import('../views/setting/index-page.vue'),
      },
      // {
      //   path: '/:pathMatch(.*)*',
      //   component: () => import('@/views/errors/NotFound.vue'),
      // },
    ],
  },
  authRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title != from.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
