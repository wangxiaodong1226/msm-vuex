import Vue from "vue";

import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from '@/store'
import './permession'
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
