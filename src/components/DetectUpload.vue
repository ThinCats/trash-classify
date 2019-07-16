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
          :show-file-list="false"
          action="#"
          :limit="1"
          accept="image/png,image/bmp,image/jpg,image/jpeg"
          :before-upload="beforeUpload"
          :on-exceed="handleFileExceed"
          :on-success="handleFileSuccess"
          :on-error="handleFileError"
          :http-request="uploadElFile"
          list-type="picture"
          :auto-upload="true"
        >
          <el-button size="medium" slot="trigger" type="primary"
            >Select</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label=" | ">
        <detect-upload-webcam
          @captured-image="submitBase64Data"
        ></detect-upload-webcam>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import eventBus from '@/components/EventBus.vue'

import {
  FileListItem,
  ElUpload,
  ElUploadInternalRawFile,
  HttpRequestOptions
} from 'element-ui/types/upload'

import { ElForm } from 'element-ui/types/form'
import DetectUploadWebcam from '@/components/DetectUploadWebcam.vue'

import * as utils from '@/utils/utils'

interface TrashFormData {
  imgURL: string
}

enum TrashFormDataType {
  FILE,
  URL
}

enum UploadStatus {
  Uploading,
  Uploaded
}

@Component({
  components: {
    DetectUploadWebcam
  }
})
export default class DetectUpload extends Vue {
  $refs!: {
    trashUpload: ElUpload
    trashImageForm: ElForm
  }
  mounted() {
    eventBus.$on('detect-demo-selected', (imgURL: string) => {
      this.submitByImgURL(imgURL)
    })
  }
  @Emit('upload-new-image')
  private handleUploadNewImage(imageUrl: string) {}

  // trash form data
  private trashFormData: TrashFormData = {
    imgURL: ''
    // type: TrashFormDataType.URL
  }

  private trashFormRules: object = {
    imgURL: [{ validator: this.validateImgURL, trigger: 'blur' }]
  }

  private curImageURL: string = ''

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

  private submitByImgURL(imgURL: string) {
    this.setUploading()
    this.setCurImageURL(imgURL)
    this.handleUploadNewImage(imgURL)
    this.uploadByURL(imgURL)
  }

  async uploadElFile(option: HttpRequestOptions) {
    console.log(option.file)
    //@ts-ignore
    return this.uploadByFile(option.file)
  }

  /**
   * @param {File} image - graphql's param, if set imgURL, file should be null
   */
  private uploadByFile(image: File) {
    this.$apollo
      .mutate({
        mutation: require('../graphql/uploadImageByFile.gql'),
        variables: {
          image
        },
        context: {
          hasUpload: true
        }
      })
      .then((response: any) => {
        this.handleRecieveUploadResponse(response.data.uploadImageByFile)
      })
      .catch((err: any) => console.log(err))
  }

  /**
   * @param {UploadImageResponse} response - get from mutaion, send to father
   */
  @Emit('recieve-upload-response')
  private handleRecieveUploadResponse(response: any) {}

  /**
   * @param {imgURL} imgURL - imgURL to send
   */
  private uploadByURL(imgURL: string) {
    this.$apollo
      .mutate({
        mutation: require('../graphql/uploadImageByURL.gql'),
        variables: {
          imgURL
        }
      })
      .then((response: any) => {
        this.handleRecieveUploadResponse(response.data.uploadImageByURL)
      })
      .catch((err: any) => console.log(err))
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

  private submitBase64Data(imgBase64URL: string) {
    this.setUploading()
    this.setCurImageURL(imgBase64URL)
    this.handleUploadNewImage(imgBase64URL)
    utils.base64ToBlob(imgBase64URL).then(blob => {
      console.log('Blob: ', blob)
      let file = new File([blob], 'spanshot.jpg', { lastModified: Date.now() })
      this.uploadByFile(file)
    })
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
    let imgURL = URL.createObjectURL(file)
    this.setUploading()
    this.setCurImageURL(imgURL)
    this.handleUploadNewImage(imgURL)
    return true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
