<template>
  <div class="homepage-container">
    <el-row class="home-part1" :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="device-sum">
          <div class="title">
            <p class="title-value">
              设备总览<i class="el-icon-refresh" style="cursor: pointer"
            @click="getDeviceSum"></i>
            </p>
          </div>
          <div class="home-detail" v-loading="homeDetailLoading">
            <div class="home-detail-item" :style="{ background: item.color}" v-for="(item, index) of homeDetailItem">
              <div class="name">{{item.name}}</div>
              <div class="value">
                <span class="num">{{item.value}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="home-part2" :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="device-search">
          <div class="title">
            <p class="title-value">
              设备搜索和管理<i class="el-icon-refresh" style="cursor: pointer"
                        @click="deviceSearch(0,5,formInline.deviceType,formInline.deviceName)"></i>
            </p>
          </div>
          <div class="content">
            <el-row class="search">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备类型">
                  <el-select v-model="formInline.deviceType">
                    <el-option label="传感器" value="传感器"></el-option>
                    <el-option label="控制设备" value="控制设备"></el-option>
                    <el-option label="非控制设备" value="非控制设备"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备名称">
                  <el-input v-model="formInline.deviceName">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询设备</el-button>
                </el-form-item>
              </el-form>
            </el-row>
            <el-row class="device-table">
              <el-table
                :data="tableData"
                :stripe="true"
                v-loading="loading"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="设备名称"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="设备地址"
                  >
                </el-table-column>
                <el-table-column
                  prop="uid"
                  label="设备编号(UID)"
                  >
                </el-table-column>
                <el-table-column
                  prop="deviceType"
                  label="设备类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="stateName"
                  label="设备状态"
                  align="center"
                width="100">
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
                  prop="switches"
                  label="设备开关"
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                    <div slot="reference">
                      <el-tag size="medium" v-if="scope.row.switches==='开'">
                        {{ scope.row.switches }}
                      </el-tag>
                      <el-tag size="medium" type="danger" v-else-if="scope.row.switches==='关'">
                        {{ scope.row.switches }}
                      </el-tag>
                      <el-tag size="medium" type="info" v-else>
                        {{ scope.row.switches }}
                      </el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="设备操作"
                  width="220" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleModify(scope.row.uid)">修改</el-button>
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleControl(scope.row)">调节</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="margin: 10px auto"
                background
                @current-change="pageChange"
                layout="total, prev, pager, next"
                :total="pageSet.total"
                :current-page="pageSet.currentPage"
                :page-size="pageSet.pageSize">
              </el-pagination>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="modifyDialog.title"
      :visible.sync="modifyDialog.visible"
      width="60%">
      <div>
        <el-descriptions border :column="2">
          <el-descriptions-item label="设备名">{{ modifyDialog.deviceData.name }}</el-descriptions-item>
          <el-descriptions-item label="设备编号">{{ modifyDialog.deviceData.uid }}</el-descriptions-item>
          <el-descriptions-item label="设备code">{{ modifyDialog.deviceData.code }}</el-descriptions-item>
          <el-descriptions-item label="设备类型">{{ modifyDialog.deviceData.deviceType }}</el-descriptions-item>
          <el-descriptions-item label="设备状态">{{ modifyDialog.deviceData.stateName }}</el-descriptions-item>
          <el-descriptions-item label="设备开关">{{ modifyDialog.deviceData.switchesName }}</el-descriptions-item>
          <el-descriptions-item label="设备指令">{{ modifyDialog.deviceData.deviceIns }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ modifyDialog.deviceData.updateTime }}</el-descriptions-item>
          <el-descriptions-item label="区域设置">
            <el-select value-key="code" v-model="modifyDialog.deviceData.positionDto.regionCode">
              <el-option :key="item.id" :label="item.name" :value="item.code" v-for="(item,index) of modifyDialog.regionCodeList">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="建筑设置">
            <el-select value-key="code" v-model="modifyDialog.deviceData.positionDto.buildCode">
              <el-option :key="item.id" :label="item.name" :value="item.code" v-for="(item,index) of modifyDialog.buildCodeList">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="楼层设置">
            <el-select value-key="code" v-model="modifyDialog.deviceData.positionDto.floorCode">
              <el-option :key="item.id" :label="item.name" :value="item.code" v-for="(item,index) of modifyDialog.floorCodeList">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="房间设置">
            <el-select value-key="code" v-model="modifyDialog.deviceData.positionDto.roomCode">
              <el-option :key="item.id" :label="item.name" :value="item.code" v-for="(item,index) of modifyDialog.roomCodeList">
              </el-option>
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <span slot="footer">
        <el-button @click="modifyDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="modifyDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer
      :title="controlDrawer.title"
      size="32%"
      :visible.sync="controlDrawer.visible"
      :with-header="controlDrawer.withHeader">
      <div class="drawer-body">
        <el-row style="border: 1px solid black">
          <el-row style="margin: 20px">
            <el-col :span="8" class="content-center">
              <el-button type="primary">开启</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">停止</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">关闭</el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="8" class="content-center">
              <el-button type="primary">向上</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">弹出</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">向下</el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="8" class="content-center">
              <el-button type="primary">上一首</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">AV/TV/*</el-button>
            </el-col>
            <el-col :span="8" class="content-center">
              <el-button type="primary">下一首</el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="24" class="content-center">
              <el-button type="primary" style="font-size:25px" circle size="large" icon="el-icon-caret-top"></el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="11" class="content-center">
              <el-button type="primary" style="font-size:25px" circle size="large" icon="el-icon-caret-left"></el-button>
            </el-col>
            <el-col :span="2" class="content-center">
              <el-button type="primary" style="font-size:25px" circle size="large" icon="el-icon-video-play"></el-button>
            </el-col>
            <el-col :span="11" class="content-center">
              <el-button type="primary" style="font-size:25px" circle size="large" icon="el-icon-caret-right"></el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="24" class="content-center">
              <el-button type="primary" style="font-size:25px" circle size="large" icon="el-icon-caret-bottom"></el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="6" class="content-center">
              <el-button type="primary">1</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">2</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">3</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">4</el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="6" class="content-center">
              <el-button type="primary">5</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">6</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">7</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">8</el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 20px">
            <el-col :span="6" class="content-center">
              <el-button type="primary">后退</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">9</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">10</el-button>
            </el-col>
            <el-col :span="6" class="content-center">
              <el-button type="primary">前进</el-button>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import {getDeviceSum, deviceSearch, deviceModify} from '@/api/device'
