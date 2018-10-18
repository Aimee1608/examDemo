import axios from 'axios'

export default {
  getHotWords: () => axios.get(`Index/hotWords?v=${new Date().getTime()}`),
  getQuerySug: ({ keyword = '' }) => axios.get(`QuerySug/getQuerySug/${keyword}?v=${new Date().getTime()}`),
  getSearchHistorys: () => axios.get(`Index/searchHistorys?v=${new Date().getTime()}`),
  deleteSearchHistorys: () => axios.get(`HotWords/allDeleteStuSearchHistory?v=${new Date().getTime()}`)
}
