import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'editor',
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/editor'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
