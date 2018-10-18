<template>
  <div class="recommendCourse" v-if="recommendCourseData&&recommendCourseData.length>0">
    <div class="recommend-title">根据诊断结果，这些课程更适合您：<span v-if="recommendCourseData.length>6" class="recommend-title-more" @click="addMore" data-xeslog-params="key=xeslog-examreport-pc&click_id=3.1.4">{{showMoreText}}</span></div>
    <div class="recommend-list">
      <CourseCard v-for="(item, index) in recommendCourseData" :key="item.id" :data="item" :courseNum="index+1" v-if="index<showLength"/>
    </div>
  </div>
</template>

<script>
import CourseCard from '@/components/xueCommon/CourseCard.vue'
import {resultApi} from '@/networks/api'
export default {
  name: 'recommendCourse',
  data () {
    return {
      recommendCourseData: null,
      showLength: 6,
      showMoreText: '查看更多课程'
    }
  },
  components: { // 组件
    CourseCard
  },
  computed: { // 计算

  },
  methods: { // 方法事件
    async getrecommendCourse () { // 获取推荐课程数据
			try {
				const response = await resultApi.getrecommendCourse({
					recordId: this.$route.params.recordId
        })
        // console.log('report推荐课程', response.data)
        if (response.data.code == 0) {
          this.recommendCourseData = response.data.data         
          // console.log('recommendCourse', this.recommendCourseData)
        }
			} catch (e) {
				console.log(e)
			}
    }, 
    addMore () { // 查看更多
      this.showLength = this.recommendCourseData.length
      this.showMoreText = '已展示所有课程'
    }
  },
  mounted () { // 加载完成

  },
  created () {
    this.getrecommendCourse()
  }
}
</script>

<style lang='less'>
.recommendCourse{
  .recommend-title{
    margin-top: 20px;
    color: #000000;
    font-size: 17px;
    height: 70px;
    line-height: 70px;
    position: relative;
    padding-left: 20px;
    background: #ffffff;
    .recommend-title-more{
      position: absolute;
      right: 30px;
      top: 0;
      font-size: 15px;
      color: #666666;
      cursor: pointer;
    }
    .recommend-title-more:hover{
      color: #F13232;
    }
  }
  .recommend-list{
    margin-top: 20px;
    margin-left: -5px;
    margin-right: -5px;
  }
}
</style>
