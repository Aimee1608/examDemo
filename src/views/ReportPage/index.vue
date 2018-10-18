<template>
  <div v-if="reportResult">
    <headerComponent :title="reportResult.examName"></headerComponent> 
    <div class="container" ref="logElement">
      <!-- 诊断结果 -->
      <!-- 通过 -->
      <div v-if="reportResult.isPass==1" class="reportResult clear" :class="reportResult.showScore == 1?'reportResult-score': ''">
        <div class="result-inner">
          <b v-if="reportResult.showScore == 1">{{reportResult.score}}<em>分</em></b> 
          <img v-if="reportResult.showScore == 2" src="../../assets/pass.png" alt=""> 
          <span>恭喜，{{reportResult.username}}（{{reportResult.stuId}}）同学已通过诊断</span>
        </div>
        <a :href="reportResult.orderUrl" target="_blank" class="result-gobtn" :data-xeslog-params="'key=xeslog-examreport-pc&action=signup&recordid='+recordId+'&courseid='+courseId+'&click_id=3.1.1&click_url='+ reportResult.orderUrl">立即报名</a> 
      </div>
      <!-- 未通过 或没课程-->
      <div v-if="reportResult.isPass==0" class="reportResult clear" :class="reportResult.showScore == 1?'reportResult-score': ''">
        <div class="result-inner">
          <b v-if="reportResult.showScore == 1">{{reportResult.score}}<em>分</em></b> 
          <img v-if="reportResult.showScore == 2" src="../../assets/nopass.png" alt=""> 
          <span>根据诊断结果，{{reportResult.username}}（{{reportResult.stuId}}）同学更适合报</span>
        </div>
        <span class="result-class">{{reportResult.className}} <em v-if="reportResult.scoreSection&&reportResult.scoreSection.length>0" class="el-icon-question" @mouseover="overShow" ref="questionIcon"></em>
          <div v-if="reportResult.scoreSection&&reportResult.scoreSection.length>0" class="result-class-cutoffScore">
            <em></em>
            <p>针对本次诊断推荐的分数线班型为:</p>
            <ul>
              <li v-for="(item, index) in reportResult.scoreSection" :key="index" >
                 <span v-if="index < reportResult.scoreSection.length-1">{{item.score}} — {{reportResult.scoreSection[index+1].score}}分— {{item.name}}</span>
                 <span v-else>{{item.score}} — {{reportResult.totalPoints}}分— {{item.name}}</span>
              </li>
            </ul>
          </div>
        </span>
      </div>
      <!-- 推荐课程 -->
      <recommendCourse></recommendCourse>
      <!-- 诊断分析 -->
      <reportAnalysis></reportAnalysis>
      <!-- 错题分析 -->
      <paperAnalysis></paperAnalysis>
    </div>
  </div>
</template>

