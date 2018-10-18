<template>
  <div class="reportAnalysis">
    <!-- 标题 -->
    <div class="report-title">
      <h1>诊断结果分析</h1>
      <p><em v-if="analysisData.rankGrade">综合排名：{{analysisData.rankGrade}}</em> 老师评价 <span>{{analysisData.commentTeacher}}</span></p>
    </div>
    <!-- 模块分析 -->
    <div class="report-inner clear">
      <!-- 模块列表 -->
      <div class="report-inner-left" :class="accuracyValue&&accuracyValue.length>=3?'': 'report-inner-leftnoRadar'">
        <ul class="report-inner-list">
          <li class="report-inner-item clear" v-for="(item, index) in analysisData.module" :key="index">
            <div class="item-left">
              <div class="item-left-title"><em>[{{item.moduleName}}]</em>
                <!-- <el-tooltip  effect="dark" :content="item.questionId.join(', ')" placement="top"> -->
                  <span :title="item.questionId.join(', ')"> 题目({{item.questionId.length >= 8 ? item.questionId.slice(0, 8).join(', ') +'...': item.questionId.join(', ')}})</span>
                <!-- </el-tooltip> -->
              </div>
              <div class="item-left-rank">平均正确率{{item.accuracyGrade*1000/10}}%</div>
              <div class="item-left-bar"><span class="item-left-bar-accuracy">我的正确率{{item.accuracy*1000/10}}%</span><p><em :style="{width: item.accuracy*100 + '%'}"></em></p></div>
            </div>
            <div class="item-right" v-if="item.result">
              <h1>诊断结果：</h1>
              <p>{{item.result}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 模型图 -->
      <div v-show="accuracyValue&&accuracyValue.length>=3" class="report-innner-right" ref="reportRadar"></div>
    </div>
  </div>
</template>

<script>
import {resultApi} from '@/networks/api'
import { mapState } from 'vuex'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入雷达图
require('echarts/lib/chart/radar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  data () {
    return {
      analysisData: {},
      accuracyValue: [],
      accuracyGradeValue: [],
      indicatorValue: []
    }
  },
  components: { // 组件

  },
  computed: { // 计算
    ...mapState({
      examId: state => state.ResultPage.examId
    })
  },
  methods: { // 方法事件
    drawRadar () {
      // 基于准备好的dom，初始化echarts实例
      let myRadar = echarts.init(this.$refs.reportRadar)
      // 绘制图表
      let option = {
          tooltip: {
            trigger: 'item'
          //  formatter: ' {b}<br />{c0}% : {c1}%'
         },
          legend: {
            icon: 'circle',
            data: [{
              name: '我的正确率(%)'
            }, {
              name: '年级平均正确率(%)'
            }],
            itemGap: 20,
            bottom: 60,
            textStyle: {
              fontSize: 13
            }
          },
          radar: {
              name: {
                  textStyle: {
                      color: '#333333',
                      fontSize: this.indicatorValue.length >= 5 ? 13 : 19, // 19
                      fontWeight: 600,
                      padding: [0, 0]
                },
                formatter (text) { // 处理时间过长
                  text = text.replace(/\S{6}/g, function (match) {
                    return match + '\n'
                  })
                  // console.log('text', text)
                  return text
                }
              },
              radius: this.indicatorValue.length >= 5 ? 60 : 85,
              splitLine: { // 背景多边形 线条颜色
                lineStyle: {
                  color: 'rgba(189, 16, 224, 0.06)'
                }
              },
              splitArea: { // 雷达网背景图
                  show: false
              },
              axisLine: { // 对角线
                lineStyle: {
                  color: 'rgba(189, 16, 224, 0.06)'
                }
              },
              indicator: this.indicatorValue
          },
          series: [{
              // name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              symbol: 'circle',
              data: [{ // 我的正确率
                value: this.accuracyValue,
                name: '我的正确率(%)',
                itemStyle: { // 小圆点
                  normal: {
                    color: 'rgba(241, 50, 50, 1)'
                  }
                },
                lineStyle: { // 边框线条
                  normal: {
                    width: 1,
                    color: 'rgba(241, 50, 50, 1)'
                  }
                },
                areaStyle: { // 填充
                  normal: {
                    color: 'rgba(189, 16, 224, 0.17)'
                  }
                }
              }, { // 年级平均正确率
                value: this.accuracyGradeValue,
                name: '年级平均正确率(%)',
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 110, 36, 0.3)'
                  }
                },
                lineStyle: {
                  normal: {
                    width: 1,
                    color: 'rgba(255, 110, 36, 0.3)'
                  }
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(255, 110, 36, 0.1)'
                  }
                }
              }]
          }]
      }
      myRadar.setOption(option)
    },
    async getReportAnalysis () {
			try {
				const response = await resultApi.getReportAnalysis({
					recordId: this.$route.params.recordId
        })
        // console.log('reportAnalysis结果分析', response.data.data)
        if (response.data.code == 0) {
          this.analysisData = response.data.data  
          // console.log('analysisData', analysisData.rankGrade)     
            this.analysisData.module.map((module) => { // 雷达图数据
              if (module.moduleId) {
                this.accuracyValue.push(module.accuracy * 1000 / 10)
                this.accuracyGradeValue.push(module.accuracyGrade * 1000 / 10)
                this.indicatorValue.push({name: module.moduleName, max: 100})
              }   
            })
          if (this.accuracyValue.length >= 3) {
            this.drawRadar()
          }        
        }
			} catch (e) {
				console.log(e)
			}
		}
  },
  mounted () {
    this.getReportAnalysis()
  }
}
</script>

