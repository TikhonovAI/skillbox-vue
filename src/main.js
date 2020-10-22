import Vue from 'vue';
import App from './App.vue';
import { message, data } from './data';
import alertLesson from './alert';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertLesson(message, data);
