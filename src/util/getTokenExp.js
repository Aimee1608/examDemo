import axios from 'axios'
import {Auth} from '@/networks/api' 
const getTokenExp = async (store) => {
    const expiryTime = store.state.expTime * 1000
    const isExpiry = new Date().getTime() + 60 * 1000 > expiryTime
    if (isExpiry) {
      console.log('====isExpiry====')
      const {data} = await Auth.getToken()   
      console.log('用户是否登录', data)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.body}`
      store.commit('setExpTime', data.exp)
    }
}
export default getTokenExp
