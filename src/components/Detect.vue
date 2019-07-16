<template>
  <div class="trash-detect">
    <div class="title">
      <h1>Trash Detection</h1>
      <h2>Upload your trash image</h2>
    </div>
    <el-card>
      <detect-upload
        @upload-new-image="handleUploadNewImage"
        @recieve-upload-response="handleReciveUploadResponse"
      ></detect-upload>
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col class="col-center" :lg="12" :md="24" :xs="24">
          <div class="image-compare">
            <detect-image-tagged
              v-show="isUploaded"
              :imageSrc="curShowImage"
              :tagRectPosition="taggedImagePosition"
            ></detect-image-tagged>
            <detect-image-show
              v-show="!isUploaded"
              :imageSrc="curShowImage"
            ></detect-image-show>
            <el-divider></el-divider>
            <detect-demo-select></detect-demo-select>
          </div>
        </el-col>
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <detect-info v-if="isUploaded || !showDailyArticle"></detect-info>
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
import DetectImageShow from '@/components/DetectImageShow.vue'
import DetectImageTagged from '@/components/DetectImageTagged.vue'

import { UploadImageResponse, ImagePosition } from '@/types/graphql'

@Component({
  components: {
    DetectUpload,
    DetectInfo,
    DetectDemoSelect,
    DetectImageShow,
    DetectImageTagged,
    ArticleDaily
  }
})
export default class Detect extends Vue {
  private isUploaded: boolean = false
  private showDailyArticle: boolean = true

  // current showing image, url
  private curShowImage: string = ''

  // the main object position
  private taggedImagePosition: ImagePosition = {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }

  private handleUploadNewImage(imgUrl: string) {
    this.curShowImage = imgUrl
    this.isUploaded = false
  }

  private handleReciveUploadResponse(response: UploadImageResponse) {
    console.log(response.taggedImageResult)
    console.log(response.taggedImagePosition)
    this.taggedImagePosition = response.taggedImagePosition
    this.showDailyArticle = false
    this.isUploaded = true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image-compare {
  width: 100%;
}

.trash-detect {
  width: 80vw;
  margin: 0 auto;
}

.title {
  text-align: center;
  padding-bottom: 1em;
}
</style>
