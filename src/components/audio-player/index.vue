<template>
  <div class="audio-player">
    <div class="audio-controler" @click="playControl"
      :style="`background-image: url(${isPlaying ? require('../../assets/pause-icon.png') : require('../../assets/play-icon.png')})`">
    </div>
    <div class="progress-bar" ref="content">
      <div class="progress-bar__value" :style="`width: ${progress}%;`"></div>
      <div class="progress-bar__thumb" ref="thumb" :style="`left: ${progress}%`">
        <img v-if="loading" class="progress-bar__thumb__circle-loading" src="./loading.svg" alt="loading">
        <span v-else class="progress-bar__thumb__circle"></span>
      </div>
    </div>
    <div class="audio-duration">{{formatRemainingTime}}</div>
  </div>
</template>

<script>
import { Howl } from 'howler'
import emitter from '@/mixins/emitter'
import draggable from './draggable'

export default {
  name: 'audio-player',
  componentName: 'audio-player',
  props: {
    src: String,
    preload: {
      type: Boolean,
      default: true
    }
  },
  mixins: [emitter],
  data () {
    return {
      loading: true,
      sound: null,
      seek: 0,
      step: 1,
      duration: null,
      timer: null
    }
  },
  computed: {
    progress () {
      if (!this.duration) return 0
      const value = this.seek
      if (typeof value === 'undefined' || value === null) return 0
      return value / this.duration * 100
    },
    remainingTime () {
      return Math.round(this.duration - this.seek)
    },
    formatRemainingTime () {
      const time = this.remainingTime
      const formatNum = n => `${n < 10 ? `0${n}` : n}`
      if (time < 60) {
        return `00:${formatNum(time)}`
      }
      const second = formatNum(time % 60)
      const minute = formatNum((time - time % 60) / 60)
      return `${minute}:${second}`
    },
    isPlaying () {
      return this.sound && this.sound.playing()
    }
  },
  created () {
    this.$on('audio.stop', () => {
      this.clearInterval()
      this.sound.stop()
      this.seek = 0
    })
    this.$on('audio.load', () => {
      if (!this.loading) return
      this.sound.load()
    })
    this.initHowl()
  },
  mounted () {
    this.initProgressBar()
  },
  beforeDestroy () {
    this.unloadHowl()
  },
  methods: {
    playControl () {
      if (this.loading) return
      this.sound.playing()
        ? this.sound.pause()
        : (() => {
          this.dispatch('exam', 'stopAllAudio')
          this.dispatch('result', 'stopAllAudioResult')
          this.sound.play()
        })()
    },
    initProgressBar () {
      const thumb = this.$refs.thumb
      const content = this.$refs.content
      const getThumbPosition = () => {
        const contentBox = content.getBoundingClientRect()
        const thumbBox = thumb.getBoundingClientRect()
        return {
          left: thumbBox.left - contentBox.left,
          top: thumbBox.top - contentBox.top,
          thumbBoxLeft: thumbBox.left
        }
      }
      let dragState = {}
      draggable(thumb, {
        start: (event) => {
          if (this.disabled) return
          const position = getThumbPosition()
          const thumbClickDetalX = event.clientX - position.thumbBoxLeft
          dragState = {
            thumbStartLeft: position.left,
            thumbStartTop: position.top,
            thumbClickDetalX: thumbClickDetalX
          }
        },
        drag: (event) => {
          if (this.disabled) return
          this.clearInterval()
          const contentBox = content.getBoundingClientRect()
          const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX
          const stepCount = Math.ceil((this.duration) / this.step)
          const newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount)
          let newProgress = newPosition / contentBox.width
          if (newProgress < 0) {
            newProgress = 0
          } else if (newProgress > 1) {
            newProgress = 1
          }
          this.seek = newProgress * this.duration
        },
        end: () => {
          if (this.disabled) return
          if (this.sound.playing()) {
            this.setInterval()
          }
          this.sound.seek(this.seek)
          dragState = {}
        }
      })
    },
    initHowl () {
      this.seek = 0
      this.loading = true
      this.sound = new Howl({
        src: [this.src],
        preload: this.preload,
        html5: true,
        onload: (e) => {
          this.duration = this.sound.duration()
          this.loading = false
        },
        onplay: this.setInterval,
        onpause: this.clearInterval,
        onend: this.setEnd
      })
    },
    unloadHowl () {
      this.clearInterval()
      this.sound.stop()
      this.sound.unload()
      this.loading = true
    },
    syncSeek () {
      // console.log('palying')
      this.seek = this.sound.seek()
    },
    setInterval () {
      this.clearInterval()
      this.timer = setInterval(this.syncSeek, 1000)
    },
    clearInterval () {
      clearInterval(this.timer)
    },
    setEnd () {
      this.seek = this.duration
      this.clearInterval()
    }
  }
}
</script>

<style lang="less">
.audio-player{
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .audio-controler {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    cursor: pointer;
    .triangle-icon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      overflow: hidden;
      border-top: 6px solid transparent;
      border-left: 11px solid #ffffff;
      border-bottom: 6px solid transparent;
    }
  }
  .progress-bar{
    width: 233px;
    height: 4px;
    position: relative;
    border-radius: 3px;
    background-color: #F1F1F1;
    margin: 0 10px;
    .progress-bar__thumb{
      position: absolute;
      left: 0;
      top: 50%;
      padding: 5px;
      transform: translate(-50%, -50%);
      cursor: move;
      .progress-bar__thumb__circle{
        display: block;
        width:10px;
        height:10px;
        background-color:#fff;
        border:2px solid #F0773C;
        border-radius: 100%;
      }
      .progress-bar__thumb__circle-loading{
        display: block;
        width:12px;
        height:12px;
        // background-color:#fff;
      }
    }
    .progress-bar__value{
      position: absolute;
      top: 0;
      left:0;
      height: 3px;
      border-radius: 3px;
      background:linear-gradient(-90deg,rgba(255,110,36,1),rgba(255,0,33,1));
    }
  }
  .audio-duration{
    width: 36px;
    font-size: 12px;
    color: #666666;
  }
}
</style>
