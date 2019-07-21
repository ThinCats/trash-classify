<template>
  <footer class="app-footer">
    <div></div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppFooter extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-footer {
  background-color: black;
  height: 30vh;
}
</style>
