import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/style/index.less'
// 引入组件
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './until/dayjs'
// 注册组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
