// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
//import './vconsole.min.js'
import "@/config/env"
import "@/components/provider/uploadImg/uploadImg"

Vue.use(Mint);
Vue.use(VueResource);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title;
  }
  if (!to.meta.loginNoAuth) {  // 判断该路由是否需要登录权限
    var username= localStorage.getItem('username');
    var token= localStorage.getItem('token');
      if(to.name == 'login'){
        // 若已登录，直接进入个人中心
        if(username && token){
          next({
            path: '/user'
          });
        }
        next();
      }else{
        if(!(username&&token)){
          sessionStorage.setItem('toUrl',to.fullPath);
          next({
            path: '/login',
            query: {from: to.name}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
        next();
      }
  }
  else {
    next();
  }
 });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

import {Toast} from 'mint-ui';

//vue-resource拦截器
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;//请求头携带cookie
  next((res)=>{
    if(res.headers.map && ((res.headers.map['content-type'] && res.headers.map['content-type'].length > 0 && res.headers.map['content-type'][0].indexOf('application/json') == -1) || (res.headers.map['Content-Type'] && res.headers.map['Content-Type'].length > 0 && res.headers.map['Content-Type'][0].indexOf('application/json') == -1))){
      res.data = {
        status: 'no',
        errorMsg: '服务器错误'
      };
    }
    //设置重新登陆
    if(res.ok && res.data.status == 'no' && res.data.errorCode == '1001'){
        router.push('/login');
        // MessageBox({message: res.data.errorMsg,title:'温馨提示',confirmButtonText:'重新登录'}).then((value,action) => {
        //   localStorage.removeItem('token');
        //   localStorage.removeItem('username');
        //   router.push('/login');
        // },()=>{
        // });
    }
  });
});

