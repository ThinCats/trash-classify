<template>
  <div class="detect-info-item" :style="infoItemStyle">
    <div class="item-pic flex-col-center">
      <el-popover
        placement="top-start"
        :title="trash.type.name"
        width="200"
        trigger="hover"
        :content="trashConfig.tip"
      >
        <el-image
          slot="reference"
          :src="trashConfig.imgUrl"
          fit="fill"
          class="item-avator"
        ></el-image>
      </el-popover>
    </div>
    <div class="item-text flex-col-center">
      <el-card
        class="flex-vertical-align text-align-center info-item-text-card"
        shadow="hover"
      >
        <el-popover placement="right" width="200" trigger="hover">
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
            <div class="card-trash-name" :style="{ color: trashConfig.color }">
              {{ trash.name }}
            </div>
            <div>is</div>
            <em class="card-trash-type">{{ trash.type.name }} </em>
          </div>
        </el-popover>
      </el-card>
    </div>
    <div class="item-progress">
      <el-progress
        type="circle"
        class="info-item-time-progress"
        :percentage="timePercentage"
        :format="timeFormat"
        :color="timePercentageColors"
        :width="100"
      ></el-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Trash, TrashExtraInfo, TrashType } from '@/types/graphql'
import { color2rgba } from '@/utils/utils'

interface TrashTypeConfig {
  imgUrl: string
  description: string
  color: string
  tip: string
}

@Component
export default class DetectInfoItem extends Vue {
  // the degration time and map to month, will find the ceil of i
  static percentageConfig = [
    {
      percentage: 5,
      color: '#5cb87a',
      month: 0.3
    },
    {
      percentage: 10,
      color: '#5cb87a',
      month: 0.6
    },
    {
      percentage: 15,
      color: '#65b88a',
      month: 3
    },
    {
      percentage: 20,
      color: '#65b88a',
      month: 6
    },
    {
      percentage: 25,
      color: '#1989fa',
      month: 12
    },
    {
      percentage: 40,
      color: '#1989fa',
      month: 110
    },
    {
      percentage: 60,
      color: '#6f7ad3',
      month: 470
    },
    {
      percentage: 80,
      color: '#e6a23c',
      month: 1200
    },
    {
      percentage: 100,
      color: '#f56c6c',
      month: 2400
    }
  ]

  static trashTypeConfigs: Record<string, TrashTypeConfig> = {
    '1': {
      imgUrl: require('@/assets/recy.jpg'),
      description: 'lake green',
      color: '#009688',
      tip: 'If you sell it, you can buy a pig. ヽ(✿ﾟ▽ﾟ)ノ'
    },
    '2': {
      imgUrl: require('@/assets/harm.jpg'),
      description: 'pink',
      color: '#FF4081',
      tip: 'Unfortunately, pigs will die if they eat. Σ( ° △ °|||)︴'
    },
    '3': {
      imgUrl: require('@/assets/household.jpg'),
      description: 'orange',
      color: '#FF7F00',
      tip: 'The more pigs eat, the fatter they become. ︿(￣︶￣)︿'
    },
    '4': {
      imgUrl: require('@/assets/residual.jpg'),
      description: 'light blue',
      color: '#2196F3',
      tip: "Pigs won't eat them... (￣_,￣ )"
    }
  }

  @Prop()
  private readonly trash!: Trash

  get trashConfig() {
    //@ts-ignore
    return DetectInfoItem.trashTypeConfigs[this.trash.type.id]
  }
  get infoItemStyle() {
    return {
      borderColor: this.trashConfig.color,
      // make it transparent
      backgroundColor: color2rgba(this.trashConfig.color, 0.1)
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

  display: flex;
  justify-content: space-around;
  // flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: $size-xs) {
    flex-wrap: wrap;
  }

  .item-pic {
    flex-basis: 1;
  }

  .item-text {
    flex-basis: 2;
  }

  .item-progress {
    flex-basis: 1;
  }

  .see-more {
    font-style: italic;
  }

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
    // width: 100%;
    // height: 100%;
    max-width: 5rem;
    min-width: 4rem;
    border-radius: 1rem;
    // border-radius: 50%;
  }
}
</style>

<style lang="scss">
$max-progress-size: 480px;
.info-item-time-progress {
  &.el-progress--circle {
    & > .el-progress__text {
      font-size: 0.6rem;
      width: 80%;
      padding: 0.625rem;
    }
  }

  @media screen and (max-width: $max-progress-size) {
    @include vue-hidden();
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
