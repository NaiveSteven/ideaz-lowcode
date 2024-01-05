import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
