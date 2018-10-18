<template>
  <a class="course-card" :href="courseUrl(data.id, data.class.id)" target="_blank" v-if="data" :data-xeslog-params="'key=xeslog-examreport-pc&action=coursedetail&coursenum='+courseNum+'&exam_course_recordid='+recordId+'&courseid='+courseId+'&recommendcourseid='+data.id+'&click_id=3.1.2&click_url='+ courseUrl(data.id, data.class.id)">
    <div class="course-card-box">    
      <p class="card-title">
        <span v-if="!isLiveThematic&&computedTerm(data.terms, data.isQuality, data.courseType)" class="card-title__term card-title__icon" >{{computedTerm(data.terms, data.isQuality, data.courseType)}}</span>
        <span v-if="data.subjects[0].name" class="card-title__subject card-title__icon">{{data.subjects[0].name}}</span>                                 
        <span v-html="data.name"></span>
      </p>
      <div class="card-info">
        <p class="card-info__sub-title" v-if="data.otherTitle" v-html="data.otherTitle"></p>
        <p v-if="data.secondTitle && !isLiveThematic" class="card-info__secondTitle" v-html="data.secondTitle"></p>
        <p class="card-info__data" v-if="data.schoolTimeName"><i class="iconfont1 icon-lishi"></i>&nbsp;{{data.schoolTimeName}}</p>
        <p class="card-info__difficulty" v-if="data.difficulty && data.difficulty.alias">
          <span>难度：</span><i :class="`iconfont2 icon-star-${data.difficulty.alias}`"></i>
        </p>
      </div>
      <div class="teacher-list">
        <!-- 主讲老师 -->
        <div class="teacher-list__item" v-if="data.chineseTeacher && data.chineseTeacher[0] && data.chineseTeacher[0].name && data.chineseTeacher[0].typeName">
          <div class="teacher-list__item__avatar" :style="{backgroundImage:`url(${data.chineseTeacher[0].avatars[0]})`}"></div>
          <p class="teacher-list__item__job-title">{{data.chineseTeacher[0].typeName}}</p>
          <p class="teacher-list__item__name">{{data.chineseTeacher[0].name}}</p>
        </div>
        <!-- 外交老师 -->
        <div class="teacher-list__item" v-if="data.foreignTeacher && data.foreignTeacher[0] && data.foreignTeacher[0].name && data.foreignTeacher[0].typeName">
          <div class="teacher-list__item__avatar" :style="{backgroundImage:`url(${data.foreignTeacher[0].avatars[0]} )`}"></div>
          <p class="teacher-list__item__job-title">{{data.foreignTeacher[0].typeName}}</p>
          <p class="teacher-list__item__name">{{data.foreignTeacher[0].name}}</p>
        </div>
        <!-- 辅导老师 -->
        <div class="teacher-list__item" v-if="data.isHaveCounselorTeacher === 1 && data.class.counselor && data.class.leftNum && data.class.leftNum !== 0">
          <div class="teacher-list__item__avatar" :style="{backgroundImage:`url(${data.class.counselor.avatars[0]})`}"></div>
          <p class="teacher-list__item__job-title">{{data.class.counselor.typeName}}</p>
          <p class="teacher-list__item__name">{{data.class.counselor.name}}</p>
          <div class="teacher-list__item__label" v-if="data.class.leftNum && data.class.leftNum !== 0">
            余{{data.class.leftNum}}名额
          </div>
        </div>
      </div>
      <div class="card-border"></div>
      <div class="card-bottom">
        <div class="card-bottom__price" v-if="data.class.leftNum">
          <div v-if="data.price.resale == data.price.origin">
            <span>￥</span>
            <strong>{{data.price.resale}}</strong>
          </div>
          <div v-if="data.price.resale != data.price.origin">
            <em>￥{{data.price.origin}}</em>
            <span>￥</span>
            <strong>{{data.price.resale}}</strong>
          </div>
        </div>
        <div class="card-bottom__full" v-if="!data.class.leftNum">
          已报满
        </div>
        <div class="card-bottom__desc" v-if="data.class.leftNum && data.saletimes.countDown">{{data.saletimes.countDown}}</div>
        <div class="card-bottom__num" v-if="!isLiveThematic">共{{data.syllabusNum}}讲</div>
      </div>
    </div>
  </a>
</template>

