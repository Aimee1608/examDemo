<template>
  <div class="blankFilling">
    <div class="blankFilling-item" v-for="(item, index) in examItem.optionNum" :key="index+examItem.id">
      <span class="blankFilling-item-num"  ref="inputElement">{{num[index]}}</span>
        <el-input
          ref="blankFilling"
          class="blankFilling-item-inner"
          placeholder="请输入内容"
          :max="100"
          v-model="examItem.answer[index]"
          @input.native="xeslogFun(examItem.id, index)"
          @change="fillHandle(examItem.id, index)"
          clearable>
        </el-input>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import emitter from '@/mixins/emitter'

export default {
  name: 'blanFilling',
  componentName: 'blanFilling',
  mixins: [emitter],
  data () {
    return {
      num: [
        '①',
        '②',
        '③',
        '④',
        '⑤',
        '⑥',
        '⑦',
        '⑧',
        '⑨',
        '⑩',
        '⑪',
        '⑫',
        '⑬',
        '⑭',
        '⑮',
        '⑯',
        '⑰',
        '⑱',
        '⑲',
        '⑳'
      ],
      isTime: false
    }
  },
  props: ['examItem', 'examNum'],
  components: { // 组件

  },
  computed: { // 计算
    examId () {
      return this.$route.params.examId
    }
  },
  methods: { // 方法事件
    fillHandle (questionId, index) { // 选择选项
      this.$set(this.examItem.answer, index, this.examItem.answer[index].trim())
      // console.log('填空题答案', questionId, this.examItem.answer)
      this.saveAnswerSheet({questionId: questionId, answer: this.examItem.answer})    
    },
    xeslogFun (questionId, index) { // 日志打点
      event.returnValue = true
    //  event.preventDefault()
      // console.log('填空题答案-日志打点', questionId, this.examItem.answer, this.$refs.inputElement[index], this.isTime)   
      if (this.isTime) {
       return 
      } 
      this.isTime = true
      let timer = setTimeout(() => {
        var logData = {
          'elem': this.$refs.inputElement[index],
          'params': 'key=xeslog-examing-pc&action=text&click_id=2.1.2&exam_id=' + this.examId + '&test_id=' + questionId + '&answer_content=' + this.examItem.answer[index].trim()
        }
        window.xesWeb_eventLog.xesEventLog('click', logData, questionId, index) 
        // console.log('打点', 6666666)
        this.isTime = false
        clearTimeout(timer)
      }, 1000)
    },
    ...mapMutations([
      'saveAnswerSheet'
    ])
  },
  mounted () { // 加载完成

  },
  created () { // 创建
    // console.log('填空题', this.examItem, this.examItem.answer)
    this.$on('blankBlur', () => { // input  失去焦点 
      this.$refs.blankFilling.map((item) => {
        // console.log('blankBlur')
        item.blur()
      })
    })
    if (this.examItem.answer.length <= 0) {
      for (var i = 0; i < this.examItem.optionNum; i++) {
        this.examItem.answer.push('')
      }
      // console.log('optionNum', this.examItem.answer)
    }
  }
}
</script>

<style lang='less'>
.blankFilling{
  margin-top: -13px;
  padding-bottom: 7px;
  margin-bottom: 40px;
  border-bottom: 1px solid #F1F1F1;
  .blankFilling-item{
    font-size: 16px;
    position: relative;
    width: 335px;
    display: inline-block;
    padding: 13px 20px 13px 37px;
    margin: 0 30px 20px 0;
    .blankFilling-item-num{
        font-size: 24px;
        line-height: 33px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%)
    }
    .blankFilling-item-inner{
      input{
        border: 1px solid #F1F1F1;
        background: #ffffff;
        height: 44px;
        line-height: 44px;
      }
      input:focus{
        border-color: #FF6E24;
        outline: 0;
      }
    } 
  } 
}
</style>
