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
          <div class="window-bar-right"></div>
        </div>
      </div>
      <detect-upload
        @upload-new-image="handleUploadNewImage"
        @recieve-upload-response="handleReciveUploadResponse"
      ></detect-upload>
      <el-row :gutter="20">
        <el-col class="col-center" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
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
        <el-col
          v-if="isUploading || isUploaded || !showDailyArticle"
          class="margin-center"
          :xl="12"
          :lg="12"
          :md="12"
          :sm="12"
          :xs="24"
        >
          <div class="hidden-sm-and-up">
            <el-divider></el-divider>
          </div>
          <detect-info
            v-loading="isUploading"
            :detectedObjectList="taggedImageResult"
          ></detect-info>
        </el-col>
        <!-- hiden when screen size is too small -->
        <el-col
          v-else
          class="flex-col-center hidden-xs-only"
          :xl="12"
          :lg="12"
          :md="12"
          :sm="12"
          :xs="24"
        >
          <article-daily></article-daily>
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
  // whether file is uploading
  private isUploading: boolean = false

  // current showing image, url
  private curShowImage: string = ''

  // is the uploadingTips show?
  private isShownTips: boolean = false

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
    this.isUploading = true
  }

  private handleReciveUploadResponse(response: UploadImageResponse) {
    this.taggedImageResult = response.taggedImageResult
    this.taggedImagePosition = response.taggedImagePosition
    this.showDailyArticle = false
    this.isUploaded = true
    this.isUploading = false
    // send tips for use on how to see result
    this.sendUploadingTips()
  }

  private sendUploadingTips() {
    if (!this.isShownTips) {
      // only for small device
      if (window.matchMedia('screen and (max-width: 380px)').matches) {
        // only show once
        this.isShownTips = true
        this.$notify({
          title: 'Tips',
          type: 'success',
          message:
            'You can slide your screen down to see the results, just after the demo pictures :)',
          duration: 0
        })
      }
    }
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

  .compare-middle {
    flex-grow: 1;
  }
}

.trash-detect {
  width: 80vw;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (min-width: $size-md) {
    width: 80vw;
  }

  @media screen and (min-width: $size-lg) {
    width: 70vw;
  }

  @media screen and (min-width: $size-xl) {
    width: 65vw;
  }
  @media screen and (max-width: $size-md) {
    width: 95vw;
  }
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  padding: 0 0.4rem;
  .window-buttons {
    display: flex;
    margin-right: auto;
    .window-btn {
      width: $btn-size;
      height: $btn-size;
      border-radius: 50%;
      margin-right: 0.8rem;

      @media screen and (max-width: $size-xs) {
        width: 0.8rem;
        height: 0.8rem;
        // split from title
        margin-bottom: 0.4rem;
      }

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

  .window-title {
    text-align: center;
  }

  .window-bar-right {
    width: 96px;
    margin-left: auto;
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
        rgb(255, 253, 247) 100.7%
      );
    }
  }
}
</style>
