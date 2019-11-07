import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/common.css";
import '@/permission.js';
import 'normalize.css/normalize.css'
import '@/assets/css/common.css'
import '@/icons' // icon
import * as filters from './filters'

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$imgUrl = process.env.NODE_ENV == 'production' ? "/upload" : "http://www.52hongbo.com/upload";

function startLoading() {
  return {
    show: () => {
      return ElementUI.Loading.service({
        lock: true,
        text: "加载中...",
        background: 'rgba(0,0,0,.7)'
      })
    },
    hide: function () {
      this.show.close();
    }
  }
}

Vue.prototype.myloading = startLoading();




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
