<template>
  <div class="examPage" v-if="examLength>0">
    <headerComponent :title="examInfo.examName"></headerComponent> 
    <div :class="isFixed?'fixedTop':''">
       <div class="exam-title" >
        <ul>
            <li>试卷总分：<span>{{examInfo.score}}</span></li>
            <li>试卷题数：{{examLength}}</li>
            <li>考生：{{examInfo.showname}}</li>
            <li>诊断时间：<span>{{Math.round(examInfo.paperTime/60/1000)}}分钟</span></li>
            <li>剩余时间：<span>{{leftTime}}</span></li>
        </ul>
        <ul class="exam-title-no-margin">
            <li class="exam-title-progress">完成进度：{{examInfo.progress}}% <div><em :style="{width: examInfo.progress+'%'}"></em></div></li>
        </ul>
        <div class="examhand xesBtn" @click="submitHandle" :data-xeslog-params="'key=xeslog-examing-pc&action=submit&click_id=2.2.1&exam_id='+examId+'&paper_id='+paperId">交卷</div>
    </div>
    </div>
    <div class="container">      
        <div class="exam-inner" :class="isFixed?'exam-innerTop':''">
            <div class="exam-inner-header" ref="submitElement">
                在线答题
            </div>
            <examContent :examList="examList"/>
        </div>
    </div>
    <el-dialog
        :title="dialogTitle"
        :closeOnClickModal="false"
        :closeOnPressEscape="false"
        :visible.sync="centerDialogVisible"
        class="dialogBox"
        :show-close="false"
        center>
        <span v-if="examInfo.hasAnswerNum > 0">{{dialogContent}}</span>
        <!-- 手动提交不能交白卷 -->
        <span v-if="examInfo.hasAnswerNum == 0" slot="footer" class="dialog-footer">
            <div class="sureBtn" @click="sureHandle">好的</div>
        </span>
        <!-- 不是白卷情况 -->
        <div v-if="examInfo.hasAnswerNum > 0" slot="footer" class="dialog-footer">
            <div v-if="!isMokao||!noTime" class="cancleBtn" @click="cancleHandle">{{cancleTitle}}</div>
            <div class="sureBtn" @click="sureHandle">{{isMokao?'好的':'确定'}}</div>
        </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<script>
