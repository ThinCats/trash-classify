<template>
  <div class="text-align-center">
    <h3>Try With Demo Picture</h3>
    <el-carousel :interval="8000" height="200px" type="card" trigger="click">
      <el-carousel-item v-for="demoImg in demoImgList" :key="demoImg.id">
        <div class="clickable" @click="handleSelected(demoImg.url)">
          <el-image
            :src="demoImg.url"
            fit="cover"
            alt=""
            class="demo-show-img"
          ></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import eventBus from '@/components/EventBus.vue'

interface DemoImg {
  id: number
  url: string
}

@Component
export default class DetectDemoSelect extends Vue {
  private readonly demoImgList: DemoImg[] = [
    {
      id: 1,
      url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg'
    },
    {
      id: 2,
      url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_forest.jpg'
    },
    {
      id: 3,
      url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg'
    },
    {
      id: 4,
      url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg'
    }
  ]

  handleSelected(imgUrl: string) {
    eventBus.$emit('detect-demo-selected', imgUrl)
  }

  private handleClick(url: string) {
    console.log(url)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
