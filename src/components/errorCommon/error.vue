<template>
      <!-- 诊断过期 -->
        <div v-if="stat == 1001" class="error-expired error-box-inner">
            <img src="../../assets/monkey-cry.svg" alt="">
            <p>{{description}}</p>
        </div>
        <!-- 还未报名 -->
         <div v-else-if="stat == 1004" class="error-expired-1004 error-box-inner">
            <img src="../../assets/monkey-smile.svg" alt="">
            <p><span>名额有限你还没有报名哦</span><a class="xesBtn" :href="description" :data-xeslog-params="'key=xeslog-examwait-pc&action=click-exam-signup&click_id=1.3.1&click_url='+description">立即报名</a></p>
        </div>
        <!-- 诊断未开始 -->
        <div v-else-if="stat == 1002" class="error-nobeginning error-box-inner">
            <img src="../../assets/monkey-smile.svg" alt="">
            <pre v-html="description"></pre>
        </div>
        <!-- 其他情况 -->
         <div v-else class="error-nobeginning error-box-inner">
            <img src="../../assets/monkey-smile.svg" alt="">
            <p v-html="description"></p>
        </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['description', 'stat'],
  components: { // 组件

  },
  computed: { // 计算

  },
  methods: { // 方法事件

  },
  mounted () { // 加载完成

  },
  created () { // 创建

  }
}
</script>

<style lang='less' scoped>
.error-box-inner{
    margin-top: 50px;
    margin-bottom: 73px;
    height: 804px;
    font-size: 23px;
    line-height: 32px;
    // font-weight: 600;
    background: #ffffff;
    padding-top: 212px;
    // display: -webkit-flex;
    // display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    p{
        width: 100%;
        display: block;
        text-align: center;
        padding: 0 30px;
    }
    pre{
        text-align: center;
         padding: 0 50px;
    }
    img{
        width: 232px;
        height: 169px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 33px;
    }
}
.error-expired-1004{
    a{
        display: inline-block;
        margin-left: 5px;
    }
}
</style>