import headerComponent from '@/components/headerCommon/index.vue'
import emitter from '@/mixins/emitter'
import examContent from './components/examContent.vue'
import {examApi} from '@/networks/api' 
import { mapState, mapActions, mapMutations } from 'vuex'
import getTokenExp from '@/util/getTokenExp.js'
import { Base64 } from 'js-base64'
export default {
  name: 'exam',
  componentName: 'exam',
  data () {
    return {
      isFixed: false, // 是否固定
      centerDialogVisible: false, // 是否显示弹框
      dialogTitle: '', // 弹框标题
      dialogContent: '', // 弹框内容
      leftTime: '', // 剩余时间
      timer: null, // 计时定时器
      noTime: false, // 时间到
      cancleTitle: '', // 返回标题
      logclickId: null, // 日志埋点clickid
      action: null // 日志埋点 action
    }
  },
  mixins: [emitter],
  components: {
    // 组件
    examContent,
    headerComponent
  },
  computed: {
    // 计算
    ...mapState({
      examInfo: state => state.ExamPage.examInfo,
      examLength: state => state.ExamPage.examLength,
      entranceTime: state => state.ExamPage.examInfo.entranceTime,
      paperTime: state => state.ExamPage.examInfo.paperTime,
      endTime: state => state.ExamPage.examInfo.endTime,
      nowDate: state => state.ExamPage.nowDate,
      isMokao: state => state.ExamPage.isMokao,
      answerStorage: state => state.ExamPage.answerStorage,
      paperId: state => state.ExamPage.examInfo.paperId,
      examList: state => state.ExamPage.examList
    }),
    examId () {
      return this.$route.params.examId
    }
  },
  methods: {
    // 方法事件
    ...mapActions({
      getExamData: 'getExamData'
    }),
    ...mapMutations({
      destroyExam: 'destroyExam' // 清空考试列表数据
    }),
    async submitHandle () { // 手动提交按钮
      await this.broadcast('blanFilling', 'blankBlur')
      if (this.examInfo.hasAnswerNum == this.examLength) {
        this.dialogTitle = '确定要交卷吗？'
        this.dialogContent = '交卷后不能修改'
        this.cancleTitle = '取消'
        this.logclickId = '2.2.2' // 手动点——提交试卷弹框确定按钮（全部答完题）
      } else if (this.examInfo.hasAnswerNum == 0) {
        this.dialogTitle = '不能交白卷' 
        this.logclickId = '2.2.6' // 手动点——不能交白卷 （还在当前页继续作答）
      } else {
        this.dialogTitle =
          '您还有' +
          (this.examLength - this.examInfo.hasAnswerNum) +
          '个题目未作答'
        this.dialogContent = this.isMokao ? '未做完就交卷可能会影响考试成绩哦' : '未做完就交卷可能会影响报名资格哦'
        this.cancleTitle = '取消'
        this.logclickId = '2.2.4' // 手动点——提交试卷弹框确定按钮（还有xx题未答）
      }
      this.centerDialogVisible = true
    },
    timeOver () { // 时间到弹框
      // console.log('ref="submitElement"', this.$refs.submitElement)
      if (this.isMokao) { // 是否是模考
         if (this.examInfo.hasAnswerNum == 0) {
          this.dialogTitle = '未在规定时间内作答，本次考试无效' // 时间到——未答题返回重新作答（返回到等待页，随到随考,模考）
          this.logclickId = '2.2.9'
        } else {
          this.dialogTitle = '答题时间已结束'
          this.dialogContent = '系统将为您自动交卷'
          this.logclickId = '2.2.7' // 时间到——已答题确定提交试卷（模考、随到随考）
        }
      } else {
        if (this.examInfo.hasAnswerNum == 0) {
          this.dialogTitle = '未在规定时间内作答，请退出重新考试' // 时间到——未答题返回重新作答（返回到等待页，随到随考,模考）
          this.logclickId = '2.2.9'
        } else {
          this.dialogTitle = '确定交卷吗？'
          this.dialogContent = '答题时间已结束'
          this.cancleTitle = '重新作答'
          this.logclickId = '2.2.7' // 时间到——已答题确定提交试卷（模考、随到随考）
        }
      }
       this.centerDialogVisible = true
    },
    sureHandle () { // 弹框按钮
      if (this.noTime) { // 答题时间到
          if (this.examInfo.hasAnswerNum == 0) { // 时间到未答一道题且 随到随考 模考
            localStorage.removeItem(this.answerStorage)
            this.action = 'submit-towait'
            this.xeslogFun()
            this.$router.replace({name: 'wait', params: {examId: this.$route.params.examId, courseId: this.$route.params.courseId}})
          } else { // 提交答案
              // 答题
              this.logclickId = '2.2.7'
              this.action = 'submit-sure'
              this.xeslogFun()
              this.submitPaper()
          }
      } else {
        if (this.examInfo.hasAnswerNum == 0) { // 不能交白卷
          this.centerDialogVisible = false
          this.logclickId = '2.2.6'  
          this.action = 'submit-cancle'
          this.xeslogFun()
        } else { // 提交答案
          this.action = 'submit-sure'
          this.xeslogFun()
          this.submitPaper()
        }       
      }
    },
    cancleHandle () { // 弹框按钮
        if (this.noTime) { // 重新作答
          this.action = 'submit-towait'
          this.logclickId = '2.2.8' // 时间到——已答题返回重新作答（返回到等待页，随到随考）
          this.xeslogFun()
          localStorage.removeItem(this.answerStorage)
          this.$router.replace({name: 'wait', params: {examId: this.$route.params.examId, courseId: this.$route.params.courseId}})
        } else { // 取消
          this.action = 'submit-cancle'
          this.logclickId = this.examInfo.hasAnswerNum ==  this.examLength ? '2.2.3' : '2.2.5' // 全部答完题取消按钮2.2.3，交白卷2.2.6，还有xx题未答取消2.2.5
          this.centerDialogVisible = false
          this.xeslogFun()
        }
    },
    xeslogFun () { // 提交试卷日志
        // console.log('ref="submitElement"', this.$refs.submitElement)
       let logData = {
          'elem': this.$refs.submitElement,
          'params': 'key=xeslog-examing-pc&action=' + this.action + '&click_id=' + this.logclickId + '&exam_id=' + this.examId + '&paper_id=' + this.paperId
        }
        window.xesWeb_eventLog.xesEventLog('click', logData)
    },
    async submitPaper () { // 提交试卷 
      try {
        clearInterval(this.timer)
        await getTokenExp(this.$store)
        // console.log('submitAnswer', JSON.stringify(this.$store.state.ExamPage.examStorage.answerSheet))
        const response = await examApi.submitPaper({
          examId: this.$route.params.examId,
          answer: JSON.stringify(this.$store.state.ExamPage.examStorage.answerSheet),
          paperId: this.$store.state.ExamPage.examInfo.paperId
        })
        // console.log('submitPaperData', response.data)
        localStorage.removeItem(this.answerStorage)
        if (response.data.code == 0 || response.data.code == 1003) {
          this.$router.replace({name: 'report', params: {courseId: this.$route.params.courseId, recordId: response.data.data.recordId}})
        } else if (response.data.code == 1002){ // 诊断未开始
          this.$router.replace({name: 'wait', params: {examId: this.$route.params.examId, courseId: this.$route.params.courseId}})
        }
      } catch (e) {
        console.log(e)
        const { response: { status } } = e
        if (status === 401) {
          window.location.href = 'https://login.mangoya.com/login/' + Base64.encode(window.location.href)     
        }
      }
    },
    computedTime (t) { // 计算分秒
      var h = Math.floor(t / 1000 / 60 / 60) // 时
      var m = h * 60 + Math.floor((t / 1000 / 60) % 60) // 分
      var s = Math.floor((t / 1000) % 60) // 秒
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    },
    restTime () { // 剩余时间倒计时计算
      let entranceTime = new Date(this.entranceTime).getTime()
      // 大于 60分钟 重新计时 加载新的试卷
      // 小于 60分钟 继续走时间
      // console.log('answerTime', this.entranceTime, entranceTime, new Date(this.nowDate).getTime(), this.nowDate)
      let timeDiffernce = new Date().getTime() - new Date(this.nowDate).getTime() // 本地时间和服务器始时间的时差
      let nowTime = new Date().getTime() - timeDiffernce 
      // 剩余时间
      if (this.isMokao) {
        var t = new Date(this.endTime).getTime() - nowTime
      } else {
        var t = this.paperTime - (nowTime - entranceTime)
      }
      this.leftTime = this.computedTime(t)
      // console.log('t-----', t)
      this.timer = setInterval(() => { // 剩余时间倒计时  
        if (t >= 0) {
          this.leftTime = this.computedTime(t)
          this.noTime = false
          t-=1000
        } else {
          this.leftTime = '00:00'
          clearInterval(this.timer)
          this.timer = null
          this.noTime = true
          // 时间到 交卷
          this.timeOver()
        }
        // console.log('time', t, this.leftTime)
      }, 1000)
    },
    async InitData () { // 获取时间列表
      // console.log('this.$route.params.courseId', this.$route.params.courseId)
      await this.getExamData(this.$route.params.examId, this.$route.params.courseId)
      // console.log('lalal', this.examInfo, this.$store.state.ExamPage.examList)
      this.restTime()
      this.$nextTick(function () {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub])
      })
    }
  },
  mounted () {
    // 加载完成
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
    this.destroyExam()
    window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.2&pageaction=leave')
  },
  created () {   
    // console.log('router', this.$route)
    this.$on('stopAllAudio', () => {
      this.broadcast('audio-player', 'audio.stop')
    })
    this.$on('blurAllBlank', () => {
      this.broadcast('blanFilling', 'blankBlur')
    })
    this.InitData()
    var that = this
    window.onscroll = function () { // 考试时间吸顶
      var t = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(t)
      if (t > 150) {
        that.isFixed = true
      } else {
        that.isFixed = false
      }
    }
     window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.2&pageaction=enter')
  }
}
</script>

