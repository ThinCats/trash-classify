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
      // url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg'
      url: 'http://usa.eastday.com/uploads/month_1406/20140601085253916.jpg'
    },
    {
      id: 2,
      // url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_forest.jpg'
      url:
        'http://5b0988e595225.cdn.sohucs.com/images/20180625/b9bfb95b5e26416eab74c43f3f4dec07.jpeg'
    },
    {
      id: 3,
      url:
        'https://www.jesmondfruitbarn.com.au/wp-content/uploads/2016/10/Jesmond-Fruit-Barn-Red-Delicious-Apples.jpg'
    },
    {
      id: 4,
      // url: 'http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg'
      url:
        'http://cms-bucket.nosdn.127.net/27a66e2d26474a56b29dd1ace2ad41be20180209192255.jpeg'
    }
  ]

  handleSelected(imgUrl: string) {
    eventBus.$emit('detect-demo-selected', imgUrl)
  }

  private handleClick(url: string) {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
