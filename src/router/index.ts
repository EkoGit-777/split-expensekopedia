import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '../layouts/main/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: { title: 'Split Bill' },
        component: () => import('../views/splitbill/index.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/setting/index.vue'),
      },
      // {
      //   path: '/:pathMatch(.*)*',
      //   component: () => import('@/views/errors/NotFound.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
