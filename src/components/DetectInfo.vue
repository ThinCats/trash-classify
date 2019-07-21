<template>
  <div class="detect-info">
    <!-- <div class="tagged-card-head"></div> -->
    <div class="trash-info-list">
      <window-card title="The List Of the Trash">
        <div class="info-list-card-body">
          <ApolloQuery
            :query="require('../graphql/trashList.gql')"
            :variables="{ trashQueryList }"
            v-slot="{ result: { loading, error, data } }"
            @result="handleRecieveResult"
          >
            <div v-if="error" class="error apollo">
              {{ errorMsg }}
            </div>
            <div v-else-if="data" v-loading="loading" class="result apollo">
              <div v-for="trash in pagedTrashList" :key="trash.id">
                <detect-info-item :trash="trash"></detect-info-item>
              </div>
            </div>
            <div v-else class="no-result apollo">no result</div>
          </ApolloQuery>
          <div class="flex-col-center info-list-page">
            <el-pagination
              :hide-on-single-page="false"
              :total="uniqueTrashList.length"
              :page-size="pageSize"
              :current-page.sync="curPage"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </div>
      </window-card>
    </div>
    <div class="detect-info-foot top-with-margin">
      <detect-info-charts
        :dataShowList="detectedObjectList"
      ></detect-info-charts>
    </div>
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

  // filter to the unique one
  get uniqueTrashList() {
    return utils.uniqueObjArray(this.trashList, 'id')
  }

  get pagedTrashList() {
    let sliceStart = this.pageSize * (this.curPage - 1)
    return this.uniqueTrashList.slice(sliceStart, sliceStart + this.pageSize)
  }

  private handleRecieveResult(result: any) {
    this.curPage = 1
    this.trashList = result.data.trashList
  }

  private trashRate: number = 0
  // use to store the temp result, and check whether is the same one
  private trashList: Trash[] = []
  // use for pagination
  private curPage = 1
  private pageSize = 3

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

//
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info {
  // margin: auto;
  // always full
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .detect-info-foot {
    width: 100%;
  }

  .trash-info-list {
    flex-grow: 1;
  }
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

.info-list-card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;

  .info-list-page {
    color: inherit;
    // margin-bottom: 4rem;
  }
}
</style>
