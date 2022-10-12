<template>
  <div>
    <div class="title" align="center"><span>区域平面图</span></div>
    <div class="main">
        <div class="left">
<!--          <button @click="sensorDataShow()">点我点我</button>-->
            <table border="1px solid #ffffff" cellpadding="10">
              <thead>
              <tr rowspan="2">
                    <th colspan="2">环境监测</th>
                </tr>
              </thead>
              <tbody>
              <tr >
                <td>温度：<p style="color:indianred;display:inline">{{envir.wd }}</p>°C</td>
                <td>湿度：<p style="color:indianred;display:inline">{{envir.sd }}</p>p%RH</td>
              </tr>
              <tr >
                <td>光照度：<p style="color:indianred;display:inline">{{envir.gd }}</p>LX</td>
                <td>PM2.5：<p style="color:indianred;display:inline">{{envir.pm }}</p>ug/m³</td>
              </tr>
              <tr >
                <td>二氧化碳：<p style="color:indianred;display:inline">{{envir.co }}</p>PPM</td>
                <td>甲醛：<p style="color:indianred;display:inline">{{envir.jq }}</p>mg/m³</td>
              </tr>
              </tbody>

            </table>
<!--          <p>{{items[1]}}</p>-->
<!--          <p>{{items[0]}}</p>-->
            <table class="no2">
                    <tr>
                        <td colspan="3"><span id="noo2">电、气、水统计</span></td>
                    </tr>
                    <tr >
                        <th style="background-color: rgba(202, 249, 130, 1)">电耗</th>
                        <th style="background-color: rgba(245, 154, 35, 1)">水耗</th>
                        <th style="background-color: rgba(217, 0, 27, 1)">气耗</th>
                    </tr>

                    <tr>
                        <td>当月综合能耗</td>
                        <td>当月综合能耗</td>
                        <td>当月综合能耗</td>
                    </tr>
                <tr>
                    <td>{{total.electricityDu}}度</td>
                    <td>{{total.waterDun}}吨</td>
                    <td>{{total.gasFang}}立方米</td>
                </tr>
                <tr>
                    <td>当月综合能耗</td>
                    <td>当月综合能耗</td>
                    <td>当月综合能耗</td>
                </tr>
                <tr>
                    <td>{{total.electricityMoney}}万元</td>
                    <td>{{total.gasMoney}}万元</td>
                    <td>{{total.waterMoney}}万元</td>
                </tr>
            </table>
            <div class="l3">
                <span class="rr1">区域能耗对比</span>
                <div class="ll3">
                <button type="button" @click="ln1" style="background-color: magenta">月度</button>
                <button type="button" @click="ln2" style="background-color: bisque">季度</button>
                <button type="button" @click="ln3" style="background-color: yellowgreen">年度</button>
                </div>
                <div class="l33">
<!--                  <img src="../../assets/images/keshi/u3.png" alt="">-->
                    <div ref="chart" style="width:100%;height:376px"></div>
                </div>
            </div>
        </div>

        <MidFun @returnDate='returnDate' @changeTotal='changeTotal' @changeLast='changeLast'></MidFun>
        <div class="right">
            <div class="r1">
                <span class="rr1">昨日设备能耗分析</span>
