<template>
  <div class="index">
    <div class="content">
      <div class="title">Vue 3.x 前端组件库</div>
      <div class="description">
        一套为开发者开发Vue 3.x 而准备的友好、简洁、轻盈、精致的桌面端组件库
      </div>

      <div class="github">
        <router-link to="/quick-start">
          <el-button type="primary" icon="i-star-filled" size="large" round>开始享用</el-button>
        </router-link>
      </div>
    </div>

    <div class="banner">
      <div class="bg"></div>
      <div class="a"></div>
      <div class="b"></div>
      <div class="c"></div>

      <div class="visualization">
        <div class="top">Visualization</div>
        <div class="h"></div>
        <div class="w"></div>
        <div class="bar">
          <i v-for="(item, index) in 4" :key="index"></i>
        </div>
      </div>

      <div class="users">
        <div class="cover"></div>
        <div class="row1"></div>
        <div class="row2"></div>
      </div>

      <div class="color">
        <div class="panel"></div>
        <div class="panel-group">
          <i v-for="(item, index) in 5" :key="index"></i>
        </div>
        <div class="text">Color</div>
      </div>

      <div class="font">Font</div>

      <div class="btn">Button</div>

      <div class="browser">
        <div class="top">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div class="aside"></div>
      </div>
    </div>

    <div class="element">
      <div class="triangle-move">
        <div class="triangle-rotate">
          <div class="triangle"></div>
        </div>
      </div>
      <div class="ellipse"></div>
      <div class="round"></div>
      <div class="square"></div>
      <div class="combination"></div>
      <div class="semicirce"></div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { jsonp } from '../utils/jsonp';

  export default {
    setup() {
      const watch = ref(0);
      const star = ref(0);
      const fork = ref(0);

      jsonp({
        url: 'https://api.github.com/repos/yanghuanrong/RelaxPlus',
        jsonp: 'callback',
      }).then(({ data }) => {
        watch.value = data.subscribers_count;
        star.value = data.watchers;
        fork.value = data.forks;
      });

      return {
        watch,
        star,
        fork,
      };
    },
  };
</script>
