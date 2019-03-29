import Vue from 'vue'
import Router from 'vue-router'


import Index from '../components/index'
import userLogin from '../components/login/userLogin'
import YX from '../components/yx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/YX',
      name: 'YX',
      component: YX
    }
  ]
})