<!--                <img src="../../assets/images/keshi/u46.png" alt="">-->
              <div ref="chart1" style="width:100%;height:376px"></div>
            </div>
            <div class="r2">
                <span class="rr1">设备报警信息</span>
                <ul style="list-style: none">
                  <li v-for="mess in alarmMessage">
                    <p>{{mess.msg}}</p>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import MidFun from './mid_Func'
    import {sensorDataShow} from '@/api/envir'
    // import item from "../../layout/sidebar/item"
    import {globalBus} from '@/common/globalBus'
    import {getRegionMsg,getRegionTotalMsg,getLastConsume} from '@/api/keshi'
    export default {
  name: 'MainContent',
  components: {MidFun},
  data() {
        return {
          items: [],
          temperature: '',
          humidity: '',
          illumination: '',
          pm2_5: '',
          co2: '',
          formaldehyde: '',
          alarmMessage:[{
            msg:"地下车库变压器油温值异常！温度过高，请及时处理。"
          },{
            msg:"地下车库A3区域水位异常！可能出现漏水现象，请及时处理!"
          },{
            msg:"实训楼一楼102号房间有突然设备离线！可能出现损坏，请及时处理。"
          }],
          imgArr:[
            '/static/image/u4.png',
            '/static/image/u5.png',
            '/static/image/u6.png'
          ],
          index:0,
          barData:{},
          //环境检测数据
          envir:{
            wd:32,
            sd:50,
            gd:300,
            pm:66,
            co:300,
            jq:0.3
          },
          example:{
            wd:32,
            sd:50,
            gd:300,
            pm:66,
            co:300,
            jq:0.3
          },
          //所选位置
          dress:'',
          //左侧统计数据
          total:{},
          //扇形图数据
          last:{kongtiao:18,
          light:12,
          other:22,
          shebei:33},
        }
  },
  methods: {
        ln1: function () {
          this.index = 0;
          getRegionMsg({time:"mouth"}).then((res)=>{
            console.log("mouth",res.data)
            this.barData=res.data
            this.getEchartData()
          });
        },
        ln2: function () {
          this.index = 1;
          getRegionMsg({time:"season"}).then((res)=>{
            console.log("season",res.data)
            this.barData=res.data
            this.getEchartData()
          });
        },
        ln3: function () {
          this.index = 2;
          getRegionMsg({time:"year"}).then((res)=>{
            console.log("year",res.data)
            this.barData=res.data
            this.getEchartData()
          });
        },
        sensorDataShow: function () {
          // let position_id = '1522172563520385026'
          let position_id = ''
          globalBus.$on('countNumber',(val)=>{
            position_id=val;
            this.items.splice(0,this.items.length);
            console.log(this.items);
            console.log(position_id);
            sensorDataShow({positionId: position_id}).then(res => {
              console.log('---获取数据总数---')
              // console.log(res.data[0])
              console.log(res.data)

              for(var i=0;i<res.data.length - 1;i++){
                for(var j = i+1;j<res.data.length;j++){
                  if(res.data[i].sensorName === res.data[j].sensorName){
                    res.data.splice(j,1)
                    // splice删除了一个元素，下标要减一，否则循环会漏掉一个元素(多个相邻的元素 可能会漏掉删除元素)
                    j--;
                  }
                }
              }
              console.log(res.data)

              for(i=0;i<=res.data.length-1;i++){
                this.items[i]=res.data[i].testState+':'+res.data[i].data+res.data[i].unit
                // this.$set( this.items, res.data[i].testState+':'+res.data[i].data+res.data[i].unit)
                this.$forceUpdate( this.items )// 强制更新，迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
              }
              // console.log(res.data[0].testState+':'+res.data[0].data+res.data[0].unit)
              console.log(this.items[0])

            }).catch(() => {
              this.$notify({
                title: '提示',
                type: 'error',
                message: '数据获取失败'
              })
            })
          });

    },
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const labelOption = {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: "left",
          verticalAlign: "middle",
          rotate: 90,
          formatter: '{c} ',
          fontSize: 16,
          color:"white",
          rich: {
            name: {}
          }
        };
        const option = {tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['水耗', '电耗', '气耗'],
            textStyle: {
              color: 'white',  //更改坐标轴文字颜色
            }
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['一楼', '二楼', '三楼', '四楼', '五楼'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white',  //更改坐标轴文字颜色
                }
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white',  //更改坐标轴文字颜色
                }
              },
            }
          ],
          series: [
            {
              name: '水耗',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: this.barData.water
            },
            {
              name: '电耗',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: this.barData.electricity
            },
            {
              name: '气耗',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: this.barData.gas
            },

          ]}
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed',()=>{
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      })
    },
    getEchartData1() {
      const chart1 = this.$refs.chart1
      if (chart1) {
        const myChart = this.$echarts.init(chart1)
        const option = { tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center',
            textStyle: {
              color: 'white',  //更改坐标轴文字颜色
            }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white',  //更改坐标轴文字颜色
                }
              },
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.last.light, name: '照明' },
                { value: this.last.shebei, name: '设备' },
                { value: this.last.kongtiao, name: '空调' },
                { value: this.last.other, name: '其他' }
              ]
            }
          ]}
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed',()=>{
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      })
    },
    //midFunc组件传值
    returnDate(e){
      this.dress=e
      var x=this.dress.split('-')
      this.envir.wd=(this.example.wd-0.1*x[0]+Math.pow(-1,x[1])*0.1).toFixed(3)
      this.envir.sd=(this.example.sd-1*x[0]+Math.pow(-1,x[1])*1).toFixed(3)
      this.envir.gd=(this.example.gd+4*x[0]+Math.pow(-1,x[1])*5).toFixed(3)
      this.envir.pm=(this.example.pm-3*x[0]+Math.pow(-1,x[1])*2).toFixed(3)
      this.envir.co=(this.example.co-6*x[0]+Math.pow(-1,x[1])*5).toFixed(3)
      this.envir.jq=(this.example.jq-0.01*x[0]+Math.pow(-1,x[1])*0.02).toFixed(3)
    },
    changeTotal(e){
      this.total=e
    },
    changeLast(e){
      this.last=e
    }
  },
      //监听每个楼层数据的变化
      watch:{
        last:{
          handler(newValue,oldValue){
            console.log("监听属性变化newLast:"+newValue+" oldLast:"+oldValue)
            this.getEchartData1()
          }
        }
      },
  created() {
        this.sensorDataShow()
        this.ln1()
    getRegionTotalMsg({region:'0-0'}).then((res)=>{
      this.total = res.data;
    });
    getLastConsume({region:'0-0'}).then((res)=>{
      this.last = res.data;
      this.getEchartData1()
    })
  },
  mounted() {
    // this.sensorDataShow()
      this.getEchartData()
  }
    }
