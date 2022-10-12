<template>
  <div class="tt">

    <div class="tt_p">

      <div class="title">
        <router-link to='/device'><el-button class="el-button">返回</el-button></router-link>
        <p>智慧能耗管理平台</p>
        <div class="Time">
          <span id="showTime">{{dateFormat(newDate)}}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'navBacker',
    components: {},
    props: {},
    data() {
      return {
        newDate:'error'
      };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      let that = this
      this.timer = setInterval(function () {
        that.newDate = new Date().toLocaleString()
      })
    },
    beforeDestroy: function () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    destroyed() {},
    methods: {
      dateFormat () {
        var date = new Date()
        var year = date.getFullYear()
        //   在日期格式中，月份是从0开始的
        //   使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        let week = date.getDay() // 星期
        let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
        // 拼接 时间格式处理
        return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + ' ' + weekArr[week]
  }
}
}
</script>

<style scoped>
  .el-button {
    /*background-color: rgb(52, 58, 64)*/
    background-color: rgb(52, 58, 64);
    border:1px solid darkslategray;
    color: whitesmoke;
  }
  .Time {
    position: relative;
    left: 20%;
  }
  p {
    color: rgb(255, 255, 255);
    font-family: "Arial Normal",serif;
    font-size: 2em;
    font-style: normal;
    font-weight: 700;
    line-height: 100px;
  }
  .title {
    position: relative;
    left: 5%;
    justify-content:center;
    top: 15%;
    display: flex;
    /*margin: 1em;*/
  }
  .tt {
    height: 15%;
    width: 100%;
    /*position: fixed;*/
  }
  .tt_p {
    background: url('../../assets/images/keshi/u2.png') no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: relative;
    /*overflow: hidden;*/
    /*background-attachment: fixed;*/
  }
  span {
    color: rgb(129, 211, 248);
    /*display: inline;*/
    font-family: "Arial Negreta",serif;
    font-kerning: normal;
    font-size: 1em;
    font-style: normal;
    font-weight: 700;
  }
  .el-button {
    position: absolute;
    left: 0;
    top: -15px;
  }
</style>
