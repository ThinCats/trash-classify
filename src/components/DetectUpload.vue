<template>
  <div class="detect-upload">
    <el-form
      ref="trashImageForm"
      :inline="true"
      :model="trashFormData"
      :rules="trashFormRules"
      :status-icon="true"
      class="flex-col-center"
    >
      <el-form-item label="Image URL " style="display: flex" prop="imgURL">
        <el-input
          v-model="trashFormData.imgURL"
          placeholder="your image url"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="medium"
          type="danger"
          :disabled="!trashFormData.imgURL"
          @click="submitTrashForm(trashFormData)"
          >Submit</el-button
        >
        <el-divider direction="vertical"></el-divider>
      </el-form-item>
      <el-form-item label="or ">
        <el-upload
          ref="trashUpload"
          class="upload-demo"
          :show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :before-upload="beforeUpload"
          :on-exceed="handleFileExceed"
          :on-success="handleFileSuccess"
          :on-error="handleFileError"
          list-type="picture"
          :auto-upload="true"
        >
          <el-button size="medium" slot="trigger" type="primary"
            >Select</el-button
          >

          <!-- <div class="el-upload__tip" slot="tip">
            只能上传图片文件
          </div> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <el-card>
      <img
        :src="curImageURL"
        alt=""
        :style="{ minWidth: '100%', maxWidth: '100%', minHeight: '200px' }"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import eventBus from '@/components/EventBus.vue'

import {
  FileListItem,
  ElUpload,
  ElUploadInternalRawFile
} from 'element-ui/types/upload'

import { ElForm } from 'element-ui/types/form'

interface TrashFormData {
  imgURL: string
}

enum UploadStatus {
  Uploading,
  Uploaded
}

@Component
export default class DetectUpload extends Vue {
  mounted() {
    eventBus.$on('detect-demo-selected', (imgUrl: string) => {
      this.submitByImgURL(imgUrl)
    })
  }

  $refs!: {
    trashUpload: ElUpload
    trashImageForm: ElForm
  }

  // selected image url, usually for demo-case usage, will be the defualt
  @Prop({ default: '' }) selectedImgURL!: string

  // trash form data
  private trashFormData: TrashFormData = {
    imgURL: this.selectedImgURL
  }

  private trashFormRules: object = {
    imgURL: [{ validator: this.validateImgURL, trigger: 'blur' }]
  }

  private curImageURL: string = this.selectedImgURL

  private validateImgURL(
    rule: object,
    value: string,
    callback: CallableFunction
  ) {
    if (!value.startsWith('http')) {
      callback(new Error('URL must start with http or https'))
    } else {
      callback()
    }
  }

  private setCurImageURL(newURL: string) {
    if (this.curImageURL) {
      // revoke object url, if created by this function
      // if not, nothing will occur
      URL.revokeObjectURL(this.curImageURL)
    }
    this.curImageURL = newURL
  }

  private uploadStatus: UploadStatus = UploadStatus.Uploading

  // set the status to uploading
  private setUploading() {}
  // set the status to uploaded
  private setUploaded() {}

  private onBtnClick() {
    this.$refs.trashUpload.fileList.push({
      name: 'a.jpg',
      url: '#'
    })
    this.$refs.trashUpload.submit()
  }

  private submitByImgURL(imgURL: string) {
    this.setUploading()
    this.setCurImageURL(imgURL)
  }

  // form submit
  private submitTrashForm(formData: TrashFormData) {
    this.$refs.trashImageForm.validate(valid => {
      if (!valid) {
        this.$message({
          message: 'Check your image url, failed to upload',
          type: 'error'
        })
        return false
      } else {
        this.$message({
          message: 'Submitted!',
          type: 'success'
        })
        return true
      }
    })
    this.submitByImgURL(formData.imgURL)
  }

  private handleFileError() {
    this.$message({
      message: 'File error, failed to upload',
      type: 'error'
    })
  }

  private handleFileSuccess(
    responce: any,
    file: FileListItem,
    fileList: FileListItem[]
  ) {
    // clear file list after upload
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

  private beforeUpload(file: ElUploadInternalRawFile) {
    this.setUploading()
    this.setCurImageURL(URL.createObjectURL(file))
    return true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