<script>
import {resultApi} from '@/networks/api'
import reportAnalysis from './components/reportAnalysis.vue'
import paperAnalysis from './components/paperAnalysis.vue'
import recommendCourse from './components/recommendCourse.vue'
import headerComponent from '@/components/headerCommon/index.vue'
import emitter from '@/mixins/emitter'
// import '@/MockData/mockData.js'
import { mapState } from 'vuex'
export default {
  name: 'result',
  componentName: 'result',
  data () {
    return {
      reportResult: null,
      firstBottom: false
    }
  },
  mixins: [emitter],
  components: { // 组件
    reportAnalysis,
    paperAnalysis,
    recommendCourse,
    headerComponent
  },
  computed: { // 计算
    ...mapState({
      examId: state => state.ResultPage.examId
    }),
    recordId () {
      return this.$route.params.recordId
    },
    courseId () {
      return this.$route.params.courseId ? this.$route.params.courseId : 0
    } 
  },
  methods: { // 方法事件
     async getReport () {
			try {
				const response = await resultApi.getReport({
          recordId: this.$route.params.recordId,
          courseId: this.$route.params.courseId
        })
        // console.log('reportResult分数结果', response.data)
        if (response.data.code == 0) {
          this.reportResult = response.data.data
        } else {
          console.log(response.data)       
        }
			} catch (e) {
				console.log(e)
			}
    },
    overShow () { // 问哈日志打点
      // console.log('this.$refs.questionIcon', this.$refs.questionIcon)
      var logData = {
        'elem': this.$refs.questionIcon,
        'params': 'key=xeslog-examreport-pc&click_id=3.1.3'
      }
      window.xesWeb_eventLog.xesEventLog('click', logData)
    }
  },
   beforeDestroy () { // 销毁前 
    window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.3&pageaction=leave')
  },
  mounted () { // 滑到底部日志打点
    let that = this
    window.onscroll = function () {
      let scrollHeight = document.body.scrollHeight - document.documentElement.clientHeight
      let t = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(t)
      // console.log('scrollHeight', scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight)
      if (t >= scrollHeight) {
        if (this.firstBottom) return
        // console.log('到底了')
        let logData = {
          'elem': that.$refs.logElement,
          'params': 'key=xeslog-examreport-pc&click_id=3.1.5'
        }
        window.xesWeb_eventLog.xesEventLog('click', logData)
         this.firstBottom = true
      } 
    }
  },
  created () { // 创建
    this.$on('stopAllAudioResult', () => {
      this.broadcast('audio-player', 'audio.stop')
    })
    this.getReport()
    window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.3&pageaction=enter')
  }
}
</script>

<style lang='less'>
.reportResult{
  background: #ffffff;
  margin-top: 20px;
  padding: 18px 120px 18px 50px;
  .result-inner{
    float: left;
    display: inline-block;
    span{
      color: #333333;
      font-size: 23px;
      line-height: 32px;
      // font-weight: 600;   
      vertical-align: middle;
    }
    img{
      vertical-align: middle;
      margin-right: 40px;
      width: 63px;
      height: 82px;
    }      
  }
  
  .result-gobtn{       
    float: right;
    width: 120px;
    height: 38px;
    margin-top: 22px;
    color: #ffffff;
    font-size: 16px;
    // font-weight: 600;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    background-image:linear-gradient(-269deg, #F13232 50%, #F0773C 100%);
  }
  .result-class{
    float: left;
    color: #FF6E24;
    font-size: 30px;
    // font-weight: 600;
    position: relative;
    margin-top: 19px;
    .el-icon-question{
      color: #F13232;
      font-size: 15px;
      margin-top: -2px;
      width: 30px;
      height: 20px;
      cursor: pointer;
    }
    .el-icon-question:hover + .result-class-cutoffScore{
      display: block;
    }
    .result-class-cutoffScore{
      display: none;
      position: absolute;
      left: calc(100% + 8px);
      top: 50%;
      transform: translate(0, -50%);
      font-size:17px;
      padding: 20px 15px;
      min-width: 300px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow:0 0 18px 0 rgba(0, 0, 0, 0.14);
      z-index: 4;
      em{
        display: inline-block;
        border: 10px solid transparent;
        border-right: 16px solid #ffffff;
        width: 0;
        height: 0;
        position: absolute;
        left: -19px;
        top: 50%;
        transform: translate(0, -50%);
      }
      p{
        color: #9B9B9B;
        margin-bottom: 10px;
      }
      ul{
        li{
          color: #000000;
          // font-weight: 600;
          line-height: 30px;
        }
      }
    }
  }
}
.reportResult-score{
  padding: 0 120px 0 50px;
  height: 118px;
  .result-inner{
      height: 100%;
      line-height: 118px;
      display: -webkit-flex;
      display: flex;
    b{
      color: #F13232;
      font-size: 72px;
      line-height: 118px;
      font-weight: 600;
      margin-right: 33px;
      em{
        font-size: 14px;
        font-weight: normal;
      }
    }
    span{
      line-height: 118px;
    }
  }
  .result-gobtn{
    margin-top: 40px;
  }
  .result-class{
    margin-top: 35px;

  }
}
</style>
