<template>
  <div class="detect-info-item">
    <el-row type="flex" align="center">
      <el-col class="flex-col-center" :span="12">
        <el-image
          :src="imageSrc"
          :style="{ width: '30%' }"
          fit="fill"
        ></el-image>
      </el-col>
      <el-col class="flex-col-center" :span="12">
        <el-card class="flex-vertical-align text-align-center">
          <div>
            {{ trash.name }}<br />
            is type of <br />
            <em>{{ trash.type.name }} </em>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Trash, TrashExtraInfo, TrashType } from '@/types/graphql'

@Component
export default class DetectInfoItem extends Vue {
  @Prop({
    default:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  })
  private readonly imageSrc!: string
  @Prop() private readonly trash!: Trash
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info-item {
  margin-bottom: 2rem;

  .info-item-text-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
