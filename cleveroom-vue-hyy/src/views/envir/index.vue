<template>
  <div class="mode-wrapper">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="sensorData">
          <div class="title">
            <p class="title-value">
              传感器数据监测<i class="el-icon-refresh" style="cursor: pointer"
                        @click="refreshData"></i>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="sensorDataForm">
          <el-form :inline="true" :model="sensorDataForm" class="demo-form-inline">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="sensorDataForm.timeRange"
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
        <div class="sensorDataTable">
          <el-table
            :data="sensorDataTable.tableData"
            :stripe="true"
            v-loading="sensorDataTable.loading"
            border
            style="width: 100%">
            <el-table-column
              prop="position"
              label="监测位置">
            </el-table-column>
            <el-table-column
              prop="sensorName"
              label="传感器名">
            </el-table-column>
            <el-table-column
              prop="uid"
              label="传感器编号(uid)">
            </el-table-column>
            <el-table-column
              prop="testState"
              label="监测状态">
            </el-table-column>
            <el-table-column
              prop="state"
              label="在线状态"
              align="center"
              width="100">
              <template slot-scope="scope">
                <div>
                  <el-tag size="medium" v-if="scope.row.state===1 ">
                    在线
                  </el-tag>
                  <el-tag size="medium" type="danger" v-else>
                    离线
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="dataAndUnit"
              label="监测数据">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作" width="90">
              <template slot-scope="scope">
                <el-link type="primary" @click="sensorDataCheck(scope.row)">详细数据</el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin: 10px auto"
            background
            @current-change="pageChange"
            layout="total, prev, pager, next"
            :total="sensorDataTable.pageSet.total"
            :current-page="sensorDataTable.pageSet.currentPage"
            :page-size="sensorDataTable.pageSet.pageSize">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="checkDialog.title"
      :visible.sync="checkDialog.visible"
      width="60%">
      <div>
        <el-descriptions border :column="2">
          <el-descriptions-item label="传感器名">{{ checkDialog.sensorData.sensorName }}</el-descriptions-item>
          <el-descriptions-item label="传感器编号">{{ checkDialog.sensorData.uid }}</el-descriptions-item>
          <el-descriptions-item label="传感器code">{{ checkDialog.sensorData.sensorCode }}</el-descriptions-item>
          <el-descriptions-item label="传感器状态">
            {{ checkDialog.sensorData.state===1?'在线':'离线' }}</el-descriptions-item>
          <el-descriptions-item label="监测状态">{{ checkDialog.sensorData.testState }}</el-descriptions-item>
          <el-descriptions-item label="监测位置">
            {{ checkDialog.sensorData.positionDto.regionName+'-'+checkDialog.sensorData.positionDto.buildName+'-'
            +checkDialog.sensorData.positionDto.floorName+'-'+checkDialog.sensorData.positionDto.roomName}}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">监测数据详情</el-divider>
        <el-table
          :data="checkDialog.table.data"
          :stripe="true"
          v-loading="checkDialog.table.loading"
          border
          style="width: 100%"
          height="200">
          <el-table-column
            prop="testState"
            label="监测状态">
          </el-table-column>
          <el-table-column
            prop="sensorData"
            label="监测数据">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间">
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 10px auto"
          background
          @current-change="checkDialogPageChange"
          layout="total, prev, pager, next"
          :total="checkDialog.table.pageSet.total"
          :current-page="checkDialog.table.pageSet.currentPage"
          :page-size="checkDialog.table.pageSet.pageSize">
        </el-pagination>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="checkDialog.visible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {sensorDataSearch} from '@/api/envir'
export default {
  data() {
    return {
      sensorDataForm: {
        timeRange: []
      },
      checkDialog: {
        title: '传感器详细数据',
        visible: false,
        sensorData: {
          positionDto: {}
        },
        table: {
          data: [],
          pageSet: {
            currentPage: 1,
            pageSize: 5,
            total: 0
          },
          loading: false
        }
      },
      sensorDataTable: {
        loading: false,
        tableData: [],
        pageSet: {
          total: 0,
          currentPage: 1,
          pageSize: 10
        }
      }
    }
  },
  methods: {
    sensorDataSearch(page, pageSize, timeRange) {
      this.sensorDataTable.loading = true
      sensorDataSearch({
        page,
        pageSize,
        beginTime: timeRange[0],
        endTime: timeRange[1]
      }).then((res) => {
        let list = []
        res.data.records.map((item) => {
          list.push({
            ...item,
            dataAndUnit: item.data + item.unit,
            position: item.positionDto.regionName + '-' + item.positionDto.buildName + '-' +
            item.positionDto.floorName + '-' + item.positionDto.roomName
          })
        })
        this.sensorDataTable.tableData = list
        this.sensorDataTable.pageSet.total = res.data.total
        this.sensorDataTable.pageSet.currentPage = page
        this.sensorDataTable.pageSet.pageSize = pageSize
        this.sensorDataTable.loading = false
      }).catch(() => {
        this.sensorDataTable.loading = false
        this.$notify({
          title: '提示',
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    refreshData() {
      this.sensorDataSearch(this.sensorDataTable.pageSet.currentPage,
        this.sensorDataTable.pageSet.pageSize, this.sensorDataForm.timeRange)
    },
    pageChange(item) {
      this.sensorDataSearch(item,
        this.sensorDataTable.pageSet.pageSize, this.sensorDataForm.timeRange)
    },
    onSubmit() {
      console.log('----时间范围----')
      console.log(this.sensorDataForm.timeRange)
      this.sensorDataSearch(1, 10, this.sensorDataForm.timeRange)
    },
    sensorDataSearchByUid(page, pageSize, uid) {
      sensorDataSearch({
        page,
        pageSize,
        uid
      }).then((res) => {
        let list = []
        res.data.records.map((item) => {
          list.push({
            testState: item.testState,
            sensorData: item.data + item.unit,
            updateTime: item.updateTime
          })
        })
        this.checkDialog.table.data = list
        this.checkDialog.table.pageSet.total = res.data.total
        this.checkDialog.table.pageSet.currentPage = page
        this.checkDialog.table.pageSet.pageSize = pageSize
      })
    },
    sensorDataCheck(data) {
      this.checkDialog.visible = true
      this.checkDialog.title = '传感器' + data.uid + '监测数据'
      this.checkDialog.sensorData = data
      this.sensorDataSearchByUid(this.checkDialog.table.pageSet.currentPage,
        this.checkDialog.table.pageSet.pageSize,
        data.uid)
    },
    checkDialogPageChange(item) {
      this.sensorDataSearchByUid(item,
        this.checkDialog.table.pageSet.pageSize, this.checkDialog.sensorData.uid)
    }
  },
  created() {
    this.sensorDataSearch(this.sensorDataTable.pageSet.currentPage,
      this.sensorDataTable.pageSet.pageSize, ['', ''])
  }
}
</script>

<style scoped lang="stylus">
.mode-wrapper {
  height: 100%;
}
.sensorData{
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
.sensorDataForm{
  margin 33px 20px 0 20px
}
</style>
