<template>
  <div class="trash-detect">
    <div class="title">
      <h1>Trash Detection</h1>
      <h2>Upload your trash image</h2>
    </div>
    <el-card>
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <div class="image-compare">
            <detect-upload></detect-upload>
            <el-divider></el-divider>
            <detect-demo-select></detect-demo-select>
          </div>
        </el-col>
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <detect-info v-if="isUploaded"></detect-info>
          <article-daily v-else></article-daily>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DetectUpload from '@/components/DetectUpload.vue'
import DetectInfo from '@/components/DetectInfo.vue'
import DetectDemoSelect from '@/components/DetectDemoSelect.vue'
import ArticleDaily from '@/components/ArticleDaily.vue'

@Component({
  components: {
    DetectUpload,
    DetectInfo,
    DetectDemoSelect,
    ArticleDaily
  }
})
export default class Detect extends Vue {
  private isUploaded: boolean = false
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.trash-detect {
  width: 80vw;
  margin: 0 auto;
}

.title {
  text-align: center;
  padding-bottom: 1em;
}
</style>
