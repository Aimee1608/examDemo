import axios from 'axios'

export default {
  getExamPaper: ({examId}, config = {}) => axios.get(`exam/examPaper/${examId}?v=${new Date().getTime()}`, config), // 返回所有题目数据
  submitPaper: ({examId, paperId, answer}, config = {}) => axios.post(`exam/submit/${examId}/${paperId}?v=${new Date().getTime()}`, {answer}, config) // 提交试卷
}
