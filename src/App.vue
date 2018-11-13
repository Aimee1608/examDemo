<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {Auth} from '@/networks/api'
import { Base64 } from 'js-base64'
import axios from 'axios'
export default {
  name: 'App',
  async beforeMount () {
    // try {
    //   const {data} = await Auth.getToken()   
    //   console.log('用户是否登录', data)
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${data.body}`
    //   // this.$router.replace()

    // } catch (e) {
    //   console.log('失败', e)
    //   const { response: { status } } = e
    //   if (status === 401) {
    //     window.location.href = 'https://login.mangoya.com/login/'+ Base64.encode(window.location.href)
    //   }
    // } 
    // // this.
  }
}
</script>
