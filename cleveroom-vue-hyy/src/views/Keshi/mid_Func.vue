<template>
  <div class="mid">

    <div class="m1">
      <button @click="underG();clickCount()">第一教学楼</button>
      <button @click="upG1();n1();clickCount()">一楼</button>
      <button @click="upG2();n2();clickCount()">二楼</button>
      <button @click="upG3();n3();clickCount()">三楼</button>
      <button @click="upG4();n4();clickCount()">四楼</button>
      <button @click="upG5();n5();clickCount()">五楼</button>
    </div>


    <!--        <div id="m2">-->
    <!--            <img :src="imgArr[index]" alt="">-->
    <!--&lt;!&ndash;            <div id="ma">A区</div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div id="mb">B区</div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div id="mc">C区</div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div id="md">D区</div>&ndash;&gt;-->
    <!--        </div>-->
    <div  class="m2">
      <iframe
        id="iframe"
        ref="iframe"
        class="iframe"
        :src="Arr3D[index]"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="auto"
      />
    </div>
    <!--            <div class="hh">-->
    <!--              <unity-->
    <!--                ref="unityVue"-->
    <!--                src="C:\Users\86134\Desktop\智能物联网\cleveroom-vue—pwk1\cleveroom-vue\static\testwebgl_2019\Build\testwebgl_2019.json"-->
    <!--                width="100%"-->
    <!--                height="450px"-->
    <!--                unity-loader="C:\Users\86134\Desktop\智能物联网\cleveroom-vue—pwk1\cleveroom-vue\static\testwebgl_2019\Build\UnityLoader.js"-->
    <!--              />-->
    <!--            </div>-->
    <div class="m3">
      <p>设备控制</p>
      <span>当前控制区域：</span>
      <span id="m33">{{Region[n6]}}</span>
      <div class="m31">
        <button >只开A区</button>
        <button >只开B区</button>
        <button id="qk">全开</button>
        <button >只开C区</button>
        <button >只开D区</button>
        <button >只关A区</button>
        <button >只关B区</button>
        <button id="qg">全关</button>
        <button >只关C区</button>
        <button >只关D区</button>
      </div>
    </div>
  </div>
</template>

