<template>
  <div class="window-card">
    <el-card :body-style="bodyStyle">
      <!-- if no title specified, no header render -->
      <div slot="header" class="card-header" v-if="title.length > 0">
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
    color: #008080;
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
  position: relative;
  height: 100%;
  z-index: 2;
  & > .el-card {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);

    & > .el-card__body {
      height: 100%;
    }
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   right: 0;
  //   left: 0;
  //   background: rgba(255, 255, 255, 0.5);
  //   z-index: -1;
  //   filter: blur(20px);
  // }
}
</style>
