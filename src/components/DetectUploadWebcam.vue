<template>
  <div class="upload-webcam">
    <el-button type="text" @click="dialogTableVisible = true"
      >Use Camera</el-button
    >

    <el-dialog
      title="Camera"
      :visible.sync="dialogTableVisible"
      :show-close="false"
    >
      <!-- Recreate the component if reopen dialog, if open start the camera -->
      <web-cam
        @captured-image="handleCapturedImage"
        @close-me="dialogTableVisible = false"
        :startCameraFlag="dialogTableVisible"
      ></web-cam>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import WebCam from '@/components/WebCam.vue'

@Component({
  components: {
    WebCam
  }
})
export default class DetectUploadWebcam extends Vue {
  private dialogTableVisible: boolean = false

  @Emit('captured-image')
  private handleCapturedImage(img: string) {
    this.dialogTableVisible = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

