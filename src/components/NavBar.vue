<template>
  <div class="nav-bar">
    <div class="nav-head">
      <side-menu />
      <div class="logo-container">
        <img src="../assets/logo.svg" class="logo-img" />
      </div>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="nav-menu"
      mode="horizontal"
      active-text-color="black"
      @select="handleSelect"
    >
      <el-menu-item class="page-link" :index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item class="page-link" :index="2">
        <router-link to="/about">About</router-link>
      </el-menu-item>
      <el-menu-item class="page-link" :index="3">
        <router-link to="/test">Test</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SideMenu from '@/components/SideMenu.vue'

@Component({
  components: {
    SideMenu
  }
})
export default class NavBar extends Vue {
  @Prop({ default: 1 }) private readonly activeIndex!: number

  private logoSrc: string = '../assets/logo.png'

  private handleSelect() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$text-primary-color: #5759ff;
// $text-primary-color: $logo-primary-color;
$text-actived-color: #222232;
$page-padding: 6%;

.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 0 $page-padding;
  .nav-head {
    display: flex;
    align-items: center;
    // for each even element, has right margin
    & > :nth-child(2n) {
      margin-left: 2rem;
    }
  }
}

.logo-img {
  width: 60px;
}

.nav-menu {
  margin-right: 2rem;
  .page-link {
    border-bottom: 2px solid transparent;

    &:hover {
      color: $text-actived-color;
      border-bottom-color: $text-actived-color;
    }
    & > a {
      text-decoration: none;
      font-size: 1.0625rem;
      font-weight: 700;
      color: $text-primary-color;
    }

    &.is-active > a {
      color: $text-actived-color;
    }
  }
}
</style>
