import axios from 'axios'

export default {
  getToken: () => axios.get(`https://login.mangoya.com/auth/getAccessToken?v=${new Date().getTime()}`, {
    withCredentials: true,
    transformRequest: [(data, headers) => {
      // delete headers.common['X-Region']
      return data
    }]
  })
}