</script>

<style scoped>
    .main {
        height: 85%;
        display: flex;
    }
    .title span{
        color: rgb(255, 255, 255);
        /*display: inline;*/
        font-family: "Arial Negreta",serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        display: inline-block;
     }
    .left {
        width: 30%;
        /*background-color: cornflowerblue;*/
        margin-left: 1%;
        margin-right: 1%;
        /*text-align: center;*/
    }
    .left table {
        background-attachment: scroll;
        background-clip: border-box;
        background-color: rgb(7, 28, 77);
        background-image: none;
        background-origin: padding-box;
        width: 100%;
        height: 20%;
        border-collapse: collapse;
        text-align: center;
        margin-bottom: 2%;
    }

    table,table tr th, table tr td {
    color:  rgb(2, 167, 240);
        border:1px solid #ccc;
    }
    .left table th, #noo2 , .rr1 {
        color: rgb(255, 255, 255);
        font-family: "Microsoft YaHei ",serif;
        font-size: 20px;
        font-weight: 700;
        /*text-align: center;*/
    }
    .no2 td{
        border-radius: 1%;
        border-style: none;
    }
    .l3 {
        border: 1px solid #ffffff;
        width: 100%;
        height: 400px;
        /*position: absolute;*/
    }
    .l3 span {
        text-align: center;
        display: block;
        /*position: absolute;*/
    }
    .ll3 {
        /*height: 100px;*/
        /*display: inline-block;*/
        position: relative;
        /*position: center;*/
        text-align: right;
        /*left: 30%;*/
        top: 10%;
    }
    .l33 {
      position: relative;
      width: 100%;
      top: 10%;
    }
    .lll3 {
        position: relative;
        /*top: -5%;*/
      margin: 7%;
        height: 100%;
      bottom: 5%;
      /*left: 5%;*/
        /*background: url('../../../static/image/u4.png') no-repeat top;*/
     }
    .lll3 img {
      width: 100%;
    }
    /*#noo2 {*/
    /*    color: rgb(255, 255, 255);*/
    /*    font-family: "Microsoft YaHei ";*/
    /*    font-size: 20px;*/
    /*    font-weight: 700;*/
    /*}*/
    .right {
        /*margin: 1%;*/
        width: 28%;
        margin-left: 1%;
      margin-right: 1%;
        /*background-color: darkolivegreen;*/
    }
    .r2 li {
        color: rgb(245, 154, 35);
        font-family: "Arial Normal",serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        padding: 5%;
        text-align: left;
    }
    .r1,.r2{
        height: 45%;
        border: 1px solid #ffffff;
        text-align: center;
        margin-bottom: 3%;
    }
    .r1 img {
        margin: 5%;
        width: 80%;
        /*height: auto;*/
    }

</style>