<style lang='less'>
.examPage {
  .exam-title {
    width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    padding: 20px 40px 20px 40px;
    position: relative;
    ul {
      font-size: 0;
      margin-bottom: 18px;
      li {
        display: inline-block;
        width:auto;
        margin-right: 50px;
        font-size: 18px;
        // font-weight: 600;
        line-height: 24px;
        color: #333333;
        span {
          color: #f0773c;
        }
      }
      li.exam-title-progress {
        width: auto;
        div {
          width: 400px;
          height: 12px;
          border-radius: 6px;
          background: #f1f1f1;
          display: inline-block;
          em {
            height: 12px;
            width: 0;
            display: block;
            background-image: linear-gradient(
              -269deg,
              #f13232 50%,
              #f0773c 100%
            );
            border-radius: 6px;
          }
        }
      }
    }
    .examhand {
      position: absolute;
      right: 60px;
      top: 50%;
      transform: translate(0, -50%);
    }
    ul.exam-title-no-margin{
      margin-bottom: 0;
    }
  }
  .fixedTop {
    width: 100vw;
    background: #ffffff;
    top: 0px;
    z-index: 10;
    position: fixed;
    border-bottom: 1px solid #f1f1f1;
  }
  .exam-inner {
    background: #ffffff;
    margin-top: 25px;
    margin-bottom: 60px;
    padding: 0 30px;
    position: relative;
    .exam-inner-header {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #f1f1f1;
      font-size: 20px;
      margin-bottom: 40px;
    }
  }
  .exam-innerTop {
    margin-top: 230px;
  }
}
</style>
