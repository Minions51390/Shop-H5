import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  { path: '/home', name: 'home', component: resolve => require(['../view/home'], resolve) },
  { path: '/login', name: 'login', component: resolve => require(['../view/login'], resolve) },
  { path: '/register', name: 'register', component: resolve => require(['../view/register'], resolve) },
  { path: '/item', name: 'item', component: resolve => require(['../view/item'], resolve) },
  { path: '/itemList', name: 'itemList', component: resolve => require(['../view/itemList'], resolve) },
  { path: '/shopCar', name: 'shopCar', component: resolve => require(['../view/shopCar'], resolve) },
  { path: '/setMes', name: 'setMes', component: resolve => require(['../view/setMes'], resolve) },
  { path: '/shopOrder', name: 'shopOrder', component: resolve => require(['../view/shopOrder'], resolve) },
  { path: '/myList', name: 'myList', component: resolve => require(['../view/myList'], resolve) },
  { path: '/judgeShop', name: 'judgeShop', component: resolve => require(['../view/judgeShop'], resolve) },
  { path: '/adminLogin', name: 'adminLogin', component: resolve => require(['../view/adminLogin'], resolve) },
  { path: '/itemPage', name: 'itemPage', component: resolve => require(['../view/itemPage'], resolve) },
  { path: '/adminLog', name: 'adminLog', component: resolve => require(['../view/adminLog'], resolve) },
  { path: '/adminOrder', name: 'adminOrder', component: resolve => require(['../view/adminOrder'], resolve) }
]

export default new Router({
  mode: 'history',
  routes
})
