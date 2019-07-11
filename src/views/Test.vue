<template>
  <div class="test">
    <test />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Test from '@/components/Test.vue' // @ is an alias to /src

@Component({
  components: {
    Test
  }
})
export default class TestView extends Vue {}
</script>
