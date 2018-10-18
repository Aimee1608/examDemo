import {examApi} from '@/networks/api' 
import router from '@/router'
// import {getCookie} from '@/util/cookie.js'
export default {
  state: {
      examId: 1, 
      examList: null, // 题目列表
      answerSheet: [], // 答题答案
      examInfo: {}, // 试卷信息
      examLength: null, // 总题目数
      examStorage: { // 存在本地的数据 
        firstEntranceTime: null, // 第一次进入试卷的时间
        answerSheet: [] // 答案列表
      },
      nowDate: null, // 服务器当前时间
      answerStorage: null, // 储存本地的localStorage 的key
      isMokao: false // 是否为模考
  },
  mutations: {
    initExams (state, payload) { // 初始化试题 和试卷信息
      state.answerStorage = 'examAnswer' + state.examId + payload.stuInfo.id
      let examList = [...payload.segment] // 题目列表
      let answerSheet = [] // 答案列表
      let examNum = 0 // 题目计数
      let hasStorage = false // 是否已经答题
      let progress = 0 // 进度百分数
      let hasAnswerNum = 0 // 已经答题数
      let entranceTime = new Date(payload.entranceTime * 1000) 
      state.examStorage.firstEntranceTime = payload.entranceTime
      state.isMokao = payload.paperTime == 0
      let paperTime = payload.paperTime == 0 ? new Date(payload.endTime).getTime() - new Date(payload.startTime).getTime() : payload.paperTime * 60 * 1000 // 考试答题时间 模考为0
      // console.log('mokao', state.isMokao, paperTime)
      // 判断答题时间
      if (localStorage.getItem(state.answerStorage)) {
        let answerStorageData = JSON.parse(localStorage.getItem(state.answerStorage))
        let firstEntranceTime = new Date(answerStorageData.firstEntranceTime * 1000) // 储存的进入时间
        if (entranceTime - firstEntranceTime >= paperTime) { // 记录的第一次的时间和再次加载试卷给的进入时间 超过了诊断时长 删除本地答案，清空所有数据
          localStorage.removeItem(state.answerStorage)
        } else { // 在诊断时长内 还原答题内容
          hasStorage = true
          answerSheet = answerStorageData.answerSheet
          answerSheet.map((option) => {
            if (option.answer.join('').trim() != '' && !option.answer.includes('')) { // 设置进度条
              hasAnswerNum++
            }
          })
          progress = Math.round(hasAnswerNum / answerSheet.length * 100)
        }
      }
      // 提出 题目id 和答案
      if (examList && examList.length > 0) {
        examList.map((exam) => {
          let testLists = []
          let materialList = []
          // 非材料题列表
          if (exam.testLists && exam.testLists.length > 0) {
            exam.testLists.map((item, index) => {
              // 题目序号
              examNum++
              item.examNum = examNum
              // console.log('test题号', examNum)
              item.answer = []
              if (hasStorage) {
                answerSheet.map((n) => {
                  if (item.id == n.questionId) {
                    item.answer = [...n.answer]
                  } 
                })
              } else {
                testLists.push({questionId: item.id, answer: []})
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
                  option.answer = []
                  if (hasStorage) {
                    answerSheet.map((n) => {
                      if (option.id == n.questionId) {
                        option.answer = [...n.answer]
                      } 
                    })
                  } else {
                    materialList.push({questionId: option.id, answer: []})
                  }
                })
              }
            })
          }
          if (!hasStorage) {
            answerSheet = [...answerSheet, ...testLists, ...materialList]
          } 
        })
      }
      state.examList = [...examList]
      state.examStorage.answerSheet = [...answerSheet]
      state.examLength = answerSheet.length
      // console.log('init0000', state.examStorage.answerSheet)
      // 初始化考试页头信息
      const {examName, score, paperId, stuInfo: {nickname, realname, name}, endTime} = payload
      const showname = realname ? realname + '' : (nickname ? nickname + '' : name)
      state.examInfo = {examName, score, paperId, showname, progress, hasAnswerNum, entranceTime, paperTime, endTime}
      localStorage.setItem(state.answerStorage, JSON.stringify(state.examStorage))
      // console.log('examinfo', state.examInfo, state.examStorage.answerSheet, state.examList)
    },
    saveAnswerSheet (state, payload) { // 储存题目答案
      const answerSheet = state.examStorage.answerSheet
      const { questionId, answer } = payload
      let hasAnswerNum = 0
      answerSheet.map((option) => {
        if (option.questionId == questionId) {
          option.answer = [...answer]
        }
        if (option.answer.join('').trim() != '' && !option.answer.includes('')) { // 设置进度条
          hasAnswerNum++
        }
      })
      state.examInfo.progress = Math.round(hasAnswerNum / state.examLength * 100)
      state.examInfo.hasAnswerNum = hasAnswerNum
      // console.log('答题进度', hasAnswerNum, state.examLength, Math.round(hasAnswerNum / state.examLength * 100))
      state.examStorage.answerSheet = [...answerSheet]
      localStorage.setItem(state.answerStorage, JSON.stringify(state.examStorage))
      // console.log('输入答案', questionId, answer)
    },
    destroyExam (state, payload) {
      state.examList = null
    }
  },
  actions: {
    async getExamData ({commit, state}, examId, courseId) { // 获取试卷信息
			try {
        state.examId = examId
				const response = await examApi.getExamPaper({
					examId: state.examId
        })
        state.nowDate = response.headers.date
        // console.log('reportData', response, response.headers.date)
        if (response.data.code == 0) { // 正常获取试卷
          let examInfo = response.data.data
          // console.log('试题信息获取', examInfo)
          commit('initExams', examInfo)      
        } else if (response.data.code == 1003) { // 试卷已过期 以及其他特殊情况
          // console.log('to-error', response.data, examId, courseId, router)
          router.replace({name: 'report', params: {recordId: response.data.data.recordId, courseId}})
        } else if (response.data.code == 1004) { // 未报名 立即报名
          router.replace({name: 'error', query: {stat: 1004, description: response.data.data.singupUrl}})
        } else if (response.data.code == 1002) {
          router.replace({name: 'wait', params: {examId, courseId}})
        }
			} catch (e) {
				console.log(e)
			}
    }  
  }
}