<style lang='less'>
.reportAnalysis{
  padding: 0 20px 53px 20px;
  background: #fff;
  margin-top: 20px;
  .report-title{
    h1{
      height: 70px;
      line-height: 70px;
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      border-bottom: 1px solid #F1F1F1;
    }
    p{
      height: 58px;
      line-height: 58px;
      font-size: 17px;
      // font-weight: 600;
      color: #333333;
      border-bottom: 1px solid #F1F1F1;
      em{
        color: #F0773C;
        font-size: 15px;
        line-height: 20px;
        margin-right: 33px;
        font-weight: normal;
      }
      span{
        color: #666666;
        font-size: 14px;
        font-weight: normal;
        padding-left: 13px;
      }
    }
  }
  .report-inner{
    .report-inner-left{
      float: left;
      width: 790px;
      .report-inner-list{
        .report-inner-item{
          padding: 32px 0;
          border-bottom: 1px solid #F1F1F1;
          .item-left{
            float: left;
            width: 335px;
            .item-left-title{
              em{
                font-size: 21px;
                font-weight: 600;
                color: #F13232;
              }
              span{
                font-size: 14px;
                color: #666666;
              }
            }
            .item-left-rank{
              font-size: 14px;
              color: #666666;
              height: 32px;
              line-height: 32px;
            }
            .item-left-bar{
              padding-left: 100px;
              padding-top: 1px;
              margin-bottom: 2px;
              position: relative;
              .item-left-bar-accuracy{
                color: #333333;
                font-size: 12px;
                position: absolute;
                left: 0;
                top: 0;
              }
              p{
                  height: 15px;
                  line-height: 15px;
                  background: #F1F1F1;
                  border-radius: 8px;
                  box-sizing: border-box;
                  width: 100%;
                  em{
                    display: inline-block;
                    height: 15px;
                    line-height: 15px;
                    background-image:linear-gradient(-269deg, #F13232 50%, #F0773C 100%);
                    border-radius: 8px;
                  }
                }
            }
          }
          .item-right{
            float: right;
            width: 380px;
            margin-right: 10px;
            margin-top: 10px;
            h1{
              font-size: 14px;
              font-weight: 600;
              color: #333333;
              line-height: 20px;
            }
            p{
              font-size: 14px;
              color: #666666;
              line-height: 20px;
            }
          }
        }
      }
    }
    .report-innner-right{
      float: right;
      width: 370px;
      height: 500px;
    }
    .report-inner-leftnoRadar{
      width: 100%;
      .report-inner-list{
        .report-inner-item{          
          .item-left{
            width: 520px;
          }
          .item-right{
            width: 565px;
          }
        }
      }
    }
  }
}
</style>
