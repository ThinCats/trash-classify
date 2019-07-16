<template>
  <div class="detect-info">
    <!-- <div class="tagged-card-head"></div> -->
    <ApolloQuery
      :query="require('../graphql/trashList.gql')"
      v-slot="{ result: { loading, error, data } }"
    >
      <div v-if="error" class="error apollo"></div>
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
        <div v-for="trash in data.trashList" :key="trash.id">
          <detect-info-item :trash="trash"></detect-info-item>
        </div>
      </div>

      <div v-else class="no-result apollo">no result</div>
    </ApolloQuery>
    <detect-rate></detect-rate>
    <detect-info-item></detect-info-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DetectRate from '@/components/DetectRate.vue'
import DetectInfoItem from '@/components/DetectInfoItem.vue'

interface TrashType {
  date: string
  name: string
  address: string
}

const today = new Date().toLocaleDateString()

@Component({
  components: {
    DetectRate,
    DetectInfoItem
  }
})
export default class TrashDetectInfo extends Vue {
  private trashRate: number = 0
  private tableData: TrashType[] = [
    {
      date: today,
      name: 'brody',
      address: 'good'
    },
    {
      date: today,
      name: 'hello',
      address: 'bank'
    }
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detect-info {
  // margin: auto;
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