<script>
import {globalBus} from '@/common/globalBus'
import Unity from 'vue-unity-webgl'
import {getRegionMsg,getRegionTotalMsg,getLastConsume} from '@/api/keshi'
import {positionCodeToList} from '@/api/position'
// import DevUI from 'vue-devui';
// import 'vue-devui/style.css';
export default {
  components:{Unity},
  name: 'Mid_Fun',
  data() {
    return {
      total : {},
      last : {},
      imgArr: [
        '/static/image/u253.jpg',
        '/static/image/u254.png'
      ],
      Arr3D:[
        "/static/building/index.html",
        "/static/classrooms1/index.html",
        "/static/classrooms2/index.html",
        "/static/classrooms3/index.html",
        "/static/classrooms4/index.html",
        "/static/classrooms5/index.html",
      ],
      index: 0,
      n6: 0,
      Region: [
        '地下车库',
        '一楼',
        '二楼',
        '三楼',
        '四楼',
        '五楼',
      ],
      positionId: ''
    };
  },
  mounted() {
    window.addEventListener("message",this.unityWatch);
  },
  methods: {
    unityWatch(e){
      console.log("until的数据",e.data.guid);
      if (e.data.guid=="1-1"||e.data.guid=="2-1"||e.data.guid=="3-1"||e.data.guid=="4-1"||e.data.guid=="5-1") {
         getRegionTotalMsg({region:"1-1"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-1"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
      else if (e.data.guid=="1-2"||e.data.guid=="2-2"||e.data.guid=="3-2"||e.data.guid=="4-2"||e.data.guid=="5-2") {
         getRegionTotalMsg({region:"1-2"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-2"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
      }
       else if (e.data.guid=="1-3"||e.data.guid=="2-3"||e.data.guid=="3-3"||e.data.guid=="4-3"||e.data.guid=="5-3") {
         getRegionTotalMsg({region:"1-3"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-3"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else if (e.data.guid=="1-4"||e.data.guid=="2-4"||e.data.guid=="3-4"||e.data.guid=="4-4"||e.data.guid=="5-4") {
         getRegionTotalMsg({region:"1-4"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-4"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else if (e.data.guid=="1-5"||e.data.guid=="2-5"||e.data.guid=="3-5"||e.data.guid=="4-5"||e.data.guid=="5-5") {
         getRegionTotalMsg({region:"1-5"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-5"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else if (e.data.guid=="1-6"||e.data.guid=="2-6"||e.data.guid=="3-6"||e.data.guid=="4-6"||e.data.guid=="5-6") {
         getRegionTotalMsg({region:"1-6"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-6"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else if (e.data.guid=="1-7"||e.data.guid=="2-7"||e.data.guid=="3-7"||e.data.guid=="4-7"||e.data.guid=="5-7") {
         getRegionTotalMsg({region:"1-7"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-7"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else if (e.data.guid=="1-8"||e.data.guid=="2-8"||e.data.guid=="3-8"||e.data.guid=="4-8"||e.data.guid=="5-8") {
         getRegionTotalMsg({region:"1-8"}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:"1-8"}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }
       else {
         getRegionTotalMsg({region:e.data.guid}).then((res)=>{
           this.total = res.data;
           this.$emit('changeTotal',this.total)
         });
         getLastConsume({region:e.data.guid}).then((res)=>{
           this.last = res.data;
           this.$emit('changeLast',this.last)
         })
       }

      console.log("this.total2",this.total);
      console.log("this.last",this.last);
      this.$emit('returnDate',e.data.guid);
    },
    underG: function () {

      this.index = 0;
      this.n6 = 0;
    },
    clickCount() {
      this.$emit('returnDate',this.n6+'-'+'0')
      const regions = this.n6 + '-' + '0';
      getRegionTotalMsg({region:regions}).then((res)=>{
        console.log("获取的total数据",res.data)
        this.total = res.data;
        console.log("this.total2",this.total);
        this.$emit('changeTotal',this.total)
      });
      getLastConsume({region:regions}).then((res)=>{
        console.log("获取的last数据",res.data)
        this.last = res.data;
        console.log("this.last",this.last);
        this.$emit('changeLast',this.last)
      })


      if(this.n6 == 0) {
        this.positionId = '1522172563520385026';
      }else if(this.n6 == 1) {
        this.positionId = '1522172570105442306'
      }else if(this.n6 == 2) {
        this.positionId = '1522172594008780802'
      }else if(this.n6 == 3) {
        this.positionId = '1522172621284339713'
      }else if(this.n6 == 4) {
        this.positionId = '1522172642922754050'
      }else if(this.n6 == 5) {
        this.positionId = '1522172594008780802'
      }
      globalBus.$emit('countNumber', this.positionId);
    },
    upG1: function () {
      this.index = 1;
    },
    upG2: function () {
      this.index = 2;
    },
    upG3: function () {
      this.index = 3;
    },
    upG4: function () {
      this.index = 4;
    },
    upG5: function () {
      this.index = 5;
    },
    n1: function () {
      this.n6 = 1;
    },
    n2: function () {
      this.n6 = 2;
    },
    n3: function () {
      this.n6 = 3;
    },
    n4: function () {
      this.n6 = 4;
    },
    n5: function () {
      this.n6 = 5;
    },
  }
}
</script>

<style scoped>
.mid {
  width: 42%;
  /*background-color: mistyrose;*/
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.m1 {
  display: flex;
  /*flex-wrap: nowrap;*/
  height: 68px;
  border: 1px solid #ffffff;
  margin-bottom: 7px;
  min-width: 300px;
  /*overflow: auto;*/

}
.m1 button {
  margin: 8px;
  width: 20%;
  /*overflow: auto;*/
}
#m2 {
  /*background-color: whitesmoke;*/
  /*width: 100%;*/
  border: 1px solid #ffffff;
  margin-bottom: 7px;
  display: flex;
  /*text-align: center;*/
  position:relative;
  /*overflow:hidden;*/
  height: 480px;
}
/*#m2 img{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  !*object-fit:cover;*!*/
/*  overflow: hidden;*/
/*}*/
#ma {
  width: 160px;
  height: 330px;
  background-color:  rgba(236, 128, 141, 0.325490196078431);
  position: relative;
  top: 11%;
  line-height: 330px;
}
#mb {
  bottom: 32%;
  left: 36%;
  width: 25%;
  height: 26%;
  background-color: rgba(236, 128, 141, 0.325490196078431);
  position: absolute;
  border: 1px solid #ffffff;
  line-height: 260px;
}
#mc {
  left: 1%;
  width: 440px;
  height: 160px;
  background-color: rgba(236, 128, 141, 0.325490196078431);
  position: relative;

}
#md {
  left: 5%;
  width: 100px;
  height: 400px;
  background-color: rgba(236, 128, 141, 0.325490196078431);
  position: relative;
  line-height: 400px;
}
.m3 {
  /*background-color: forestgreen;*/
  height: 200px;
  border: 1px solid #ffffff;
  width: 100%;
}
.m3 p {
  color: rgb(255, 255, 255);
  font-family: "Arial Negreta",serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  display: block;
  margin-bottom: 0;
}
.m3 span {
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 700;
  position: relative;
  left: 70%;
}
#m33 {
  color: rgb(255, 255, 128);
}
.m31 {
  display: flex;
  /*flex-direction: column;*/
  flex-wrap: wrap;
  width: 100%;
  height: 80%;
}
.m31 button{
  margin-left: 5%;
  height: 30%;
  width: 13%;
}
#qk,#qg {
  width: 20%;
}

.m2 {
  /*height:60%;*/
  /*width: 100%;*/
  border: 1px solid #ffffff;
  margin-bottom: 7px;
  display: flex;
  /*text-align: center;*/
  position:relative;
  /*overflow:hidden;*/
  height: 480px;
  width: 780px;
}
.hh {
  height: 40%;
}

</style>
