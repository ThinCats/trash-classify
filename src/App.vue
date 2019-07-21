<template>
  <div id="app">
    <!-- <vue-canvas-nest></vue-canvas-nest> -->
    <nav-bar v-if="isShowNav" />
    <div class="app-layout">
      <router-view />
    </div>
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
//@ts-ignore
import vueCanvasNest from 'vue-canvas-nest'

@Component({
  components: {
    NavBar,
    AppFooter,
    vueCanvasNest
  }
})
export default class App extends Vue {
  private isShowNav: boolean = true
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=B612:700,700i&display=swap');
body {
  margin: 0;
}

h1,
h2,
h3 {
  font-family: 'B612', sans-serif;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  padding: 1rem 0 2rem;
  // background-color: rgba(115, 228, 208, 0.3);

  background: linear-gradient(90deg, white 20px, transparent 1%) center, linear-gradient(white 20px, transparent 1%) center, #008080;
  background-size: 22px 22px;
}
</style>
