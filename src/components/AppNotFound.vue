<template>
  <div class="app-not-found">
    <svg
      class="not-found-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 0C229.688 0 0 229.688 0 512s229.688 512 512 512 512-229.688 512-512S794.312 0 512 0z m0 944C273.813 944 80 750.188 80 512S273.813 80 512 80s432 193.812 432 432-193.812 432-432 432z"
        fill=""
      />
      <path
        d="M805.312 321.375c-12.5-12.5-32.75-12.5-45.25 0l-49.375 49.375-49.375-49.375c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L665.438 416l-49.375 49.375c-12.5 12.5-12.5 32.75 0 45.25 6.25 6.25 14.438 9.375 22.625 9.375s16.375-3.125 22.625-9.375l49.375-49.375 49.375 49.375c6.25 6.25 14.438 9.375 22.625 9.375s16.375-3.125 22.625-9.375c12.5-12.5 12.5-32.75 0-45.25L755.938 416l49.375-49.375c12.499-12.5 12.499-32.75-0.001-45.25zM263.625 510.625L313 461.25l49.375 49.375c6.25 6.25 14.438 9.375 22.625 9.375s16.375-3.125 22.625-9.375c12.5-12.5 12.5-32.75 0-45.25L358.25 416l49.375-49.375c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L313 370.75l-49.375-49.375c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L267.75 416l-49.375 49.375c-12.5 12.5-12.5 32.75 0 45.25 6.25 6.25 14.438 9.375 22.625 9.375s16.375-3.125 22.625-9.375zM748.875 642.625l-55.938 24.312L628 615c-10.875-8.625-26.188-9.438-37.75-1.625L512 665.562l-78.25-52.188c-11.562-7.75-26.875-7.125-37.75 1.625l-64.938 51.938-55.938-24.312C259 635.812 240.063 643 233 659.25c-7 16.188 0.438 35.062 16.625 42.125l73.625 32c10.875 4.688 23.438 3.062 32.75-4.375l61.688-49.375 76.562 51a32.151 32.151 0 0 0 35.5 0l76.562-51L668 729a32.083 32.083 0 0 0 20 7c4.312 0 8.688-0.875 12.75-2.625l73.625-32C790.562 694.312 798 675.438 791 659.25c-7.062-16.25-26.125-23.438-42.125-16.625z"
        fill=""
      />
    </svg>
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppNotFound extends Vue {
  @Prop({ default: "Sorry we can't find" }) private readonly content!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-not-found {
  // vertical align
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .not-found-icon {
    height: 40%;
    fill: #bbb;
  }

  > p {
    font-style: italic;
    color: #bbb;
  }
}
</style>
