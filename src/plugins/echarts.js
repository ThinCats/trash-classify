import Vue from 'vue'
import ECharts from 'vue-echarts'

// use by need, must import
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

Vue.component('v-chart', ECharts)
