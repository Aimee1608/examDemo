import Vue from 'vue'
import Vuex from 'vuex'
import ExamPage from '@/views/ExamPage/store'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ExamPage
    },
    state () {
        return {
            expTime: null,
            waitLogin: null,
            userIsLogin: false
        }
    },
    mutations: {
        setExpTime (state, payload) {
            state.expTime = payload
        },
        setWaitLogin (state, payload) {
            state.waitLogin = payload
        },
        setLogin (state, payload) {
            state.userIsLogin = true
        }
    } 
})
