<template>
  <div class="content-page">
    <router-view />
    <div v-if="menu" class="h2-nav">
      <div class="dot" :style="{ transform: 'translateY(' + menuActive * 28 + 'px)' }"></div>
      <div
        v-for="(item, i) in menu"
        :key="i"
        class="item"
        :class="{ active: menuActive === i }"
        @click="toView(i)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- <div class="qrcode"><img src="@/assets/qrcode.jpg" alt="" /></div> -->
  </div>
</template>

<script>
  import { nextTick, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { on } from '../utils/dom';
  export default {
    setup() {
      const menu = reactive([]);
      const menuActive = ref(0);

      const setMenu = () => {
        menu.length = 0;
        let h2 = document.querySelectorAll('.relax-doc [id]');
        if (h2.length) {
          Array.from(h2).forEach((item) => {
            menu.push({
              name: item.innerText,
              id: item.id,
            });
          });
        }
      };

      const router = useRouter();
      router.afterEach(async () => {
        await nextTick();
        setMenu();
      });

      const toView = (i) => {
        if (menu.length) {
          const el = document.querySelector('#' + menu[i].id);
          document.documentElement.scrollTop = el && el.offsetTop - 30;
        }
      };

      const scroll = () => {
        if (!menu.length) {
          return;
        }
        let nowTop = document.documentElement.scrollTop;
        let location = [];

        for (let i = 0; i < menu.length; i++) {
          let el = document.querySelector('#' + menu[i].id);
          let top = el && el.offsetTop - 30;
          location.push(Math.abs(nowTop - top));
        }
        let k = 0;
        let iNow = location[0];

        for (let i = 1; i < location.length; i++) {
          if (location[i] < iNow) {
            iNow = location[i];
            k = i;
          }
        }
        menuActive.value = k;
      };

      on(window, 'scroll', scroll);

      return {
        menu,
        menuActive,
        toView,
      };
    },
  };
</script>
