<template>
  <div>
    <el-dropdown>
      <div class="side-menu-btn">
        <i class="el-icon-s-operation"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item disabled>4</el-dropdown-item>
        <el-dropdown-item divided>5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SideMenu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-menu-btn {
  padding: 0.1rem 0.15rem;
  border: 1px solid transparent;
  font-size: 1.5rem;
  color: $logo-primary-color;
  &:hover {
    i {
      filter: invert(1);
    }
    // border-color: $logo-primary-color;
  }
}
</style>
