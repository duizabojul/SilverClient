import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import fb from '@/services/firebase.ts'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path : '*',
      redirect : '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta : {
        requiresUnlogged : true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      meta : {
        requiresLogged : true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = fb.auth.currentUser
  if (to.matched.some(x => x.meta.requiresLogged) && !currentUser) {
      next('/login')
  } else if (to.matched.some(x => x.meta.requiresUnlogged) && currentUser) {
      next('/home')
  } else {
      next()
  }
})


export default router