import {getCodeList} from '@/api/code'
export default {
  data() {
    return {
      controlDrawer: {
        visible: false,
        title: '设备调节',
        withHeader: false
      },
      formInline: {
        deviceType: '传感器',
        deviceName: ''
      },
      modifyDialog: {
        visible: false,
        title: '修改设备',
        deviceData: {
          positionDto: {}
        },
        regionCodeList: [],
        buildCodeList: [],
        floorCodeList: [],
        roomCodeList: []
      },
      homeDetailLoading: false,
      homeDetailItem: [],
      loading: false,
      tableData: [],
      devices: [],
      pageSet: {
        total: 0,
        pageSize: 5,
        currentPage: 0
      }
    }
  },
  methods: {
    getPosition() {
      getCodeList({type: 1}).then((res) => {
        this.modifyDialog.regionCodeList = res.data
      })
      getCodeList({type: 2}).then((res) => {
        this.modifyDialog.buildCodeList = res.data
      })
      getCodeList({type: 3}).then((res) => {
        this.modifyDialog.floorCodeList = res.data
      })
      getCodeList({type: 4}).then((res) => {
        this.modifyDialog.roomCodeList = res.data
      })
    },
    getDeviceSum() {
      this.homeDetailLoading = true
      getDeviceSum().then(resp => {
        console.log('---获取设备总数---')
        console.log(resp)
        this.homeDetailItem = [{
          name: '总设备数',
          value: resp.data.deviceNum,
          color: '#2196f3'
        },
        {
          name: '在线设备数',
          value: resp.data.deviceOnline,
          color: '#ab47bc'
        },
        {
          name: '离线设备数',
          value: resp.data.deviceOffline,
          color: '#ec407a'
        },
        {
          name: '传感器数',
          value: resp.data.sensor,
          color: '#009688'
        },
        {
          name: '控制设备数',
          value: resp.data.controlDevice,
          color: '#009688'
        },
        {
          name: '非控制设备数',
          value: resp.data.nonControlDevice,
          color: '#009688'
        }]
        this.homeDetailLoading = false
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: '数据获取失败'
        })
      })
    },
    deviceSearch(page, pageSize, deviceType, deviceName) {
      this.loading = true
      deviceSearch({
        deviceType, deviceName, page, pageSize
      }).then((res) => {
        console.log('---获取设备列表---')
        console.log(res)
        let list = []
        res.data.records.map((item) => {
          list.push({
            name: item.name,
            address: item.positionDto.regionName + '-' + item.positionDto.buildName + '-' +
              item.positionDto.floorName + '-' + item.positionDto.roomName,
            uid: item.uid,
            deviceType: item.deviceType,
            stateName: item.stateName,
            switches: item.switches === null ? '暂无' : item.switchesName
          })
        })
        this.tableData = list
        this.devices = res.data.records
        this.loading = false
        this.pageSet.total = res.data.total
        this.pageSet.pageSize = pageSize
        this.pageSet.currentPage = page
      }).catch((err) => {
        this.loading = false
        this.$notify({
          title: '提示',
          type: 'error',
          message: '获取数据失败' + err
        })
      })
    },
    pageChange(item) {
      this.deviceSearch(item, this.pageSet.pageSize,
        this.formInline.deviceType, this.formInline.deviceName)
    },
    onSubmit() {
      this.deviceSearch(0, this.pageSet.pageSize,
        this.formInline.deviceType, this.formInline.deviceName)
    },
    handleModify(uid) {
      console.log('-----修改设备信息----')
      console.log(uid)
      this.modifyDialog.visible = true
      this.devices.map((item) => {
        if(item.uid === uid) {
          this.modifyDialog.deviceData = item
        }
      })
      // this.modifyDialog.deviceData=this.devices[index]
    },
    modifyDevice() {
      deviceModify(this.modifyDialog.deviceData).then((res) => {
        this.$notify({
          title: '提示',
          type: 'success',
          message: res.data
        })
        this.modifyDialog.visible = false
        this.deviceSearch(this.pageSet.currentPage, this.pageSet.pageSize,
          this.formInline.deviceType, this.formInline.deviceName)
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: '修改失败'
        })
      })
    },
    handleControl(data) {
      this.controlDrawer.visible = true
    }
  },
  created() {
    // 获取设备总数
    this.getDeviceSum()
    this.getPosition()
    this.deviceSearch(0, this.pageSet.pageSize,
      '传感器', '')
  }
}
</script>
<style scoped lang="stylus">
.homepage-container
  min-width 580px
