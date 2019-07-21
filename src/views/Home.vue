<template>
  <div class="home">
    <home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/components/Home.vue' // @ is an alias to /src

@Component({
  components: {
    Home
  }
})
export default class HomeView extends Vue {}
</script>
