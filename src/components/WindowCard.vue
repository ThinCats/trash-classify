<template>
  <div class="window-card">
    <el-card :body-style="bodyStyle">
      <div slot="header" class="card-header">
        <h3>{{ title }}</h3>
        <i :class="icon"></i>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * Card like window, with title
 */
@Component
export default class WindowCard extends Vue {
  @Prop({ default: '' }) private readonly title!: string
  @Prop({ default: 'el-icon-more-outline' }) private readonly icon!: string
  @Prop({
    default: () => {
      return {}
    }
  })
  private readonly bodyStyle!: object
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  h3 {
    margin: 0;
  }

  i {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
  }
}
</style>

<style lang="scss">
// to control the height from father container
.window-card {
  height: 100%;
  & > .el-card {
    height: 100%;

    & > .el-card__body {
      height: 100%;
    }
  }
}
</style>

