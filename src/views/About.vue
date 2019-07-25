<template>
  <div class="view-about">
    <window-card title="About Us" icon="el-icon-user">
      <img
        class="poster"
        src="https://i.loli.net/2019/07/23/5d36c5891404991853.jpg"
        alt=""
      />
    </window-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.view-about {
  margin: 0 auto;
  margin-top: 2rem;
  width: 95vw;

  @media screen and (min-width: $size-lg) {
    width: 80vw;
  }
  .poster {
    width: 100%;
    margin: 0 auto;
    object-fit: fill;
  }
}
</style>
