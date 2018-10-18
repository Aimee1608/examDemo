<template>
  <div v-if="stat == 1000 || stat == 1002 || stat == 0">
    <xueHeader></xueHeader>   
    <div  v-if="stat == 0" class="container descriptionBox">
        <!-- 正常诊断 -->
        <div class="description-ok">
            <div class="description-ok-inner">
                <div class="description-ok-inner-top">
                    <img src="../../assets/monkey-big.png" class="monkey" alt="">
                    <div class="instruction">
                        <div class="instruction-title">诊断名称：<span>{{reportData.examName}}</span></div>
                        <!-- <h1>开始时间：<span>{{reportData.startTime}}</span></h1> -->
                        <!-- <h1>结束时间：<span>{{reportData.endTime}}</span></h1> -->
                        <div class="instruction-title">诊断时长：<span  class="examtime">{{reportData.examLongTime}}分钟</span></div>
                        <div class="cut-off-line" v-if="reportData.scoreSection && reportData.scoreSection.length>0">
                            <span class="cut-off-line-title">分数线：</span>
                            <div class="cut-off-line-list" >
                                <div class="cut-off-line-item" v-for="(item, index) in reportData.scoreSection" :key="index"  :style="reportData.scoreSection.length>=5? 'width:'+1/reportData.scoreSection.length*100+'%':''">
                                    <el-tooltip  effect="dark" :content="item.name" placement="top">
                                        <P >{{item.name}}</p>
                                    </el-tooltip>
                                    <span class="score">
                                        {{item.score}}分
                                    </span>
                                    <span v-if="index==reportData.scoreSection.length-1" class="score-total">{{reportData.totalPoints}}分</span>
                                </div>
                            </div>
                        </div>
                        <div class="btn-box">
                            <a class="go-exam" herf="javascript: void(0)" @click="centerDialogVisible = true" :data-xeslog-params="'key=xeslog-examwait-pc&action=click-exam&click_id=1.1.1&click_url=https://exam.xueersi.com/exam-pc/exam/'+ examId + (courseId?'/' + courseId : '')" >开始诊断</a>
                            <a class="go-question" href="javascript: void(0)" @click="gotoBottom">常见问题</a>
                        </div>
                    </div>
                    </div>
                    <div v-if="reportData.description" class="description-ok-inner-bottom">
                        <h1>诊断说明</h1>
                        <div class="ql-editor" v-html="reportData.description"></div>
                    </div>
            </div>
            <div class="description-ok-question" id="problem">
                <h1>常见问题</h1>
                <ul>
                    <li v-for="(item, index) in questionData" :key="index">
                        <div class="question">
                            <img src="../../assets/question.png" alt=""><p>{{item.question}}</p> 
                        </div>
                        <div class="answer">
                            <img src="../../assets/answer.png" alt=""><p>{{item.answer}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
    <div  v-if="stat == 1000 || stat == 1002" class="container descriptionBox">
        <errorCommon :stat="stat" :description="description"></errorCommon>
    </div>
     <el-dialog
        title="确定要开始诊断吗？"
        :closeOnClickModal="false"
        :closeOnPressEscape="false"
        :visible.sync="centerDialogVisible"
         class="dialogBox"
         :show-close="false"
        center>
        <span v-if="reportData.description">请一定要仔细阅读诊断说明</span>
        <div slot="footer" class="dialog-footer">
             <div class="cancleBtn" @click="centerDialogVisible = false" :data-xeslog-params="'key=xeslog-examwait-pc&action=click-exam-cancle&click_id=1.2.1&click_url=https://exam.xueersi.com/exam-pc/exam/'+ examId + (courseId?'/' + courseId : '')">取消</div>
            <div class="sureBtn" @click="gotoExam" :data-xeslog-params="'key=xeslog-examwait-pc&action=click-exam-sure&click_id=1.2.2&click_url=https://exam.xueersi.com/exam-pc/exam/'+ examId + (courseId?'/' + courseId : '')">确 定</div>
        </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script>
import {descriptionApi} from '@/networks/api'
// import '@/MockData/mockData.js'
import {questionData} from '@/defines/index'
import xueHeader from '@/components/xueCommon/GlobalNav.vue'
import errorCommon from '@/components/errorCommon/error.vue'
import getTokenExp from '@/util/getTokenExp.js'
import { Base64 } from 'js-base64'
export default {
  name: 'description',
  data () {
    return {
        stat: null, // 0可以考试，1001诊断已过期 1002 诊断未开始 
        description: '',
        examName: '',
        reportData: {},
        centerDialogVisible: false
        // questionData: questionData
    }
  },
  components: { // 组件
    xueHeader,
    errorCommon
  },
  computed: { // 计算
    questionData: () => questionData, // 问题
    examId () {
      return this.$route.params.examId
    },
    courseId () {
      return this.$route.params.courseId ? this.$route.params.courseId : 0
    } 
  },
  methods: { // 方法事件
    async getDiagnosisDescription () { // 说明页详情
		try {
			const response = await descriptionApi.getDiagnosisDescription({
                examId: this.$route.params.examId,
                isLogin: this.$store.state.waitLogin
            })
            // console.log('waitData666', response.data)
            if (response.data.code == 0) {
                this.stat = 0
                this.reportData = response.data.data
                this.examName = response.data.data.examName
            } else if (response.data.code == 1003) { // 已诊断
                // console.log('recordId-------', response.data.data.recordId, this.$route.params.courseId)
                this.$router.replace({name: 'report', params: {recordId: response.data.data.recordId, courseId: this.$route.params.courseId}})
            } else if (response.data.code == 1004) { // 用户未报名
                this.$router.replace({name: 'error', query: {stat: 1004, description: response.data.data.singupUrl}})
            } else if (response.data.code == 401) { // 用户未登录去登录
                window.location.href = 'https://login.xueersi.com/login/' + Base64.encode(window.location.href) 
            } else if (response.data.code == 1002 || response.data.code == 1000) { // 1002 诊断未开始
                this.stat = response.data.code
                this.description = response.data.msg
            } else {
                 this.$router.replace({name: 'error', query: {stat: response.data.code, description: response.data.msg}})
            }
        } catch (e) {
            // console.log(e)
            if (this.$store.state.waitLogin == 1) {
                const { response: { status } } = e
                if (status === 401) {
                    window.location.href = 'https://login.xueersi.com/login/' + Base64.encode(window.location.href) 
                } 
            }
            this.stat = 1000
            this.description = '页面错误'
        }
    },
    async gotoExam () { // 开始考试
        try {
            await getTokenExp(this.$store)
            // console.log('this.$route.params', this.$route.params)
            this.$router.push({name: 'exam', params: {examId: this.$route.params.examId, courseId: this.$route.params.courseId}})
        } catch (e) {
            // console.log(e)
            const { response: { status } } = e
            if (status === 401) { 
               let examUrl = window.location.protocol + '//' + window.location.host + '/exam-pc/exam/' + this.$route.params.examId + (this.$route.params.courseId ? '/' + this.$route.params.courseId : '')
               window.location.href = 'htstps://login.xueersi.com/login/' + Base64.encode(examUrl)     
            } 
            this.description = '页面错误'
        }  
    },
    gotoBottom () { // 常见问题
        var x = document.documentElement.scrollLeft || document.body.scrollLeft
        var y = document.documentElement.scrollHeight || document.body.scrollHeight
        // console.log('document.documentElement.clientHeight', document.body.scrollHeight)
        window.scrollTo(x, y)
    }
  },
  mounted () { // 加载完成

  },
  beforeDestroy () { // 销毁前 
    window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.1&pageaction=leave')
  },
  created () { // 创建   
    this.getDiagnosisDescription()
    window.xesWeb_eventLog.xesEventLog('pageLoad', 'pageuid=1.1.1&pageaction=enter')
  }
}
</script>

<style lang='less' >
div.descriptionBox{
    margin-top: 50px;
}
.description-ok{
    padding-bottom: 73px;
    .description-ok-inner{
        padding: 125px 30px 70px 30px;
        background: #ffffff;
        margin-bottom: 40px;
        .description-ok-inner-top{            
            padding-left: 528px;
            position: relative;
            min-height: 200px;
            .monkey{
                width: 193px;
                height: 258px;
                position: absolute;
                left: 228px;
                top: -25px;
            }
            .instruction{
                .instruction-title{
                    font-size: 18px;
                    // font-weight: 600;
                    color: #000000;
                    line-height: 30px;
                    span{
                        font-size: 17px;
                        font-weight: normal;
                        color: #333333;
                    }
                    span.examtime{
                        font-weight: normal;
                        color: #F0773C;
                    }
                }
                .cut-off-line{
                    margin: 24px 0 45px 0;
                    padding-left: 87px;
                    position: relative;
                    .cut-off-line-title{
                        font-size: 18px;
                        // font-weight: 600;
                        color: #000000;
                        height: 41px;
                        line-height: 41px;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    .cut-off-line-list{
                        font-size: 0;
                        height: 41px;
                        .cut-off-line-item{
                            position: relative;
                            display: inline-block;
                            width: 100px;
                            border-bottom: 1px solid #D71303;
                            text-align: center;
                            color: #333333;
                            font-size: 13px;
                            line-height: 20px;
                            // font-weight: 600; 
                            p{
                                padding: 0 2px;
                                white-space:nowrap; 
                                overflow:hidden; 
                                text-overflow:ellipsis;
                                font-weight: normal; 
                            }
                            .score{
                                position: absolute;
                                left: -10px;
                                top: 100%;
                                color: #F0773C;
                                font-size: 12px;
                                line-height: 20px;
                                font-weight: normal; 
                            }
                            .score-total{
                                position: absolute;
                                right: 0px;
                                top: 100%;
                                color: #F0773C;
                                font-size: 11px;
                                line-height: 20px;
                            }
                        }
                        .cut-off-line-item:last-child::before{
                            content: '';
                            display: block;
                            height: 8px;
                            width: 1px;
                            background: #D71303;
                            position: absolute;
                            right: 0;
                            bottom: 0;
                        }
                        .cut-off-line-item:after{
                            content: '';
                            display: block;
                            height: 8px;
                            width: 1px;
                            background: #D71303;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                    }
                    .cut-off-line-list.morethan5{
                        .cut-off-line-item{
                            width: 80px;
                            font-size: 12px;
                        }  
                    }
                    .cut-off-line-list.morethan6{
                        .cut-off-line-item{
                            width: 60px;
                            font-size: 12px;
                        }  
                    }
                }
                .btn-box{
                    font-size: 16px;
                    margin-bottom:84px;
                    a{
                        display: inline-block;
                        width: 120px;
                        border-radius: 4px;
                        margin-right: 46px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .go-exam{
                        height: 38px;
                        line-height: 38px;
                        color: #ffffff;
                         background-image:linear-gradient(-269deg, #F13232 50%, #F0773C 100%);
                    }
                    .go-question{
                        height: 36px;
                        line-height: 36px;
                        color: #333333;
                        border: 1px solid #333333;
                    }
                }
            }
            
        }
        .description-ok-inner-bottom{
            border-top: 1px solid #F1F1F1;
            padding:40px 0 0 214px;
            h1{
                color: #000000;
                font-size: 17px;
                line-height: 24px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            .ql-editor{
                color: #666666;
                font-size: 14px;
                line-height: 22px;
                white-space: pre-wrap;
                word-break: break-all;
                word-wrap: break-word;
                html, address,
                blockquote,
                body, dd, div,
                dl, dt, fieldset, form,
                frame, frameset,
                h1, h2, h3, h4,
                h5, h6, noframes,
                ol, p, ul, center,
                dir, hr, menu, pre   { display: block; unicode-bidi: embed }
                li              { display: list-item; }
                head            { display: none }
                table           { display: table }
                tr              { display: table-row }
                thead           { display: table-header-group }
                tbody           { display: table-row-group }
                tfoot           { display: table-footer-group }
                col             { display: table-column }
                colgroup        { display: table-column-group }
                td, th          { display: table-cell }
                caption         { display: table-caption }
                th              { font-weight: bolder; text-align: center }
                caption         { text-align: center }
                body            { margin: 8px }
                h1              { font-size: 2em; margin: .67em 0 }
                h2              { font-size: 1.5em; margin: .75em 0 }
                h3              { font-size: 1.17em; margin: .83em 0 }
                h4, p,
                blockquote, ul,
                fieldset, form,
                ol, dl, dir,
                menu            { margin: 1.12em 0 }
                h5              { font-size: .83em; margin: 1.5em 0 }
                h6              { font-size: .75em; margin: 1.67em 0 }
                h1, h2, h3, h4,
                h5, h6, b,
                strong          { font-weight: bolder }
                blockquote      { margin-left: 40px; margin-right: 40px }
                i, cite, em,
                var, address    { font-style: italic }
                pre, tt, code,
                kbd, samp       { font-family: monospace }
                pre             { white-space: pre }
                button, textarea,
                input, select   { display: inline-block }
                big             { font-size: 1.17em }
                small, sub, sup { font-size: .83em }
                sub             { vertical-align: sub }
                sup             { vertical-align: super }
                table           { border-spacing: 2px; }
                thead, tbody,
                tfoot           { vertical-align: middle }
                td, th, tr      { vertical-align: inherit }
                s, strike, del  { text-decoration: line-through }
                hr              { border: 1px inset }
                ol, ul, dir,
                menu, dd        { margin-left: 40px }
                ol>li          { list-style-type: decimal!important; }
                ul>li          { list-style-type: disc!important; }
                ol ul, ul ol,
                ul ul, ol ol    { margin-top: 0; margin-bottom: 0 }
                u, ins          { text-decoration: underline }
                br:before       { content: "\A"; white-space: pre-line }
                center          { text-align: center }
                :link, :visited { text-decoration: underline }
                :focus          { outline: thin dotted invert }
                 blockquote, p, pre, ul, ol{
                    margin: 0;
                    padding: 0;
                }
                 p{
                   line-height: 22px;
                }
                ul, ol{
                    margin-left: 1.5em;
                    li{
                        margin-left: 1.5em;
                    }
                }
               blockquote{
                    border-left: 4px solid #ccc;
                    margin-bottom: 5px;
                    margin-top: 5px;
                    padding-left: 16px;
               } 
               img{
                   max-width: 100%;
               }        
                .ql-align-right{
                    text-align:right;
                }
                .ql-align-center{
                    text-align: center;
                }
                .ql-align-left{
                    text-align:left;
                }
                .ql-size-large {
                    font-size: 1.5em;
                }
            }
        }
    }
    .description-ok-question{
        margin-top: 40px;
        padding:30px 218px 30px 233px;
        min-height: 470px;
        background: #ffffff;
        h1{
            color: #000000;
            font-size: 17px;
            font-weight: 600;
            line-height: 24px;
        }
        ul{
            li{
                .question{
                    margin-top: 22px;
                    padding-left: 34px;
                    position: relative;
                    cursor: pointer;
                    img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 23px;
                        height: 23px;
                    }
                    p{
                        color: #666666;
                        font-size: 14px;
                        line-height: 22px;
                    }
                }
                .answer{
                    // display: none;
                     max-height: 0;
                     margin-top: 0px;
                     padding-left: 28px;
                      position: relative;
                      overflow: hidden;
                     transition: max-height .3s ease;
                      img{
                        position: absolute;
                        top: 3px;
                        left: 0;
                        width: 21px;
                        height: 22px;
                    }
                     p{
                        padding: 4px 8px;
                        color: #666666;
                        font-size: 14px;
                        line-height: 22px;
                        border: 1px solid #EEEEEE;
                        border-radius: 5px;
                    }
                }
            }
            li:hover .answer{
                // display: block;
                margin-top: 22px;
                max-height: 80px;
                 
            }
        }
    }
}
</style>