.home-part1 {
  margin: 0 !important;
  .device-sum {
    border: 1px solid #eee;
    color: #fff;
    .home-detail{
      margin 10px 0
      display flex;
      justify-content space-between
      width: 100%;
      height: 100px
      .home-detail-item {
        flex: 0 0 16%
        border: 1px solid #eee
        background-image linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .3)) !important
        cursor pointer
      }
      .home-detail-item:hover {
        background-image none !important
      }
      .home-detail-item {
        .name {
          padding: 30px 0 10px 0;
          text-align: center;
          font-size: 20px;
        }
        .value {
          text-align: center;
          .num {
            font-size: 28px;
          }
        }
      }
    }
  }
  .detail-item-wrapper {
    display: flex
    height: 140px
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
    padding: 0 10px;
  }
}
.home-part2 {
  margin: 0 !important;
  .device-search {
    border: 1px solid #eee;
    .title {
      background: #f2f2f2;
      padding: 10px 0;
      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;
        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }
  }
  .detail-item-wrapper {
    display: flex
    height: 140px
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
    padding: 0 10px;
    .title {
      width:100%;
      background: #dde3ef;
      padding: 10px 0;
      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;
        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }
  }
}
.el-col {
  border-radius: 4px;
}
.el-form{
  margin-left 20px
  .el-form-item{
    margin 20px 20px 20px 0
  }
}

.bg-purple-dark {
  background: #99a9bf;
}
.title {
  background: #f2f2f2;
  padding: 10px 0;
  .title-value {
    margin-left: 4px;
    text-indent: 4px;
    color: #666;
    &:before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 16px;
      background: purple;
      margin-right: 4px;
      border-radius: 4px;
      vertical-align: middle;
    }
  }
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.content /deep/ .bscroll-vertical-scrollbar
  z-index 2 !important
.drawer-body{
  width 100%
  height 100%
  padding 60px 30px
}
.content-center{
  display: flex;
  justify-content: center
  align-items: center
}
</style>
