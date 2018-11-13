<template>
  <div class="paperAnalysis" v-if="isShowPaper">
    <!-- 标题 -->
    <div class="paper-title clear">
      <h1>试卷分析</h1>
      <div class="paper-title-checked"><el-checkbox :checked="false" v-model="checked"  @click.native="showHandle">只看错题</el-checkbox></div>
    </div>
    <!-- 内容 -->
    <div v-if="paperAnalysisData&&paperAnalysisData.length>0" class="paper-inner">
      <ul>
        <li v-for="item in paperAnalysisData" :key="item.id">
          <!-- 非材料题题目-->  
          <div v-for="titem in item.testLists" :key="titem.id" v-show="titem.right == !checked || !checked">
              <paperTitle :item="titem"></paperTitle>
              <paperAnswer :item="titem"></paperAnswer>
          </div>
          <!-- 材料题 -->
          <div v-for="(mitem, mindex) in item.materialList" :key="mindex" v-if="!(allRightFun(mitem.testLists)&&checked)">
              <paperTitle :item="mitem"></paperTitle>
              <div class="paper-inner-materialList" v-if="mitem.testLists&&mitem.testLists.length>0" v-for="qitem in mitem.testLists" :key="qitem.id" v-show="qitem.right == !checked || !checked">
                  <paperTitle :item="qitem"></paperTitle>
                  <paperAnswer :item="qitem"></paperAnswer>
              </div>        
          </div>         
        </li>
      </ul>
      <div v-if="wrongNum==0&&checked" class="paper-inner-nowrong"> 非常优秀，没有错题哦</div>
    </div>
    <div v-if="!paperAnalysisData||paperAnalysisData.length==0" class="paper-tip">
      试卷详解将于 <span>{{showTime}}</span> 开启，您可以届时从<a href="https://i.mangoya.com/PaperSetsNew#/" class="testListLink" target="_blank">试卷集</a>中查看试卷详解   
    </div>
  </div>
</template>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script>
import paperAnswer from './paper/paperAnswer.vue'
import paperTitle from './paper/paperTitle.vue'
import {resultApi} from '@/networks/api'

export default {
  data () {
    return {
      checked: false,
      paperAnalysisData: [],
      isShowPaper: true,
      showTime: null,
      wrongNum: 0
    }
  },
  components: { // 组件
    paperAnswer,
    paperTitle
  },
  computed: { // 计算

  },
  methods: { // 方法事件
     async getPaperAnalysis () { // 获取试卷数据 处理数据题号
			try {
				const response = await resultApi.getPaperAnalysis({
					recordId: this.$route.params.recordId
        })
        // console.log('report试卷分析', response.data)
        if (response.data.code == 0) { // 有结果了
          this.paperAnalysisData = response.data.data.segment
          let examNum = 0 // 题目计数
          // 提出 题目id 和答案
          if (this.paperAnalysisData && this.paperAnalysisData.length > 0) {
            this.paperAnalysisData.map((exam) => {
              // 非材料题列表
              if (exam.testLists && exam.testLists.length > 0) {
                exam.testLists.map((item, index) => {
                  // 题目序号
                  examNum++
                  item.examNum = examNum
                  if (!item.right) {
                    this.wrongNum++
                  }              
                })
              }
              // 材料题列表
              if (exam.materialList && exam.materialList.length > 0) {
                exam.materialList.map((item) => {
                  // 题目序号
                  examNum++
                  item.examNum = examNum
                  // console.log('materialList题号', examNum)
                  // 材料题列表中的 普通题
                  if (item.testLists && item.testLists.length > 0) {
                    item.testLists.map((option, index) => {
                      // 题目序号
                      option.examNum = examNum + '-' + (index + 1)
                      if (!option.right) {
                         this.wrongNum++
                      }  
                    })
                  }
                })
              }
            })
          }        
          // console.log('paperAnalysisData', this.paperAnalysisData)
        } else if (response.data.code == 1001) { // 解析还未到时间
          this.showTime = response.data.msg
        } else { // 不展示试卷分析
          this.isShowPaper = false
        }
			} catch (e) {
				console.log(e)
			}
    },
    showHandle (e) {
      this.checked = !this.checked
      e.preventDefault()
      // console.log('checked-----', this.checked)
    },
    allRightFun (titem) { // 材料题是否都错
        // console.log(titem)
        let rightNum = 0
        if (titem && titem.length > 0) {
            titem.map((val) => {
              if (val.right) {
                rightNum ++ 
              }
              //  console.log(val.right)
            })
        }
        // console.log(rightNum == titem.length)
        return rightNum == titem.length
    }
  },
  async created () {   
    await this.getPaperAnalysis()
    this.$nextTick(function () {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    })
  }
}
</script>

<style lang='less'>
.paperAnalysis{
  padding: 0 20px;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 60px;
  .paper-title{
    height: 70px;
    line-height: 70px;      
    border-bottom: 1px solid #F1F1F1;
    h1{
      font-size: 17px;
      font-weight: 600;
      color: #000000;
      width: 100px;
      float: left;
    }
    .paper-title-checked{
      width: 100px;
      padding-right: 17px;
      float: right;
      text-align: right;
      .el-checkbox{
        margin-right: 11px;
      }
      .el-checkbox__label{
        color: #666666;
        font-size: 15px;
        line-height: 21px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner{
        border: 1px solid #D8D8D8;
        background-color: #ffffff;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner::after{
        border-color:#F13232;
      }
      .el-checkbox__inner:hover, .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #D8D8D8;
      }
    }
  }
  .paper-inner{
    padding: 28px 9px;
    .paper-inner-nowrong{
      text-align: center;
      font-size: 14px;
      color: #333333;
      margin: 30px 0;
      padding-bottom: 30px;
    }
  }
  .paper-inner-materialList{
    padding: 16px 20px;
    background: #F9F9F9;
    border-radius: 4px;
    margin-bottom: 20px;
    .paper-item-answer{
      border: none;
    }
  }
  .paper-tip{
    text-align: center;
    font-size: 14px;
    color: #333333;
    margin: 30px 0;
    padding-bottom: 30px;
    .testListLink{
      color: #3399cc;
      text-decoration: underline;
    }
    span{
      color: #F13232;
    }
  }
}
</style>
