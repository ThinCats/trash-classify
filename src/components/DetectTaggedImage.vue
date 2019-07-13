<template>
  <div>
    <div class="tagged-card-head"></div>
    <el-card>
      <el-image :src="imageSrc" :style="{ width: imageWidth }">
        <div slot="placeholder" class="image-slot">
          Loading<span class="dot">...</span>
        </div>
      </el-image>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DetectTaggedImage extends Vue {
  @Prop({ default: 390 }) private readonly imageWidth!: number
  @Prop({ default: '' }) private readonly imageSrc!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tagged-card-head {
  position: relative;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  background-color: #fff;
}
</style>
