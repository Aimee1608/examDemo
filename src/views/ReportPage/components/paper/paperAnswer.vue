<template>
  <div class="paper-item-answer" >
    <div class="answer-title" >你的答案 <span v-if="!item.stuAnswer||item.stuAnswer.length==0||isAllNoanswer(item.stuAnswer)" class="paper-item-answer-noanswer"> 未作答</span></div>
    <div v-if="item.stuAnswer&&item.stuAnswer.length>0&&!isAllNoanswer(item.stuAnswer)">
      <!-- 填空题 -->
      <div class="answer-inner" v-for="(aitem, aindex) in item.stuAnswer" :key="aindex+aitem.content"  v-if="!aitem.label"  :class="aitem.right? 'answer-inner-right': 'answer-inner-error'">
        <span class="answer-inner-blank-content" v-html="getRegFun(aitem.content?aitem.content:'未作答')"></span><em :class="aitem.right? 'el-icon-check':'el-icon-close'"></em>
      </div> 
      <!-- 选择题 -->
      <div class="answer-inner" v-for="(aitem, aindex) in item.stuAnswer" :key="aindex+aitem.content" v-if="aitem.label" :class="item.right? 'answer-inner-right': 'answer-inner-error'">
        <b v-if="aitem.label" class="answer-inner-choice-label">{{aitem.label}}</b><div class="answer-inner-choice-content" v-html="getRegFun(aitem.content?aitem.content:'未作答')"></div><em :class="item.right? 'el-icon-check':'el-icon-close'"></em>
      </div>  
    </div>
    <!-- 正确答案 -->
    <div class="answer-title" v-if="item.answer&&item.answer.length>0">正确答案</div>  
    <div v-if="item.answer&&item.answer.length>0">
      <div class="answer-inner answer-inner-material" v-for="(ritem, rindex) in item.answer" :key="rindex+ritem.content">
        <b v-if="ritem.label" class="answer-inner-choice-label">{{ritem.label}}</b><div :class="ritem.label ? 'answer-inner-choice-content' : 'answer-inner-blank-content'" v-html="getRegFun(ritem.content)"></div>
      </div>
    </div>
    <!-- 解析 -->
    <div class="answer-analysis" v-if="item.analysis">
        <div class="answer-analysis-title">解析</div>
        <div class="answer-analysis-inner" v-html="getRegFun(item.analysis)"></div> 
        <audioPlayer
        v-if="item.analyticAudio && item.analyticAudio.length > 0"
        v-for="audio in item.analyticAudio"
        :key="audio.key"
        class="audio" :src="audio.value"/>
    </div>
  </div>
</template>

<script>
import audioPlayer from '@/components/audio-player'
import {getRegFun} from '@/util/reg.js'

export default {
  name: 'paperAnswer',
  data () {
    return {

    }
  },
  props: ['item'],
  components: { // 组件
    audioPlayer
  },
  computed: { // 计算

  },
  methods: { // 方法事件
    getRegFun,
    isAllNoanswer (stuAnswer) {
      let nonum = 0
      stuAnswer.map((item) => {
        if (!item.content) {
          nonum++
        }
      })
      return nonum == stuAnswer.length
    }
  },
  mounted () { // 加载完成

  },
  created () { // 创建
    // console.log('paperAnswer----', this.item)
  }
}
</script>

<style lang='less'>
.paper-item-answer{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #F1F1F1;
  text-overflow:ellipsis;
  word-break: break-all; 
  word-wrap: break-word; 
  // white-space: pre-wrap;
  .answer-title{
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 5px;
    .paper-item-answer-noanswer{
      font-weight: normal;
      color: #666666;
    }
  }
  .answer-inner{
    padding: 12px 20px;
    border-radius: 4px;
    min-width: 336px;
    display: inline-block;
    margin-right: 30px;
    box-sizing: border-box;
    color: #333333;
    background: #ffffff;
    font-size: 17px;
    line-height: 24px;
    margin-bottom: 10px;
    position: relative;
    vertical-align: top;
    .el-icon-close, .el-icon-check{
      position: absolute;
      right: 0;
      top: 0;      
      width: 18px;
      height: 100%;
      line-height: 100%;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      color: #ffffff;
      // border-radius: 0 4px 4px 0;
      // display: -webkit-flex;
      // display: flex;
      // -webkit-align-items: center;
      // align-items: center;
      // -webkit-justify-content: center;
      // justify-content: center;
      &::before{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
      }
    }
    .answer-inner-choice-label{
      width: 30px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%)
    }
    .answer-inner-blank-content{
      display: inline;
      line-height: 24px;
    }
    .answer-inner-choice-content{
      display: inline-block;
      line-height: 24px;
      margin-left: 30px;
    }
    img{
      // margin: 5px;
      max-width: 100%;
      object-fit: contain;
      // height: auto;
      vertical-align: middle;
    }
  }
  .answer-inner-material{
    border: 1px solid #eeeeee;      
  }
  .answer-inner-right{
    border: 1px solid #49C235;
    font-weight: 600;
    background: rgba(73, 194, 53, 0.05);
    padding-right: 24px;
    .el-icon-check{        
      background: #49C235;     
    }
  }
  .answer-inner-error{
    border: 1px solid #FF0021;
    font-weight: 600;
    background: rgba(255, 0, 33, 0.05); 
    padding-right: 24px;
    .el-icon-close{        
      background: #FF0021;     
    }
  }
  .answer-analysis{   
     background: #FFF4E2;
     border-radius: 4px;
     padding: 18px 25px;
     margin-top: 20px;
    .answer-analysis-title{
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .answer-analysis-inner{ 
      color: #666666;
      font-size: 14px;
      line-height: 20px;
      min-height: 20px;
      overflow-x: auto;
      overflow-y: hidden;
      img{
        // margin: 5px;
        max-width: 100%;
        object-fit: contain;
        // height: auto;
        vertical-align: middle;
      }
    }
    
  }
}
</style>
