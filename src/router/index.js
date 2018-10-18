import Vue from 'vue'
import Router from 'vue-router'
import WaitPage from '@/views/WaitPage/index.vue'
import ExamPage from '@/views/ExamPage/index.vue'
import ReportPage from '@/views/ReportPage/index.vue'
import ErrorPage from '@/views/ErrorPage/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/exam-pc/',
      redirect: {name: 'error'}
    },
    {
      path: '/exam-pc/wait/:examId/:courseId?',
      name: 'wait',
      component: WaitPage
    },
    {
      path: '/exam-pc/exam/:examId/:courseId?',
      name: 'exam',
      component: ExamPage
    },
    {
      path: '/exam-pc/report/:recordId/:courseId?',
      name: 'report',
      component: ReportPage
    },
    {
      path: '/exam-pc/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: {name: 'error'}
    }      
  ]
})