<script>
import { termsName } from '@/defines'
export default {
  name: 'course-card',
  props: ['data', 'isLiveThematic', 'courseNum'],
  data () {
    return {
      termsName
    }
  },
  computed: { // 计算
    recordId () {
      return this.$route.params.recordId
    },
    courseId () {
      return this.$route.params.courseId ? this.$route.params.courseId : 0
    }
  },
  methods: {
    computedTerm (terms, isQuality, courseType) {
      if (isQuality == 1) { // 是素养课  为1是直播，  2为录播 isQuality 为1时， 为素养课
        return courseType == 1 ? '直播' : '录播'
      } else {
        let names = []
        terms.map((option) => {
          if (option.closest) {
            names.push(termsName[option.name])
          }
        })
        if (names.length > 0) {
          if (names.filter(i => i == '年').length !== 0) {
            return termsName.year
          }
          return names[0]
        } else {
          return null
        }
      }
    },
    distanceTime (deadtime) {
      var curtime = new Date()
      var endtime = new Date(deadtime)
      var lefttime = parseInt(((endtime.getTime() - curtime.getTime()) / (24 * 60 * 60 * 1000)))
      return lefttime
    },
    courseUrl (courseId, classId) {
      let url = 'https://www.xueersi.com/kc/'
      if (classId) {
        url += courseId + '-0-' + classId
      } else {
        url += courseId
      }
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/entry";

@include b(course-card) {
  display: inline-block;
  width: 33.333333%;
}
@include b(course-card-box) {
  cursor: pointer;
  margin: 6px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  position: relative;
  transition: all .2s linear;
  padding: 32px 27px 20px;
  &:hover{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05), -5px 0px 10px rgba(0, 0, 0, 0.05);
    border-top-color: #f13232;
    transform: translate3d(0, -4px, 0);
  }
}

@include b(card-title) {
  word-break: break-all;
  height: 54px;
  line-height: 1.42857143;
  font-size: 18px;
  color: #111;
  span{
    vertical-align: middle;
  }
  @include e(icon) {
    font-size: 14px;
    line-height: 1;
    padding: 2px;
    font-weight: normal;
    border-radius: 2px;
    display: inline-block;
  }
  @include e(term) {
    color: #fff;
    background-color: #f13232;
  }
  @include e(subject) {
    color: #f13232;
    padding: 1px;
    border: 1px solid #f13232;
  }
}

@include b(card-info) {
  margin-top: 7px;
  color: #999999;
  height: 87px;
  overflow: hidden;
  font-size: 14px;
  @include e(sub-title) {
    font-size: 14px;
    margin-bottom: 3px;
    margin-top: 0;
    height: 23px;
    line-height: 23px;
    overflow: hidden;
    color: #FF6E24;
  }
  @include e(data) {
    margin: 2px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  @include e(difficulty) {
    span{
      vertical-align: middle;
    }
    i{
      font-size: 14px;
      color: #666;
      vertical-align: middle;
      letter-spacing: 5px;
    }
  }
  @include e(secondTitle) {
    font-size: 14px;
    margin: 2px 0;
    margin-bottom: 3px !important;
    margin-top: 0;
    height: 23px;
    line-height: 23px;
    overflow: hidden;
    color: #FF6E24;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

@include b(teacher-list) {
  margin-top: 5px;
  @include e(item) {
    display: inline-block;
    height: 105px;
    margin-right: 37px;
    text-align: center;
    width: 62px;
    position: relative;
    &:last-child{
      margin-right: 0;
    }
    p{
      text-align: center;
      color: #666666;
      font-size: 14px;
      height: 17px;
      line-height: 17px;
      overflow: hidden;
    }
    @include e(avatar) {
      width: 62px;
      height: 62px;
      overflow: hidden;
      border-radius: 50%;
      font-size: 0;
      text-align: center;
      border: 1px solid #f1f1f1;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
    }
    @include e(label) {
      position: absolute;
      right: -74px;
      top: 0px;
      max-width: 120%;
      text-align: center;
      background-image: url('https://res12.xesimg.com/x5mall/img/student_num_label.png?20171211');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 74px;
      height: 23px;
      font-size: 12px;
      line-height: 23px;
      color: #f0773c;
    }
  }
}

.card-border{
  height: 0;
  overflow: hidden;
  margin: 20px auto 12px;
  border-top-color: #e5e5e5;
  border-top: 1px solid #ddd;
}

@include b(card-bottom) {
  height: 41px;
  position: relative;
  @include e(desc) {
    position: absolute;
    top: 0;
    left: 0; 
    font-size: 13px;
    height: 16px;
    line-height: 16px;
    color: #999999;
  }
  @include e(num) {
    position: absolute;
    bottom: 0;
    left: 0; 
    font-size: 13px;
    height: 16px;
    line-height: 16px;
    color: #999999;
  }
  @include e(price) {
    color: #f13232;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 0;
    span{
      font-size: 16px;
    }
    strong{
      font-family: Arial;
      font-size: 32px;
      font-weight: 600;
    }
    em{
      text-decoration: line-through;
      font-size: 13px;
      height: 16px;
      line-height: 16px;
      color: #999999;
    }
  }
  @include e(full) {
    font-size: 24px;
    color: #666;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
.icon-star-0:before { content: "\e7df\e7df\e7df\e7df\e7df"; }
.icon-star-1:before { content: "\e86a\e7df\e7df\e7df\e7df"; }
.icon-star-2:before { content: "\e86a\e86a\e7df\e7df\e7df"; }
.icon-star-3:before { content: "\e86a\e86a\e86a\e7df\e7df"; }
.icon-star-4:before { content: "\e86a\e86a\e86a\e86a\e7df"; }
.icon-star-5:before { content: "\e86a\e86a\e86a\e86a\e86a"; }

.icon-star-fill:before { content: "\e86a"; }
</style>
