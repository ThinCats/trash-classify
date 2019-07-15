<template>
  <div class="article-daily">
    <el-card>
      <h2>Daily Article</h2>
      <p>Hello, world</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ArticleDaily extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.article-daily {
  width: 100%;
  height: 100%;
  text-align: center;

  & > .el-card {
    height: 100%;
  }
}
</style>
