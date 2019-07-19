<template>
  <div class="detect-info-item" :style="{ 'border-color': cardColor }">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col class="flex-col-center" :span="4">
        <el-image :src="trashTypeImg" fit="fill" class="item-avator"></el-image>
      </el-col>
      <el-col class="flex-col-center" :span="12">
        <el-card
          class="flex-vertical-align text-align-center info-item-text-card"
        >
          <div>
            <span class="card-trash-name">{{ trash.name }}<br /></span>
            <span>is type of <br /></span>
            <em class="card-trash-type">{{ trash.type.name }} </em>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-progress
          type="circle"
          class="info-item-time-progress"
          :percentage="timePercentage"
          :format="timeFormat"
          :color="timePercentageColors"
          :width="100"
        ></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Trash, TrashExtraInfo, TrashType } from '@/types/graphql'

@Component
export default class DetectInfoItem extends Vue {
  // the degration time and map to month, will find the ceil of i
  static percentageConfig = [
    {
      percentage: 20,
      color: '#5cb87a',
      month: 12
    },
    {
      percentage: 40,
      color: '#1989fa',
      month: 60
    },
    {
      percentage: 60,
      color: '#6f7ad3',
      month: 120
    },
    {
      percentage: 80,
      color: '#e6a23c',
      month: 600
    },
    {
      percentage: 100,
      color: '#f56c6c',
      month: 1200
    }
  ]

  static trashTypeConfig = {
    '1': {
      imgUrl: require('@/assets/recy.jpg')
    },
    '2': {
      imgUrl: require('@/assets/harm.jpg')
    },
    '3': {
      imgUrl: require('@/assets/household.jpg')
    },
    '4': {
      imgUrl: require('@/assets/residual.jpg')
    }
  }

  @Prop({
    default: 'orange'
  })
  private readonly cardColor!: string

  @Prop()
  private readonly trash!: Trash

  get timePercentage() {
    const degrateTime = this.trash.extraInfo.degrateTime
    if (degrateTime === 0) return 100

    const percentageConfig = DetectInfoItem.percentageConfig

    let config = this.$_.find(percentageConfig, config => {
      return degrateTime < config.month
    })

    // TODO: Not directly minus one
    return (config && config!.percentage - 1) || 100
  }

  get timePercentageColors() {
    return DetectInfoItem.percentageConfig
  }

  private timeFormat(percentage: number) {
    return `Remained ~
    ${this.trash.extraInfo.degrateTime}
    months`
  }

  get trashTypeImg() {
    //@ts-ignore
    let config = DetectInfoItem.trashTypeConfig[this.trash.type.id]
    return config.imgUrl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info-item {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 5px solid;
  border-radius: 2rem;

  .info-item-text-card {
    width: 100%;

    .card-trash-name {
      color: #009688;
    }

    .card-trash-type {
      color: #FF5722;
    }
  }

  .item-avator {
    width: 5rem;
    height: 5rem;
    // border-radius: 50%;
  }
}
</style>

<style lang="scss">
.info-item-time-progress {
  .el-progress__text {
    width: 5rem;
    padding: 0.625rem;
  }
}
</style>
