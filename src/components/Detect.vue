<template>
  <div class="trash-detect">
    <div class="title">
      <h1>Trash Detection</h1>
      <h2>Upload your trash image</h2>
    </div>
    <el-card>
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <detect-upload></detect-upload>
        </el-col>
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <detect-tagged-image></detect-tagged-image
        ></el-col>
      </el-row>
      <el-row>
        <el-col> <detect-info></detect-info></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DetectUpload from '@/components/DetectUpload.vue'
import DetectInfo from '@/components/DetectInfo.vue'
import DetectTaggedImage from '@/components/DetectTaggedImage.vue'

@Component({
  components: {
    DetectUpload,
    DetectInfo,
    DetectTaggedImage
  }
})
export default class Detect extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.trash-detect {
  width: 60vw;
  margin: 0 auto;
}

.title {
  text-align: center;
  padding-bottom: 1em;
}
</style>
