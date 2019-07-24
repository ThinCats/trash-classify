<template>
  <div class="detect-upload">
    <el-form
      ref="trashImageForm"
      :model="trashFormData"
      :rules="trashFormRules"
      :status-icon="true"
    >
      <el-form-item label="Image URL " style="display: flex" prop="imgURL">
        <el-input
          v-model="trashFormData.imgURL"
          placeholder="your image url"
        ></el-input>
      </el-form-item>
      <el-form-item label="| ">
        <el-button
          size="medium"
          type="danger"
          :disabled="!trashFormData.imgURL"
          @click="submitTrashForm(trashFormData)"
          >Submit <i class="el-icon-upload"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="| ">
        <el-divider></el-divider>
        <el-upload
          ref="trashUpload"
          :show-file-list="false"
          action="#"
          :limit="1"
          accept="image/*"
          :before-upload="beforeUpload"
          :on-exceed="handleFileExceed"
          :on-success="handleFileSuccess"
          :on-error="handleFileError"
          :http-request="uploadElFile"
          list-type="picture"
          :auto-upload="true"
        >
          <el-button size="medium" slot="trigger" type="primary"
            >Select <i class="el-icon-picture"></i>
          </el-button>
        </el-upload>
      </el-form-item>
      <!-- disable when is small screen -->
      <el-form-item label="| " class="hidden-sm-and-down">
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
import * as Errors from '@/types/Errors'
import { ApolloError } from 'apollo-client'

import {
  FileListItem,
  ElUpload,
  ElUploadInternalRawFile,
  HttpRequestOptions
} from 'element-ui/types/upload'

import { ElForm } from 'element-ui/types/form'
import DetectUploadWebcam from '@/components/DetectUploadWebcam.vue'

import * as utils from '@/utils/utils'
import Compressor from 'compressorjs'

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
      this.submitByUrlOrBase64(imgURL)
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
    if (
      !(value.startsWith('http') || value.startsWith('data:image/jpeg;base64'))
    ) {
      callback(new Error('URL must start with http(s) or data:'))
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

  async uploadElFile(option: HttpRequestOptions) {
    //@ts-ignore
    return this.uploadByFile(option.file)
  }

  /**
   * @param {File} image - graphql's param, if set imgURL, file should be null
   */
  private uploadByFile = this.$_.debounce(
    (image: File) => this._uploadByFile(image),
    1000
  )
  private _uploadByFile(image: File) {
    return this.$apollo
      .mutate({
        mutation: require('@/graphql/uploadImageByFile.gql'),
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
      .catch(this.handleApolloError)
  }

  private async compressImage(image: File): Promise<File> {
    //@ts-ignore
    return new Promise((resolve, reject) => {
      new Compressor(image, {
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        mimeType: 'image/jpeg',
        checkOrientation: false,
        success(result) {
          resolve(result)
        },
        error(err) {
          reject(err)
        }
      })
    }).catch(err => {
      console.log(err)
      throw err
    })
  }

  /**
   * @param {UploadImageResponse} response - get from mutaion, send to father
   */
  @Emit('recieve-upload-response')
  private handleRecieveUploadResponse(response: any) {}

  /**
   * @param {imgURL} imgURL - imgURL to send
   */

  private uploadByURL = this.$_.debounce(
    imgURL => this._uploadByURL(imgURL),
    1000
  )

  private _uploadByURL(imgURL: string) {
    this.$apollo
      .mutate({
        mutation: require('@/graphql/uploadImageByURL.gql'),
        variables: {
          imgURL
        }
      })
      .then((response: any) => {
        this.handleRecieveUploadResponse(response.data.uploadImageByURL)
      })
      .catch(this.handleApolloError)
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
    this.submitByUrlOrBase64(formData.imgURL)
  }

  private submitBase64Data(imgBase64URL: string) {
    this.setUploading()
    this.setCurImageURL(imgBase64URL)
    this.handleUploadNewImage(imgBase64URL)
    utils
      .base64ToBlob(imgBase64URL)
      .then(blob => {
        // let file = new File([blob], 'spanshot.jpg', { lastModified: Date.now() })
        // !! Warning: no hardcoded here
        let type = 'image/jpeg'
        if (blob.type && blob.type.startsWith('image')) {
          type = blob.type
        }
        return utils.blobToFile(blob, type)
      })
      .then(this.compressImage)
      .then(this.uploadByFile)
  }

  private submitByImgURL(imgURL: string) {
    this.setUploading()
    this.setCurImageURL(imgURL)
    this.handleUploadNewImage(imgURL)
    this.uploadByURL(imgURL)
  }

  private submitByUrlOrBase64(url: string) {
    // normal image url
    if (url.startsWith('http')) {
      this.submitByImgURL(url)
    } else {
      // base64
      this.submitBase64Data(url)
    }
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
    this.compressImage(file).then(image => {
      let imgURL = URL.createObjectURL(file)
      this.setUploading()
      this.setCurImageURL(imgURL)
      this.handleUploadNewImage(imgURL)
    })

    return true
  }

  private handleApolloError(error: ApolloError) {
    let errMesFn = () => {
      this.$message({
        type: 'error',
        // delete GPAPHQLError: ...
        message: error.message
      })
    }
    Errors.isThis(error)
      .ImageClassifyAPILimitedError(errMesFn)
      .UploadImageTypeError(errMesFn)
      .UploadImageSizeError(errMesFn)
      .UploadImageURLError(errMesFn)
      .ImageClassifyAPIError(errMesFn)
      .CodeLessError(errMesFn)
      .handle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<style lang="scss">
.detect-upload {
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.5);
  }

  & > form.el-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    & > div.el-form-item {
      margin-left: 0.5em;
      // the content
      & > div.el-form-item__content {
        display: flex;
        flex-direction: row;
      }
      // first child should not have label if screen is small
      &:nth-child(1) {
        & > label {
          @media screen and (max-width: $size-sm) {
            @include vue-hidden();
          }
        }
      }
    }
  }
}
</style>
