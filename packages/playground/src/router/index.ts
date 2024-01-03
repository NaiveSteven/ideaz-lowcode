import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/config'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
