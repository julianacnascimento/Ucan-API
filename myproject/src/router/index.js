import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD
=======
import Login from '@/components/Login'
>>>>>>> d2d2d3fc20e8cdffecf98bcd429f163e43bbf0c9

Vue.use(Router)

export default new Router({
  routes: [
<<<<<<< HEAD
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
=======
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/login', name: 'Login', component: Login }
>>>>>>> d2d2d3fc20e8cdffecf98bcd429f163e43bbf0c9
  ]
})
