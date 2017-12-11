// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import resource from './resource'
import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'

Vue.config.productionTip = false
import VueBus from 'vue-bus'
Vue.use(VueBus)

import Vuex from "vuex"

Vue.use(Vuex)

   import axios from "axios"
   import vueAxios from "vue-axios"


//import VueResource from 'vue-resource'
//Vue.use(VueResource);


Vue.use(vueAxios, axios)
//Vue.prototype.$http = axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

//router.beforeEach(function(to, from, next) {
//  console.log()
//  if (to.name == "login") {
//      next()
//  } else {
//      if (sessionStorage.getItem("userId")) {
//          next()
//      } else {
//          next(false)
//      }
//  }
//
//})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})