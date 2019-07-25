<template>
  <div class="detect-image-show">
    <window-card>
      <img
        :src="imageSrc"
        alt=""
        :style="{ minWidth: '100%', maxWidth: '100%', minHeight: '200px' }"
      />
    </window-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DetectImageShow extends Vue {
  @Prop({ default: '' }) private readonly imageSrc!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
