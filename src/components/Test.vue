<template>
  <div>
    <detect></detect>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DetectUpload from '@/components/DetectUpload.vue'
import Detect from '@/components/Detect.vue'
import NavBar from '@/components/NavBar.vue'

@Component({
  components: {
    Detect,
    NavBar
  }
})
export default class Test extends Vue {
  private tabIndex: number = 1
}
</script>
