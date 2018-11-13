<template>
  <div class="headerCommon">
      <div class="container clear">
          <div class="logo">
               <a  href="https://www.mangoya.com" data-xeslog-params="key=xeslog-headAndSidebar-www&click_url=https://www.mangoya.com&click_id=1.8.1&target_id=1.1&api_id=1.2.0"><img  src="../../assets/logo.svg" alt=""></a>
          </div>
          <div class="headerCommon-title">{{title}}</div>
      </div>  
  </div>
</template>

<script>
export default {
  name: 'titleHeader',
  data () {
    return {
        // title: '初一英语暑秋班入学诊断卷'
    }
  },
  props: ['title'],
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

<style lang='less'>
.headerCommon{
    background: #ffffff;
    min-width: 1200px;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: 50px;
    .logo{
        height: 100px;
        float: left;
        height: 100px;
        line-height: 100px;
        margin-right: 50px;
        overflow: hidden;
        img{
            width: 170px;
            vertical-align: middle;
        }
    }
    .headerCommon-title{
        float: left;
        height: 100px;
        line-height: 100px;
        color: #333333;
        font-size: 24px;
        // font-weight: 600;
    }
    
}
</style>
