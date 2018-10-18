<template>
  <div>
      <div class="question-title">
        <div class="question-title-inner" v-html="getRegFun(examNum+'、'+examItem.stem)"></div>
        <audioPlayer
          v-if="examItem.audio && examItem.audio.length > 0"
          v-for="audio in examItem.audio"
          :key="audio.key"
          class="audio" :src="audio.value"/>
      </div> 
      <choiceQuestion v-if="examItem.type == 2" :examItem="examItem" :examNum="examNum"/>
      <blankFilling  v-else  :examItem="examItem" :examNum="examNum"/>
  </div>
</template>

<script>
import audioPlayer from '@/components/audio-player'
import blankFilling from './question/blankFilling.vue'
import choiceQuestion from './question/choiceQuestion.vue'
import {getRegFun} from '@/util/reg.js'

export default {
  name: 'examQuestion',
  componentName: 'examQuestion',
  data () {
    return {

    }
  },
  components: { // 组件
    blankFilling,
    choiceQuestion,
    audioPlayer
  },
  props: ['examItem', 'examNum'],
  computed: { // 计算

  },
  methods: { // 方法事件
    getRegFun
  },
  mounted () { // 加载完成

  },
  created () { // 创建
    // console.log('所有题目', this.examItem)

  }
}
</script>

<style lang='less'>

</style>
