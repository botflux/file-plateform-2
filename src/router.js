import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        authorizedRoles: ['ROLE_USER', 'ROLE_ADMIN']
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/login.vue'),
      meta: {
        authorizedRoles: ['']
      }
    }, {
      path: '/tool',
      name: 'tool',
      component: () => import(/* webpackChunkName: "tool" */'./views/tool.vue'),
      meta: {
        authorizedRoles: ['ROLE_ADMIN', 'ROLE_USER']
      }
     }
  ],
})

const getDefaultPage = userRole => {
  if (userRole == 'ROLE_ADMIN') return '/'
  else if (userRole == 'ROLE_USER') return '/'
  else return '/login'
}

let userRole = ''

store.watch((state, getters) => state.user.payload, (newValue, oldValue) => {
  userRole = (newValue.role) ? newValue.role : ''

  if (!router.app.$route.meta.authorizedRoles.includes(userRole)) {
    router.push(getDefaultPage(userRole))
  } 
})

router.beforeEach((to, from, next) => {
  if (!to.meta.authorizedRoles.includes(userRole)) {
    next(getDefaultPage(userRole))
  } else {
    next()
  }
})

export default router