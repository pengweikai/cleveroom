<template>
  <div class="components-container">
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="codeSearch">
        <el-tab-pane label="区域代码表" name="1">
          <el-form :inline="true" :model="codeForm">
            <el-form-item style="width: 220px">
              <el-input v-model="codeForm.regionData"
                        style="width: 220px"
                        placeholder="请输入区域名字进行查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codeSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addDialog.visible = true">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData.regionData"
            stripe
            v-loading="tableData.loading"
            height="450px"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="区域代码">
              <template slot-scope="scope">
                <i class="el-icon-help"></i>
                <span style="margin-left: 10px">{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="区域名">
              <template slot-scope="scope">
                <i class="el-icon-location"></i>
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
            width="120px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="openModify(scope.row)"
                             icon="el-icon-edit">
                  </el-button>
                  <el-button type="danger" size="mini" @click="codeDelete(scope.row)"
                             icon="el-icon-delete">
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="建筑代码表" name="2">
          <el-form :inline="true" :model="codeForm">
            <el-form-item style="width: 220px">
              <el-input v-model="codeForm.buildData"
                        style="width: 220px"
                        placeholder="请输入建筑名字进行查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codeSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addDialog.visible = true">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData.buildData"
            stripe
            v-loading="tableData.loading"
            height="450px"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="建筑代码">
              <template slot-scope="scope">
                <i class="el-icon-help"></i>
                <span style="margin-left: 10px">{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="建筑名">
              <template slot-scope="scope">
                <i class="el-icon-notebook-2"></i>
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
            width="120px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="openModify(scope.row)"
                             icon="el-icon-edit">
                  </el-button>
                  <el-button type="danger" size="mini" @click="codeDelete(scope.row)"
                             icon="el-icon-delete">
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="楼层代码表" name="3">
          <el-form :inline="true" :model="codeForm">
            <el-form-item style="width: 220px">
              <el-input v-model="codeForm.floorData"
                        style="width: 220px"
                        placeholder="请输入楼层名字进行查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codeSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addDialog.visible = true">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData.floorData"
            stripe
            v-loading="tableData.loading"
            height="450px"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="楼层代码">
              <template slot-scope="scope">
                <i class="el-icon-help"></i>
                <span style="margin-left: 10px">{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="楼层名">
              <template slot-scope="scope">
                <i class="el-icon-takeaway-box"></i>
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
            width="120">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="openModify(scope.row)"
                             icon="el-icon-edit">
                  </el-button>
                  <el-button type="danger" size="mini" @click="codeDelete(scope.row)"
                             icon="el-icon-delete">
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="房间代码表" name="4">
          <el-form :inline="true" :model="codeForm">
            <el-form-item style="width: 220px">
              <el-input v-model="codeForm.roomData"
                        style="width: 220px"
                        placeholder="请输入房间名字进行查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codeSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addDialog.visible = true">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData.roomData"
            stripe
            v-loading="tableData.loading"
            height="450px"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="房间代码">
              <template slot-scope="scope">
                <i class="el-icon-help"></i>
                <span style="margin-left: 10px">{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="房间名">
              <template slot-scope="scope">
                <i class="el-icon-house"></i>
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="openModify(scope.row)"
                             icon="el-icon-edit">
                  </el-button>
                  <el-button type="danger" size="mini" @click="codeDelete(scope.row)"
                             icon="el-icon-delete">
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="addDialog.title"
      :before-close="closeAdd"
      :visible.sync="addDialog.visible"
      width="30%">
      <el-form>
        <el-form-item label="代码">
          <el-input type="number" v-model="addDialog.data.code"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="addDialog.data.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="codeAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="modifyDialog.title"
      :visible.sync="modifyDialog.visible"
      width="30%">
      <el-form>
        <el-form-item label="代码">
          <el-input type="number" v-model="modifyDialog.data.code"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="modifyDialog.data.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="codeModify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {codeSearch, codeAdd, codeModify, codeDelete} from '@/api/code'
export default {
  name: 'introduction',
  data() {
    return {
      activeName: '1',
      codeForm: {
        regionData: '',
        buildData: '',
        floorData: '',
        roomData: ''
      },
      addDialog: {
        title: '添加',
        visible: false,
        data: {
          code: 0,
          name: ''
        }
      },
      modifyDialog: {
        title: '修改',
        visible: false,
        data: {
          id: '',
          code: 0,
          name: ''
        }
      },
      tableData: {
        loading: false,
        regionData: [],
        buildData: [],
        floorData: [],
        roomData: []
      }
    }
  },
  methods: {
    codeSearch() {
      let name = ''
      let data = this.activeName
      if(data === '1') {
        name = this.codeForm.regionData
      }else if(data === '2') {
        name = this.codeForm.buildData
      }else if (data === '3') {
        name = this.codeForm.floorData
      }else{
        name = this.codeForm.roomData
      }
      this.tableData.loading = true
      codeSearch({
        codeName: name,
        type: this.activeName
      }).then((res) => {
        console.log(res)

        if(data === '1') {
          this.tableData.regionData = res.data

        }else if(data === '2') {
          this.tableData.buildData = res.data
        }else if (data === '3') {
          this.tableData.floorData = res.data
        }else{
          this.tableData.roomData = res.data
        }
        this.tableData.loading = false

      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: '数据获取失败，请稍后再试'
        })
        this.tableData.loading = false
      })
    },
    closeAdd(done) {
      console.log('----关闭之前删除数据----')
      this.addDialog.data.code = 0
      this.addDialog.data.name = ''
      done()
    },
    codeAdd() {
      if(this.addDialog.data.name.trim() === '') {
        this.$notify({
          title: '提示',
          type: 'error',
          message: 'code重复或名字不符规范'
        })
        return
      }
      codeAdd({
        code: this.addDialog.data.code,
        name: this.addDialog.data.name,
        type: this.activeName
      }).then(() => {
        this.addDialog.data.code = 0
        this.addDialog.data.name = ''
        this.addDialog.visible = false
        this.codeSearch()
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: 'code重复或名字不符规范'
        })
      })
    },
    openModify(data) {
      console.log('----修改code信息----')
      console.log(data)
      this.modifyDialog.visible = true
      this.modifyDialog.data.id = data.id
      this.modifyDialog.data.code = data.code
      this.modifyDialog.data.name = data.name
    },
    codeModify() {
      if(this.modifyDialog.data.name.trim() === '') {
        this.$notify({
          title: '提示',
          type: 'error',
          message: 'code重复或名字不符规范'
        })
        return
      }
      codeModify({
        type: this.activeName,
        id: this.modifyDialog.data.id,
        code: this.modifyDialog.data.code,
        name: this.modifyDialog.data.name
      }).then(() => {
        this.modifyDialog.visible = false
        this.codeSearch()
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'error',
          message: 'code重复或名字不符规范'
        })
      })
    },
    codeDelete(data) {
      this.$confirm('确认删除吗？')
        .then(_ => {
          codeDelete({
            type: this.activeName,
            id: data.id
          }).then(() => {
            this.$notify({
              title: '提示',
              type: 'success',
              message: '删除成功'
            })
            this.codeSearch()
          }).catch(() => {
            this.$notify({
              title: '提示',
              type: 'error',
              message: '删除失败'
            })
          })
        })
    }
  },
  created() {
    this.codeSearch()
  }
}
</script>
<style scoped lang="stylus">

</style>
