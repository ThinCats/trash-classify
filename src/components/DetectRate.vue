<template>
  <div>
    <el-rate
      v-model="rateValue"
      :icon-classes="iconClasses"
      void-icon-class="icon-rate-face-off"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
    >
    </el-rate>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DetectRate extends Vue {
  private iconClasses: string[] = [
    'icon-rate-face-1',
    'icon-rate-face-2',
    'icon-rate-face-3'
  ]

  private rateValue: number = 0
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
