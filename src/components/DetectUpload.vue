<template>
  <div class="detect-upload">
    <el-upload
      ref="trashUpload"
      class="upload-demo"
      drag
      :draggable="true"
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :on-exceed="handleFileExceed"
      :on-success="handleFileSuccess"
      :on-error="handleFileError"
      list-type="picture"
      :auto-upload="true"
      accept="jpg"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drag file there, Or <em>click to submit</em>
      </div>
      <!-- <div class="el-upload__tip" slot="tip">
        只能上传图片文件
      </div> -->
    </el-upload>

    <el-card>
      <img
        v-if="curFile.status == 'success'"
        :src="curFile.url"
        :alt="curFile.name"
        width="310"
      />
      <div style="text-align: center">{{ curFile.name }}</div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { FileListItem } from 'element-ui/types/upload'

@Component
export default class DetectUpload extends Vue {
  private disabled: boolean = false

  private curFile: FileListItem = {
    name: 'Upload your trash and have fun :)',
    url: '#',
    status: 'fail'
  }

  private handlePictureCardPreview(file: string) {}

  private handleDownload(file: string) {}

  private handleFileError() {
    this.$message({
      message: 'Upload failed, try again',
      type: 'error'
    })
  }

  private handleFileSuccess(
    responce: any,
    file: FileListItem,
    fileList: FileListItem[]
  ) {
    // current file context
    this.curFile = file
    // clear file list after upload
    //@ts-ignore
    this.$refs.trashUpload.clearFiles()
    this.$message({
      message: 'uploaded',
      type: 'success'
    })
  }

  private handleFileExceed(files: FileListItem, fileList: FileListItem[]) {
    this.$message({
      message: `Wating until all files are uploaded, or clear error files`,
      type: 'warning'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
