<template>
  <div class="detect-info">
    <!-- <div class="tagged-card-head"></div> -->
    <detect-info-charts :dataShowList="detectedObjectList"></detect-info-charts>
    <ApolloQuery
      :query="require('../graphql/trashList.gql')"
      :variables="{ trashQueryList }"
      v-slot="{ result: { loading, error, data } }"
    >
      <div v-if="error" class="error apollo">
        {{ errorMsg }}
      </div>
      <div v-else-if="data" v-loading="loading" class="result apollo">
        <!-- el-table :data="[data.randomTrash]" style="width: 100%">
          <el-table-column prop="name" label="Trash" :width="180">
          </el-table-column>
          <el-table-column prop="type" label="Type" :width="120">
          </el-table-column>
          <el-table-column label="rate">
            <el-rate v-model="trashRate"></el-rate>
          </el-table-column>
        </el-table>
        <br />
        <el-card>
          <div class="trash-info-tips">
            Please save the world
            <i class="el-icon-delete"></i> <br />
            the trash
            <em class="tips-trash-name">{{ data.randomTrash.name }}</em> will be
            degrated in
            <br />
            <span class="tips-time">
              {{ data.randomTrash.extraInfo.degration.degrateTime }} seconds
            </span>
            <i class="el-icon-s-flag"></i>
          </div>
        </el-card -->
        <el-divider></el-divider>
        <div v-for="trash in filterTrashList(data.trashList)" :key="trash.id">
          <detect-info-item
            :trash="trash"
            :cardColor="getItemCardColor()"
          ></detect-info-item>
        </div>
      </div>

      <div v-else class="no-result apollo">no result</div>
    </ApolloQuery>
    <detect-rate></detect-rate>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DetectRate from '@/components/DetectRate.vue'
import DetectInfoItem from '@/components/DetectInfoItem.vue'
import DetectInfoCharts from '@/components/DetectInfoCharts.vue'

import * as utils from '@/utils/utils'
import { isThis } from '@/types/Errors'
import { ApolloError } from 'apollo-client'

import { Trash, TrashType, TrashExtraInfo } from '@/types/graphql'
const today = new Date().toLocaleDateString()

interface DetectedObject {
  keyword: string
  root: string
  score: number
}

@Component({
  components: {
    DetectRate,
    DetectInfoItem,
    DetectInfoCharts
  }
})
export default class TrashDetectInfo extends Vue {
  // contain the result of object detection
  // use to pass to children display components
  // and use {keyword, root} to query database
  @Prop({ default: () => [] }) detectedObjectList!: DetectedObject[]

  static itemPalette = [
    {
      description: 'pink',
      color: '#FF4081'
    },
    {
      description: 'orange',
      color: 'orange'
    },
    {
      description: 'lake green',
      color: '#009688'
    },
    {
      description: 'light blue',
      color: '#2196F3'
    }
  ]

  private getItemCardColor(): string {
    return this.$_.sample(TrashDetectInfo.itemPalette)!.color
  }

  get trashQueryList() {
    // score threadhold, only query those score > 0.05
    const threadhold = 0.05
    return this.detectedObjectList
      .filter(value => value.score > threadhold)
      .map(value => {
        return {
          keyword: value.keyword,
          root: value.root
        }
      })
  }

  private filterTrashList(trashList: Trash[]) {
    return utils.uniqueObjArray(trashList, 'id')
  }

  private trashRate: number = 0
  private trashList: Trash[] = []

  private errorMsg: string = ''
  private handleError(error: ApolloError) {
    isThis(error).TrashNotFoundError(() => {
      let msg = error.message.replace(/.*?: /, '')
      this.$message({
        type: 'success',
        message: msg
      })
    })
  }
}
</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info {
  // margin: auto;
  // always full
  width: 100%;
}

.trash-info-tips {
  text-align: center;

  .tips-time {
    color: palevioletred;
  }
  .tips-trash-name {
    color: red;
  }
}

.tagged-card-head {
  position: relative;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  background-color: #fff;
}
</style>
