import axios from 'axios'
import router from '@/router'

const portUrl = '//examination.mangoya.com/'

// 设置全局请求前缀
axios.defaults.baseURL = portUrl 

axios.interceptors.response.use((response) => {
    // console.log('=====axios--response====', response)
    const { config, data } = response
    let reg = /diagnosisDescription|examPaper|submit/
    let paperReg = /paperAnalysis|diagnosisDescription/
    // console.log('reg', paperAnalysisReg.test(config.url))
    if (data && data.code && !paperReg.test(config.url)) {
        if ((data.code == 1003 || data.code == 1004 || data.code == 1002 || data.code == 401) && reg.test(config.url)) {
            return response
        } else {
            // console.log('=====err====', data, data.code, data.msg)
            // return response
            router.replace({name: 'error', query: {stat: data.code, description: data.msg}})
        }
    } else {
        return response
    }  
}, (e) => {
    return Promise.reject(e)
})
  
axios.interceptors.request.use(async config => {
    // Do something before request is sent
    return config
  }, error => {
    // Do something with request error
    return Promise.reject(error)
})
