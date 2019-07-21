<template>
  <div class="detect-info-charts">
    <window-card
      title="Result Of the Object Detection"
      :bodyStyle="{ height: '320px' }"
      icon="el-icon-data-line"
    >
      <!-- Only render the component if has result, to avoid e-charts failed -->
      <v-chart
        v-if="dataShowList.length > 0"
        class="score-charts"
        :options="options"
        autoresize
      ></v-chart>
    </window-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

interface ShowDataType {
  keyword: string
  score: number
  root: string
}

interface IndicatorType {
  name: string
  max: number
}

@Component
export default class DetectInfoCharts extends Vue {
  @Prop({ default: () => [] }) dataShowList!: ShowDataType[]

  get radarIndicator() {
    // find max value
    let maxVal = 0
    this.dataShowList.forEach(value => {
      if (value.score > maxVal) {
        maxVal = value.score
      }
    })
    return this.dataShowList.map(value => {
      return {
        name: value.keyword.substring(0, 5),
        // name: value.keyword,
        max: maxVal
      }
    })
  }

  get radarSeriesValue() {
    return this.dataShowList.map(value => {
      return value.score
    })
  }

  @Watch('dataShowList')
  watchDataShowList() {
    // !! TODO: Fix this ugly code (maybe use watch or regenerate options?)
    this.options.radar.indicator = this.radarIndicator
    this.options.series[0].data[0].value = this.radarSeriesValue
  }

  private options = {
    title: {
      text: 'Detected Objects'
    },
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['keyword', 'score', 'root'],
      source: this.dataShowList
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
    },
    // xAxis: { type: 'value', name: 'score' },
    // yAxis: { type: 'category', name: 'object' },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          fontSize: '16',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: this.radarIndicator,
      radius: 80
    },
    series: [
      // radar
      {
        color: ['#008080'],
        type: 'radar',
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [
          {
            value: this.radarSeriesValue,
            name: 'Trash'
          }
        ]
      }
    ]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info-charts {
  width: 100%;
  height: 100%;

  h3 {
    margin: 0;
    text-align: center;
  }
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
