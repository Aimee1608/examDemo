<template>
  <div>
    <xueHeader></xueHeader>   
    <div class="container">
      <errorCommon :stat="stat" :description="description"></errorCommon>
    </div>
  </div>
</template>

<script>
import xueHeader from '@/components/xueCommon/GlobalNav.vue'
import errorCommon from '@/components/errorCommon/error.vue'

export default {
  name: 'error',
  data () {
    return {

    }
  },
  components: { // 组件
    xueHeader,
    errorCommon
  },
  computed: { // 计算
   
  },
  methods: { // 方法事件
    
  },
  mounted () { // 加载完成

  },
  created () {
    // console.log('this.$route.params', this.$route)
    this.stat = this.$route.query.stat ? this.$route.query.stat : null
    this.description = this.$route.query.description ? this.$route.query.description : '页面错误'
     window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageid=1.1.4')
  }
}
</script>

<style lang='less'>
.descriptionBox{
    margin-top: 50px;
}
</style>
