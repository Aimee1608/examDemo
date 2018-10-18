import axios from 'axios'

export default {
  getDiagnosisDescription: ({examId, isLogin}, config = {}) => axios.get(isLogin == 1 ? `exam/diagnosisDescription/${examId}/1?v=${new Date().getTime()}` : `exam/diagnosisDescription/${examId}?v=${new Date().getTime()}`, config) // 诊断说明
}
