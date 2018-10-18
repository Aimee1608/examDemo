<template>
  <div class="paper-item-title">
      <h1 class="paper-item-title-module"><b v-if="item.module">[{{item.module}}]</b> 题号：{{item.examNum}}</h1>
      <h2 class="paper-item-title-inner" v-if="item.stem||item.content">
        <span class="paper-item-title-label">{{item.stem?'题目：':'材料：'}}</span>
        <div class="paper-item-title-content" v-html="getRegFun(item.stem ? item.stem : item.content)"></div>
      </h2>
     <audioPlayer
        v-if="item.audio && item.audio.length > 0"
        v-for="audio in item.audio"
        :key="audio.key"
        class="audio" :src="audio.value"/>
  </div>
</template>

<script>
import audioPlayer from '@/components/audio-player'
import {getRegFun} from '@/util/reg.js'

export default {
  name: 'paperTitle',
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
    getRegFun
  },
  mounted () { // 加载完成

  },
  created () { // 创建

  }
}
</script>

<style lang='less'>
.paper-item-title{ 
  .paper-item-title-module{
    color: #333333;
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 8px;
    b{
      color: #F13232;
    }
  }
  .paper-item-title-inner{
    color: #666666;
    font-size: 14px;
    line-height: 20px;
    min-height: 20px;
    margin-bottom: 20px;
    position: relative;
    padding-left: 42px;
    text-overflow:ellipsis;
    word-break: break-all; 
    word-wrap: break-word; 
    // white-space: pre-wrap;
    .paper-item-title-label{
      color: #333333;
      font-weight: 600;
      position: absolute;
      left: 0;
      top: 0;
    }
    .paper-item-title-content{
      overflow-x: auto;
      overflow-y: hidden;
     
    }
    img{
      // margin: 5px;
      max-width: 100%;
      object-fit: contain;
      // height: auto;
      vertical-align: middle;
    }
  } 
  .audio{
    margin-top: 10px;
  }  
}
</style>
