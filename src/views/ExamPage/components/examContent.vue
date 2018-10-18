<template>
  <div class="examContent" >
      <div v-for="item in examList" :key="item.id">
          <!-- 大标题 -->
          <div class="examContent-title" v-if="item.name">{{item.name + (item.description? ' ('+item.description + ')' : '')}}</div>
          <!-- 非材料题题目-->  
          <examQuestion v-for="titem in item.testLists" :key="titem.id" :examItem="titem" :examNum="titem.examNum"/>
          <!-- 材料题 -->
          <div v-for="(mitem, mindex) in item.materialList" :key="mindex" >
            <div class="question-title">
              <div v-if="mitem.content" v-html="getRegFun(mitem.examNum+'、'+mitem.content)" class="question-title-inner"></div>
              <audioPlayer
                v-if="mitem.audio&&mitem.audio.length>0"
                v-for="audio in mitem.audio"
                :key="audio.key"
                class="audio" :src="audio.value"/>
            </div>
            <examQuestion  v-for="qitem in mitem.testLists" :key="qitem.id" :examItem="qitem" :examNum="qitem.examNum"/>
          </div>         
      </div>
  </div>
</template>

<script>
import examQuestion from './examItem/examQuestion.vue'
import audioPlayer from '@/components/audio-player'
import {getRegFun} from '@/util/reg.js'

export default {
  name: 'examContent',
  componentName: 'examContent',
  data () {
    return {
      isMaterial: true,
      type: 1,
      isAudio: false,
      name: ''
    }
  },
  props: ['examList'],
  components: { // 组件
    examQuestion,
    audioPlayer
  },
  computed: { // 计算
   
  },
  methods: { // 方法事件
    getRegFun
  },
  mounted () { // 加载完成
    
  },
  created () { // 创建

  }
}
</script>

<style lang='less'>
.examContent{
  text-overflow:ellipsis;
  word-break: break-all; 
  word-wrap: break-word; 
  // white-space: pre-wrap;
  .examContent-title{
    margin-bottom: 20px;
    color: #9B9B9B;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
}
</style>
