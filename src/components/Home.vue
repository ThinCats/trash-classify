<template>
  <div>
    <detect></detect>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Detect from '@/components/Detect.vue'

@Component({
  components: {
    Detect
  }
})
export default class Home extends Vue {}
</script>
