<template>
  <div class="trash-detect">
    <!-- <div class="title"> -->
    <!-- <h2>Upload your trash image</h2> -->
    <!-- </div> -->
    <el-card class="trash-detect-card">
      <div slot="header">
        <div class="window-bar">
          <div class="window-buttons">
            <div class="window-btn"></div>
            <div class="window-btn"></div>
            <div class="window-btn"></div>
          </div>
          <div class="window-title">
            <h1>Trash Classification Of Life</h1>
          </div>
        </div>
      </div>
      <detect-upload
        @upload-new-image="handleUploadNewImage"
        @recieve-upload-response="handleReciveUploadResponse"
      ></detect-upload>
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col class="col-center" :lg="12" :md="24" :xs="24">
          <div class="image-compare">
            <div class="compare-head">
              <detect-image-tagged
                v-show="isUploaded"
                :imageSrc="curShowImage"
                :tagRectPosition="taggedImagePosition"
              ></detect-image-tagged>
              <detect-image-show
                v-show="!isUploaded"
                :imageSrc="curShowImage"
              ></detect-image-show>
            </div>
            <div class="compare-middle">
              <detect-type-show></detect-type-show>
            </div>
            <div class="compare-foot">
              <el-divider></el-divider>
              <detect-demo-select></detect-demo-select>
            </div>
          </div>
        </el-col>
        <el-col class="flex-col-center" :lg="12" :md="24" :xs="24">
          <detect-info
            v-if="isUploaded || !showDailyArticle"
            :detectedObjectList="taggedImageResult"
          ></detect-info>
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
import DetectTypeShow from '@/components/DetectTypeShow.vue'

import {
  UploadImageResponse,
  ImagePosition,
  TaggedImageResult
} from '@/types/graphql'

@Component({
  components: {
    DetectUpload,
    DetectInfo,
    DetectDemoSelect,
    DetectImageShow,
    DetectImageTagged,
    ArticleDaily,
    DetectTypeShow
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

  // the result of object detection
  private taggedImageResult: TaggedImageResult[] = []

  private handleUploadNewImage(imgUrl: string) {
    this.curShowImage = imgUrl
    this.isUploaded = false
  }

  private handleReciveUploadResponse(response: UploadImageResponse) {
    this.taggedImageResult = response.taggedImageResult
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .compare-head {
    flex-grow: 1;
  }
}

.trash-detect {
  width: 80vw;
  margin: 0 auto;
  margin-top: 2rem;
}

.title {
  text-align: center;
  padding-bottom: 1em;
}

$btn-size: 1.2rem;
.window-bar {
  h1 {
    font-size: $btn-size;
    margin: 0;
  }
  text-align: center;
  padding: 0 0.4rem;
  .window-buttons {
    position: absolute;
    display: flex;
    .window-btn {
      width: $btn-size;
      height: $btn-size;
      border-radius: 50%;
      margin-right: 0.8rem;

      &:nth-child(1) {
        background-color: #f46067;
      }
      &:nth-child(2) {
        background-color: #fdc141;
      }
      &:nth-child(3) {
        background-color: #35c24b;
      }
    }
  }
}
</style>

<style lang="scss">
.trash-detect {
  .el-card__header {
    border-color: transparent;
  }
  .trash-detect-card {
    &.el-card {
      background-image: radial-gradient(
        circle 328px at 2.9% 0%,
        rgba(191, 224, 251, 1) 0%,
        rgba(232, 233, 251, 1) 25.8%,
        rgba(252, 239, 250, 1) 50.8%,
        rgba(234, 251, 251, 1) 77.6%,
        rgb(255, 253, 247) 100.7%
      );
    }
  }
}
</style>
