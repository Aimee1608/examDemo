import axios from 'axios'

export default {
  getReport: ({recordId, courseId}, config = {}) => axios.get(courseId ? `exam/report/${recordId}/${courseId}?v=${new Date().getTime()}` : `exam/report/${recordId}/0?v=${new Date().getTime()}`, config), // 诊断结果
  getReportAnalysis: ({recordId}, config = {}) => axios.get(`exam/reportAnalysis/${recordId}?v=${new Date().getTime()}`, config), // 诊断分析
  getPaperAnalysis: ({recordId}, config = {}) => axios.get(`exam/paperAnalysis/${recordId}?v=${new Date().getTime()}`, config), // 试卷分析
  getrecommendCourse: ({recordId}, config = {}) => axios.get(`exam/recommendCourse/${recordId}?v=${new Date().getTime()}`, config) // 推荐课程
}
