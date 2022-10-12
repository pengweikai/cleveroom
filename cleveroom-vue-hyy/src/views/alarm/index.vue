<template>
  <div class="mode-wrapper">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="alarmData">
          <div class="title">
            <p class="title-value">
              预警数据收集<i class="el-icon-refresh" style="cursor: pointer"
                        @click="refreshData"></i>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="alarmDataForm">
          <el-form :inline="true" :model="alarmDataForm" class="demo-form-inline">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="alarmDataForm.timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询数据</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="alarmDataTable">
          <el-table
            :data="alarmDataTable.tableData"
            :stripe="true"
            v-loading="alarmDataTable.loading"
            border
            style="width: 100%">
            <el-table-column
              prop="deviceName"
              label="预警设备">
            </el-table-column>
            <el-table-column
              prop="uid"
              label="设备编号uid">
            </el-table-column>
            <el-table-column
              prop="alarmInfo"
              label="预警信息">
            </el-table-column>
            <el-table-column
              prop="position"
              label="预警位置">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="预警时间">
            </el-table-column>
            <el-table-column
              prop="stateName"
              label="处理状态"
              width="100">
              <template slot-scope="scope">
                <div slot="reference">
                  <el-tag size="medium" v-if="scope.row.dealWith===1">
                    已处理
                  </el-tag>
                  <el-tag size="medium" type="danger" v-else>
                    未处理
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作" width="110">
              <template slot-scope="scope">
                <el-button size="mini" type="primary"
                  @click="alarmDataCheck(scope.row)" v-if="scope.row.dealWith===0">点击处理</el-button>
                <el-button size="mini" type="primary" v-else disabled>点击处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin: 10px auto"
            background
            @current-change="pageChange"
            layout="total, prev, pager, next"
            :total="alarmDataTable.pageSet.total"
            :current-page="alarmDataTable.pageSet.currentPage"
            :page-size="alarmDataTable.pageSet.pageSize">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {alarmSearch, alarmDeal} from '@/api/alarm'
export default {
  data() {
    return {
      alarmDataForm: {
        timeRange: []
      },
      alarmDataTable: {
        loading: false,
        tableData: [],
        pageSet: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    alarmSearch(page, pageSize, timeRange) {
      this.alarmDataTable.loading = true
      alarmSearch({
        page,
        pageSize,
        beginTime: timeRange[0],
        endTime: timeRange[1]
      }).then((res) => {
        let list = []
        res.data.records.map((item) => {
          list.push({
            ...item,
            deviceName: item.deviceDto.name,
            uid: item.deviceDto.uid,
            position: item.deviceDto.positionDto.regionName + '-' + item.deviceDto.positionDto.buildName + '-' +
              item.deviceDto.positionDto.floorName + '-' + item.deviceDto.positionDto.roomName
          })
        })
        this.alarmDataTable.tableData = list
        this.alarmDataTable.pageSet.total = res.data.total
        this.alarmDataTable.pageSet.currentPage = page
        this.alarmDataTable.pageSet.pageSize = pageSize
        this.alarmDataTable.loading = false
      }).catch(() => {
        this.alarmDataTable.loading = false
        this.$notify({
          title: '提示',
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    alarmDataCheck(data) {
      let param = {
        id: data.id,
        dealWith: 1
      }
      this.$confirm('是否已经处理了该设备的预警信息')
        .then(() => {
          alarmDeal(param).then(() => {
            this.refreshData()
          }).catch(() => {
            this.$notify({
              title: '提示',
              type: 'error',
              message: '操作失败'
            })
          })
        })
    },
    pageChange(item) {
      this.alarmSearch(item,
        this.alarmDataTable.pageSet.pageSize, this.alarmDataForm.timeRange)
    },
    refreshData() {
      this.alarmSearch(this.alarmDataTable.pageSet.currentPage,
        this.alarmDataTable.pageSet.pageSize, this.alarmDataForm.timeRange)
    },
    onSubmit() {
      this.alarmSearch(1, 10, this.sensorDataForm.timeRange)
    }
  },
  created() {
    this.alarmSearch(this.alarmDataTable.pageSet.currentPage,
      this.alarmDataTable.pageSet.pageSize, ['', ''])
  }
}
</script>
<style scoped lang="stylus">
.mode-wrapper {
  height: 100%;
}
.alarmData{
  .title {
    width:100%;
    background: #f2f2f2;
    padding: 15px 0;
    .title-value {
      margin-left: 4px;
      text-indent: 4px;
      color: #666;
      &:before {
        display: inline-block;
        content: '';
        width: 4px;
        height: 20px;
        background: purple;
        margin-right: 4px;
        border-radius: 4px;
        vertical-align: middle;
      }
    }
  }
}
.alarmDataForm{
  margin 33px 20px 0 20px
}
</style>
