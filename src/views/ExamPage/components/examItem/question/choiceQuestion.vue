<template>
  <div class="choiceQuestion"> 
    <!-- 选项 -->
    <div v-for="(item, index) in examItem.option" :key="index + examItem.id"  @click="choseHandle(examItem.id, item.label)" :class="['choice-answer-item', answer.includes(item.label)? 'choice-active': '']" 
      :data-xeslog-params="'key=xeslog-examing-pc&action=choice-option&click_id=2.1.1&exam_id='+examId+'&test_id='+examItem.id+'&answer_content='+item.label">
      <span class="choice-answer-label">{{item.label}}</span>
      <div class="choice-answer-inner" v-html="getRegFun(item.content)"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import emitter from '@/mixins/emitter'
import {getRegFun} from '@/util/reg.js'

export default {
  name: 'choiceQuestion',
  componentName: 'choiceQuestion',
   mixins: [emitter],
  data () {
    return {
      answer: []
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
    getRegFun,
    choseHandle (questionId, label) { // 选择选项
      this.dispatch('exam', 'blurAllBlank')
      // console.log('选择题答案', questionId, label, this.answer.includes(label))
      if (this.examItem.choiceType == 1) { // 1单选 2多选
          this.answer = [label]
      } else {
          if (this.answer.includes(label)) {
              this.answer.splice(this.answer.indexOf(label), 1)
          } else {
            this.answer.push(label)
          }
      }
      this.saveAnswerSheet({questionId: questionId, answer: this.answer})
    },
    ...mapMutations([
      'saveAnswerSheet'
    ])
  },
  mounted () { // 加载完成

  },
  created () { // 创建
    // console.log('选择题', this.examItem.answer, this.answer)
    this.answer = [...this.examItem.answer]
  }
}
</script>

<style lang='less'>
.choiceQuestion{
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #F1F1F1;
  font-size: 0;
  .choice-answer-item{
    vertical-align: top;
    font-size: 17px;
    color: #333333;
    line-height: 22px;
    width: 555px;
    display: inline-block;
    min-height: 40px;
    padding: 13px 20px 13px 50px;
    position: relative;
    border: 1px solid #F1F1F1;
    background: #ffffff;
    border-radius: 4px;
    margin: 0 0 20px 0; 
    box-sizing: border-box;
    // margin: 0 30px 20px 0;
    cursor: pointer;
    &:hover{
      border: 1px solid #FF6E24;
      background: #FFF8F5;
      transition: .3s all ease;
    }
    .choice-answer-label{
      font-weight: 600;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .choice-answer-inner{  
      position: relative;
      overflow-x: auto;
      overflow-y: hidden;
      line-height: 22px;
      width: 100%;
      height: auto;
      margin: 0;
      img{
        box-sizing: border-box;
        max-width: 100%;
        // height: auto;
        object-fit: contain;
        vertical-align: middle;
        // padding: 0 5px;
      }
    }
  }
  .choice-answer-item:nth-of-type(odd){
      margin-right:30px;
  }
  .choice-active{
    border: 1px solid #FF6E24;
    background: #FFF8F5;
  }
}
</style>
