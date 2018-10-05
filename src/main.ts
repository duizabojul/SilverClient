import fb from '@/services/firebase';
import Vue from 'vue';
import { Tooltip } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
Vue.component(Tooltip.name, Tooltip);

let app:any = null;
fb.auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});

