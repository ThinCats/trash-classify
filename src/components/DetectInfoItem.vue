<template>
  <div class="detect-info-item" :style="infoItemStyle">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col class="flex-col-center" :span="4">
        <el-popover
          placement="top-start"
          title="可回收垃圾"
          width="200"
          trigger="hover"
          content="要记得回收哦)"
        >
          <el-image
            slot="reference"
            :src="trashTypeImg"
            fit="fill"
            class="item-avator"
          ></el-image>
        </el-popover>
      </el-col>
      <el-col class="flex-col-center" :span="12">
        <el-card
          class="flex-vertical-align text-align-center info-item-text-card"
          shadow="hover"
        >
          <el-popover placement="left" width="200" trigger="hover">
            <article class="trash-intro">
              <h3 style="text-align: center">{{ trash.name }}</h3>
              <h4>Category</h4>
              <p>{{ trash.extraInfo.category }}</p>
              <el-divider></el-divider>
              <h4>About</h4>
              <p>
                {{ trash.extraInfo.about }}
              </p>
              <el-divider></el-divider>
              <h4>Degration</h4>
              <p>It can be degrated by {{ trash.extraInfo.degrateWay }}</p>
            </article>
            <div slot="reference">
              <div class="card-trash-name" :style="{ color: cardColor }">
                {{ trash.name }}
              </div>
              <div>is type of</div>
              <em class="card-trash-type">{{ trash.type.name }} </em>
            </div>
          </el-popover>
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
import { color2rgba } from '@/utils/utils'

@Component
export default class DetectInfoItem extends Vue {
  // the degration time and map to month, will find the ceil of i
  static percentageConfig = [
    {
      percentage: 10,
      color: '#5cb87a',
      month: 0.6
    },
    {
      percentage: 20,
      color: '#65b88a',
      month: 2
    },
    {
      percentage: 40,
      color: '#1989fa',
      month: 6
    },
    {
      percentage: 60,
      color: '#6f7ad3',
      month: 12
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
      imgUrl: require('@/assets/recy.jpg'),
      description: 'lake green',
      color: '#009688'
    },
    '2': {
      imgUrl: require('@/assets/harm.jpg'),
      description: 'pink',
      color: '#FF4081'
    },
    '3': {
      imgUrl: require('@/assets/household.jpg'),
      description: 'orange',
      color: '#FF7F00'
    },
    '4': {
      imgUrl: require('@/assets/residual.jpg'),
      description: 'light blue',
      color: '#2196F3'
    }
  }

  @Prop()
  private readonly trash!: Trash

  get cardColor() {
    //@ts-ignore
    return DetectInfoItem.trashTypeConfig[this.trash.type.id].color
  }

  get infoItemStyle() {
    return {
      borderColor: this.cardColor,
      // make it transparent
      backgroundColor: color2rgba(this.cardColor, 0.1)
    }
  }

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
.trash-intro {
  & > p {
    word-break: normal;
    text-align: left;
  }
}
.detect-info-item {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 3px solid;
  border-radius: 2rem;

  .info-item-text-card {
    width: 100%;

    .card-trash-name {
      color: #009688;
    }

    .card-trash-type {
      color: #ff5722;
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

// change card style
.detect-info-item {
  .info-item-text-card {
    &.el-card {
      border-color: transparent;
      background-color: transparent;
    }
  }
}
</style>
