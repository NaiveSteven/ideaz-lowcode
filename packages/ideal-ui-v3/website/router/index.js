import { createRouter, createWebHashHistory } from 'vue-router';
import { data } from './data.json';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

data.forEach((item) => {
  if (item.title) {
    const title = item.title.split(' ').reverse().join(' ');

    routes.push({
      path: item.routePath,
      name: item.componentName,
      meta: {
        title,
      },
      component: () => import('../docs/' + item.componentPath),
    });
  }
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title = to.meta.title ? `${to.meta.title} - vue-bms-ui-v3` : `vue-bms-ui-v3`;
  document.title = title;
});

export default router;
