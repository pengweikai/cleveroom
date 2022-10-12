<template>
  <div class="components-container">
    <el-row>
      <!-- 左侧树形 -->
      <el-col :span="5">
        <el-tree :data="treeData" node-key="code" @node-click="handleNodeClick"
                 accordion v-loading="treeLoading"
                 :props="defaultProps">
          <span class="custom-tree-node" slot-scope="{ node, data }">
                {{data.label}}
          </span>
        </el-tree>
      </el-col>
      <el-col :span="1">
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="19">
        <div>
          <el-tabs value="first" type="card">
            <el-tab-pane name="first">
              <span slot="label" style="color: #606266">
                <i class="el-icon-position"></i>
                当前选择的位置为：{{positionName}}</span>
              <el-table
                :data="table.data"
                :stripe="true"
                v-loading="table.loading"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="设备名称">
                </el-table-column>
                <el-table-column
                  prop="uid"
                  label="设备编号(UID)">
                </el-table-column>
                <el-table-column
                  prop="deviceType"
                  label="设备类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="stateName"
                  label="设备状态"
                  width="100" align="center">
                  <template slot-scope="scope">
                    <div slot="reference">
                      <el-tag size="medium" v-if="scope.row.stateName==='在线'">
                        {{ scope.row.stateName }}
                      </el-tag>
                      <el-tag size="medium" type="danger" v-else>
                        {{ scope.row.stateName }}
                      </el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="查看"
                  width="125" align="center">
                  <template slot-scope="scope">
                    <el-link v-if="scope.row.deviceType==='传感器'"
                             type="primary"
                             @click="checkSensorData(scope.row)">监测信息</el-link>
                    <el-link v-else
                      type="primary"
                      @click="checkDeviceData(scope.row)">设备信息</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="deviceDataDialog.title"
      :visible.sync="deviceDataDialog.visible"
      width="60%">
      <div>
        <el-descriptions border :column="2">
          <el-descriptions-item label="设备名">{{ deviceDataDialog.deviceData.name }}</el-descriptions-item>
          <el-descriptions-item label="设备编号">{{ deviceDataDialog.deviceData.uid }}</el-descriptions-item>
          <el-descriptions-item label="设备code">{{ deviceDataDialog.deviceData.code }}</el-descriptions-item>
          <el-descriptions-item label="设备类型">{{ deviceDataDialog.deviceData.deviceType }}</el-descriptions-item>
          <el-descriptions-item label="设备状态">{{ deviceDataDialog.deviceData.stateName }}</el-descriptions-item>
          <el-descriptions-item label="设备开关">{{ deviceDataDialog.deviceData.switchesName }}</el-descriptions-item>
          <el-descriptions-item label="设备指令">{{ deviceDataDialog.deviceData.deviceIns }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ deviceDataDialog.deviceData.updateTime }}</el-descriptions-item>
          <el-descriptions-item label="区域名">{{ deviceDataDialog.deviceData.positionDto.regionName }}</el-descriptions-item>
          <el-descriptions-item label="建筑名">{{ deviceDataDialog.deviceData.positionDto.buildName }}</el-descriptions-item>
          <el-descriptions-item label="楼层名">{{ deviceDataDialog.deviceData.positionDto.floorName }}</el-descriptions-item>
          <el-descriptions-item label="房间名">{{ deviceDataDialog.deviceData.positionDto.roomName }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="deviceDataDialog.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="sensorDataDialog.title"
      :visible.sync="sensorDataDialog.visible"
      width="60%">
      <div>
        <el-descriptions border :column="2">
          <el-descriptions-item label="传感器名">{{ sensorDataDialog.sensorData.name }}</el-descriptions-item>
          <el-descriptions-item label="传感器编号">{{ sensorDataDialog.sensorData.uid }}</el-descriptions-item>
          <el-descriptions-item label="传感器code">{{ sensorDataDialog.sensorData.code }}</el-descriptions-item>
          <el-descriptions-item label="传感器状态">
            {{ sensorDataDialog.sensorData.state===1?'在线':'离线' }}</el-descriptions-item>
          <el-descriptions-item label="传感器指令">{{ sensorDataDialog.sensorData.deviceIns }}</el-descriptions-item>
          <el-descriptions-item label="监测位置">
            {{ sensorDataDialog.sensorData.positionDto.regionName+'-'+sensorDataDialog.sensorData.positionDto.buildName+'-'
          +sensorDataDialog.sensorData.positionDto.floorName+'-'+sensorDataDialog.sensorData.positionDto.roomName}}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">监测数据详情</el-divider>
        <el-table
          :data="sensorDataDialog.table.data"
          :stripe="true"
          v-loading="sensorDataDialog.table.loading"
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
          @current-change="sensorDataDialogPageChange"
          layout="total, prev, pager, next"
          :total="sensorDataDialog.table.pageSet.total"
          :current-page="sensorDataDialog.table.pageSet.currentPage"
          :page-size="sensorDataDialog.table.pageSet.pageSize">
        </el-pagination>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="sensorDataDialog.visible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {positionListTree, positionListDevice} from '@/api/position'
import {sensorDataSearch} from '@/api/envir'
export default {
  data() {
    return {
      deviceDataDialog: {
        title: '查看设备信息',
        visible: false,
        deviceData: {
          positionDto: {}
        }
      },
      sensorDataDialog: {
        title: '传感器数据',
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
      activeName: 'first',
      table: {
        data: [],
        loading: false
      },
      treeData: [],
      positionName: '',
      treeLoading: false,
      defaultProps: {
        children: 'treeNodeDtos',
        label: 'label'
      }
    }
  },
  methods: {
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
        this.sensorDataDialog.table.data = list
        this.sensorDataDialog.table.pageSet.total = res.data.total
        this.sensorDataDialog.table.pageSet.currentPage = page
        this.sensorDataDialog.table.pageSet.pageSize = pageSize
      })
    },
    handleNodeClick(data, node) {
      console.log(data)
      console.log(node)
      // 选中才处理
      if(node.expanded || node.isCurrent) {
        let tmpNode = node
        let codeList = []
        let i = 1
        let params = {}
        this.positionName = ''
        while(tmpNode != null && tmpNode.data.label !== undefined && tmpNode.data.code !== undefined) {
          codeList.push(tmpNode.data.code)
          this.positionName = tmpNode.data.label + this.positionName
          tmpNode = tmpNode.parent
        }
        codeList.reverse().map((item) => {
          if(i === 1) {
            params.regionCode = item
          }else if(i === 2) {
            params.buildCode = item
          }else if(i === 3) {
            params.floorcode = item
          }else{
            params.roomCode = item
          }
          i++
        })
        console.log(params)
        this.table.loading = true
        positionListDevice(params).then((res) => {
          this.table.loading = false
          this.table.data = res.data
        }).catch(() => {
          this.loading = false
          this.$notify({
            title: '提示',
            type: 'error',
            message: '获取数据失败'
          })
        })
      }
    },
    positionListTree() {
      this.treeLoading = true
      positionListTree().then((res) => {
        this.treeData = res.data
        this.treeLoading = false
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: '获取数据失败'
        })
        this.treeLoading = false
      })
    },
    checkDeviceData(data) {
      this.deviceDataDialog.visible = true
      this.deviceDataDialog.deviceData = data
    },
    checkSensorData(data) {
      this.sensorDataDialog.visible = true
      this.sensorDataDialog.title = '传感器' + data.uid + '监测数据'
      this.sensorDataDialog.sensorData = data
      this.sensorDataSearchByUid(1, 5, data.uid)
    },
    sensorDataDialogPageChange(item) {
      this.sensorDataSearchByUid(item,
        this.sensorDataDialog.table.pageSet.pageSize,
        this.sensorDataDialog.sensorData.uid)
    }
  },
  created() {
    this.positionListTree()
  }
}
</script>
<style scoped lang="stylus">
.components-container{
  margin 0
  overflow hidden
}
.custom-tree-node{
  font-size 15px
  margin-top 20px
  margin-bottom 20px
}
/deep/ .el-tree-node__content{
  height: 50px
}
</style>
