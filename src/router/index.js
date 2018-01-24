import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Details from '@/pages/details'
import ManDetail from '@/pages/mandetails'
import SearchPage from '@/pages/searchpage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home, 
      meta: { keepAlive: true }
    },
    {
      path: '/details',
      name: 'Details',
      component: Details, 
      meta: { keepAlive: false }
    },
    {
      path: '/mandetails',
      name: 'ManDetail',
      component: ManDetail, 
      meta: { keepAlive: false } 
    },
    {
      path: '/searchpage',
      name: 'SearchPage',
      component: SearchPage, 
      meta: { keepAlive: false } 
    }
  ]
})
