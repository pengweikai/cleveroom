<template>
    <div class="back">
        <Backer></Backer>
        <MainContent></MainContent>
<!--      <div  class="m2">-->
<!--        <iframe-->
<!--          id="iframe"-->
<!--          ref="iframe"-->
<!--          class="iframe"-->
<!--          src="/static/testwebgl_2019/index.html"-->
<!--          width="100%"-->
<!--          height="100%"-->
<!--          frameborder="0"-->
<!--          scrolling="auto"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="hh">-->
<!--        <unity-->
<!--          ref="unityVue"-->
<!--          src="C:\Users\86134\Desktop\智能物联网\cleveroom-vue—pwk1\cleveroom-vue\static\testwebgl_2019\Build\testwebgl_2019.json"-->
<!--          width="100%"-->
<!--          height="450px"-->
<!--          unity-loader="C:\Users\86134\Desktop\智能物联网\cleveroom-vue—pwk1\cleveroom-vue\static\testwebgl_2019\Build\UnityLoader.js"-->
<!--        />-->
<!--      </div>-->
    </div>

</template>

<script>
  import Backer from './navBacker'
  import MainContent from './MainContent'
  // import Unity from 'vue-unity-webgl'
export default {
    name: 'Keshihua',
    // components: {MainContent, Backer,Unity},
  components: {MainContent, Backer},
    props: {
      msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.back {
  background: url("../../assets/images/keshi/u1.png") no-repeat center;
  height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
}
/*.m2 {*/
/*  height:60%;*/
/*  width: 100%;*/
/*}*/
/*.hh {*/
/*  height: 40%;*/
/*}*/


</style>
