import Vue from 'vue';
import Router from 'vue-router';
import fb from '@/services/firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        requiresUnlogged: true,
      },
    },
    {
      path: '/verifyEmail',
      name: 'verifyEmail',
      component: () => import(/* webpackChunkName: "verifyEmail" */ './views/VerifyEmail.vue'),
      meta: {
        requiresNotVerified: true,
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        requiresVerified: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log();
  const currentUser = fb.auth.currentUser;
  if (to.matched.some(x => x.meta.requiresNotVerified || x.meta.requiresVerified) && !currentUser) {
    next('/login');
  } else if (to.matched.some(x => x.meta.requiresUnlogged) && currentUser) {
    next('/home');
  } else if (to.matched.some(x => x.meta.requiresVerified) && currentUser && !currentUser.emailVerified) {
    next('/verifyEmail');
  } else if (to.matched.some(x => x.meta.requiresNotVerified) && currentUser && currentUser.emailVerified) {
    next('/home');
  } else {
    next();
  }
});


export default router;
