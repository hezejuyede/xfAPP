import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/index'
import RealTimeData from '../components/realTimeData'
import UserLogin from '../components/login/userLogin'
import UserRegister from '../components/login/userRegister'
import ReportForm from '../components/reportForm'
import PDIDiagram from '../components/PDIDiagram'

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
      path: '/RealTimeData',
      name: 'RealTimeData',
      component: RealTimeData
    },
    {
      path: '/ReportForm',
      name: 'ReportForm',
      component: ReportForm
    },
    {
      path: '/PDIDiagram',
      name: 'PDIDiagram',
      component: PDIDiagram
    }
  ]
})
