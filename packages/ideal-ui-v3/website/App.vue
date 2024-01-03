<template>
  <div class="wrapper">
    <div class="sidebar-nav">
      <div class="sidebar-menu">
        <teleport to="body">
          <router-link to="/" title="vue-bms-ui-v3">
            <div class="logo-img"></div>
          </router-link>
        </teleport>

        <el-scrollbar>
          <div v-for="(menu, i) in nav" :key="i" class="menu">
            <dl v-if="menu.child">
              <dt># {{ menu.title }}</dt>
              <dd v-for="(submenu, k) in menu.child" :key="i + k">
                <router-link :to="submenu.routePath">{{ submenu.title }}</router-link>
              </dd>
            </dl>
            <router-link v-else :to="menu.routePath">{{ menu.title }}</router-link>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <View />
  </div>
  <div class="content-menu">
    <el-tag type="danger">{{ version }}</el-tag>
    <el-tooltip content="去仓库" placement="bottom">
      <a
        href="http://gitlab.devops.guchele.com/fe/fe-bms/vue-bms-ui-v3"
        target="__blank"
        class="item"
      >
        <el-icon><i-cherry /></el-icon>
      </a>
    </el-tooltip>
  </div>
</template>

<script>
  import routes from './router/data';
  import View from './views/View';
  import { ref } from 'vue';
  import pkg from '../package.json';

  export default {
    components: {
      View,
    },
    setup() {
      const nav = useNav();

      const { toggle, handleToggle } = useToggle();

      return {
        nav,
        toggle,
        handleToggle,
        version: pkg.version,
      };
    },
  };

  const useToggle = () => {
    const theme = localStorage.getItem('color-mode');
    const DARK = 'dark';
    const LIGHT = 'light';
    const toggle = ref(theme === DARK);

    const setToggle = () => {
      if (toggle.value) {
        localStorage.setItem('color-mode', DARK);
        document.documentElement.setAttribute('data-color-mode', DARK);
      } else {
        localStorage.setItem('color-mode', LIGHT);
        document.documentElement.setAttribute('data-color-mode', LIGHT);
      }
    };
    const handleToggle = () => {
      toggle.value = !toggle.value;
      setToggle();
    };
    setToggle();

    return {
      toggle,
      handleToggle,
    };
  };

  const useNav = () => {
    const menu = [];
    const submenu = [];

    routes.data.forEach((item) => {
      if (item.tag) {
        let index = null;
        submenu.forEach((i, k) => {
          if (i.title === item.tag) {
            index = k;
          }
        });

        if (index !== null) {
          submenu[index].child.push(item);
        } else {
          submenu.push({
            title: item.tag,
            child: [item],
          });
        }
      } else {
        menu.push(item);
      }
    });

    return menu.concat(submenu);
  };
</script>
