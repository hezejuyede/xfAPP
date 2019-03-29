import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/index'
import UserLogin from '../components/login/userLogin'
import UserRegister from '../components/login/userRegister'
import ReportForm from '../components/reportForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/UserRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/ReportForm',
      name: 'ReportForm',
      component: ReportForm
    }
  ]
})
