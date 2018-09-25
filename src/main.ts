
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.component('NavBar', NavBar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
