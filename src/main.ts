
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import fb from '@/services/firebase.ts'
import './registerServiceWorker';

let app:any = null
fb.auth.onAuthStateChanged(user => {
    if (!app) {
      app = new Vue({
        router,
        render: h => h(App),
      }).$mount('#app');
    }
})


