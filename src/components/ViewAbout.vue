<template>
  <div class="view-about">
    <window-card title="About Us" icon="el-icon-user">
      <img src="https://i.loli.net/2019/07/23/5d36c5891404991853.jpg" alt="" />
    </window-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ViewAbout extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
