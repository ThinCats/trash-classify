<template>
  <div class="detect-image-tagged">
    <window-card>
      <div class="img-container">
        <div class="detect-rect" v-bind:style="tagRectStyle"></div>
        <img :src="imageSrc" id="taggedImage" ref="curImageRef" />
      </div>
    </window-card>
    <!-- For original image size obtain -->
    <img
      v-show="false"
      :src="imageSrc"
      alt=""
      id="originalImage"
      ref="oriImageRef"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as utils from '@/utils/utils'

interface RectStyle {
  width: string
  height: string
  top: string
  left: string
}

@Component
export default class DetectTaggedImage extends Vue {
  $refs!: {
    curImageRef: HTMLImageElement
    oriImageRef: HTMLImageElement
  }
  @Prop({ default: '' }) private readonly imageSrc!: string
  @Prop() private readonly tagRectPosition!: utils.PositionType

  private imageSize!: utils.ImageSize

  // will scale according to current image size
  // and orignal image size, to fit the tagged rectangular
  get scaledRectPosition() {
    //!! TODO: Fix this ugly code
    try {
      return utils.getScaledPosition(
        {
          width: this.$refs.curImageRef.width,
          height: this.$refs.curImageRef.height
        },
        this.tagRectPosition,
        {
          width: this.$refs.oriImageRef.width,
          height: this.$refs.oriImageRef.height
        }
      )
    } catch (err) {
      return this.tagRectPosition
    }
  }

  get tagRectStyle() {
    let style = {}
    let position = this.scaledRectPosition
    for (let key in position) {
      if (key === '__typename') {
        continue
      }
      //@ts-ignore
      style[key] = position[key] + 'px'
    }
    return style
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-container {
  position: relative;
  .detect-rect {
    position: absolute;
    border: 2px solid green;
    z-index: 100;
  }

  img {
    max-width: 100%;
  }
}
</style>
