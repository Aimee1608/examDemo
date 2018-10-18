// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.less'
import App from './App'
import './networks/init.js'
import store from '@/store'
import {Auth} from '@/networks/api'
import { Base64 } from 'js-base64'
import axios from 'axios'
import 'babel-polyfill'
sync(store, router)
Vue.config.productionTip = false
Vue.use(Element)

router.beforeEach((to, from, next) => {
  const getToken = async () => {
    try {
        const {data} = await Auth.getToken()   
        // console.log('用户是否登录', data)
        // console.log(to, window.location.protocol + '//' + window.location.host + to.fullPath)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.body}`
        store.commit('setExpTime', data.exp)
        store.commit('setWaitLogin', 1)
        store.commit('setLogin', true)
        next()
    } catch (e) {
        // console.log('失败', e, to.name)
        const { response: { status } } = e
        if (status === 401) {
          if (to.name == 'wait' || to.name == 'error') {
            store.commit('setWaitLogin', 0)
            next()
          } else { 
            // console.log(888)
            window.location.href = 'https://login.xueersi.com/login/' + Base64.encode(window.location.protocol + '//' + window.location.host + to.fullPath)     
          }     
        }
    } 
  }
  getToken()   
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
