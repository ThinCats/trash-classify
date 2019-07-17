import Vue from 'vue'
import ECharts from 'vue-echarts'

// use by need, must import
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'

Vue.component('v-chart', ECharts)
