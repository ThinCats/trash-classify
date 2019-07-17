<template>
  <div class="web-cam">
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="11" class="flex-col-center">
        <el-card class="always-max-width">
          <web-cam
            ref="webcam"
            height="100%"
            width="100%"
            :device-id="deviceId"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
        </el-card>
      </el-col>
      <el-col :span="11" class="flex-col-center">
        <el-card class="always-max-width">
          <img :src="img" alt="" style="max-width: 100%" />
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10" type="flex" justify="center">
      <el-button type="info" @click="onStart">Start</el-button>
      <el-button type="success" @click="onStop">Stop</el-button>
      <el-button type="primary" @click="onCapture">Capture</el-button>
      <el-button type="danger" @click="onTakeThis">Take This!</el-button>
      <el-button type="info" @click="onCloseMe">Close</el-button>
    </el-row>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'
export default {
  name: 'App',
  components: {
    WebCam
  },
  beforeDestroy: function() {
    this.$refs.webcam.stop()
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    }
  },
  props: {
    // use for father component to start the camera
    // like autostart the camera if set true
    startCameraFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    },
    startCameraFlag: function() {
      // if set true, then start the camera
      if (this.startCameraFlag === true) {
        this.onStart()
      }
    }
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture()
      console.log(this.img)
    },
    onStarted(stream) {
      console.log('On Started Event', stream)
    },
    onStopped(stream) {
      console.log('On Stopped Event', stream)
    },
    onStop() {
      this.$refs.webcam.stop()
    },
    onStart() {
      this.$refs.webcam.start()
    },
    onError(error) {
      console.log('On Error Event', error)
    },
    onCameras(cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    },
    onTakeThis() {
      this.$emit('captured-image', this.img)
      this.onStop()
    },
    onCloseMe() {
      this.onStop()
      this.$emit('close-me')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.web-cam {
  width: 100%;
}

.always-max-width {
  min-width: 100%;
}
</style>
