import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['@/page/login/index'], resolve);
const user = resolve => require(['@/page/user/index'], resolve);
// const childList = resolve => require(['@/page/user/childList'], resolve);
const childInfo = resolve => require(['@/page/user/childInfo'], resolve);
const createChild = resolve => require(['@/page/user/createChild'], resolve);
const updateChild = resolve => require(['@/page/user/updateChild'], resolve);
const payList = resolve => require(['@/page/user/payList'], resolve);
const payDetail = resolve => require(['@/page/user/payDetail'], resolve);
const addGrowth = resolve => require(['@/page/user/addGrowth'], resolve);
const growthdatas = resolve => require(['@/page/user/growthdatas'], resolve);
const updateGrowth = resolve => require(['@/page/user/updateGrowth'], resolve);
const card = resolve => require(['@/page/user/card'], resolve);
const orderList = resolve => require(['@/page/order/orderList'], resolve);
const orderDetail = resolve => require(['@/page/order/detail'], resolve);
const paySuccess = resolve => require(['@/page/order/paySuccess'], resolve);
const orderInfo= resolve => require(['@/page/order/info'], resolve);
const checkList = resolve => require(['@/page/order/checkList'], resolve);
const checkInfo= resolve => require(['@/page/order/checkInfo'], resolve);
const booking = resolve => require(['@/page/booking/booking'], resolve);

Vue.use(Router)

export default new Router({
  //loginNoAuth: true 不需要登录验证
  mode:'history',
  routes: [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path:'/login',
        name:'login',
        meta:{
          title:'登录'
        },
        component:login
    },
    {
      path:'/user',
      name:'user',
      meta:{
        title:'个人中心'
      },
      component:user,
    },
    // {
    //   path:'/user/childList',
    //   name:'childList',
    //   meta:{
    //     title:'宝宝列表'
    //   },
    //   component:childList,
    // },
    {
      path:'/user/childInfo',
      name:'childInfo',
      meta:{
        title:'宝宝信息'
      },
      component: childInfo,
    },
    {
      path: '/user/createChild',
      name: 'createChild',
      meta:{
        title:'添加宝宝'
      },
      component: createChild
    },
    {
      path: '/user/updateChild',
      name: 'createChild',
      meta:{
        title:'修改宝宝'
      },
      component: updateChild
    },
    {
      path: '/user/payList',
      name: 'payList',
      meta:{
        title:'收费信息'
      },
      component: payList
    },
    {
      path: '/user/payDetail',
      query: {id:'',type:''},
      name: 'payDetail',
      meta:{
        title:'收费信息'
      },
      component: payDetail
    },
    {
      path: '/user/addGrowth',
      query: {id:'',type:''},
      name: 'addGrowth',
      meta:{
        title:'添加数据'
      },
      component: addGrowth
    },
    {
      path: '/user/growthdatas',
      query: {id:'',type:''},
      name: 'growthdatas',
      meta:{
        title:'成长数据'
      },
      component: growthdatas
    },
    {
      path: '/user/updateGrowth',
      query: {id:'',type:''},
      name: 'updateGrowth',
      meta:{
        title:'修改数据'
      },
      component: updateGrowth
    },
    {
      path: '/user/card',
      query: {id:'',type:''},
      name: 'card',
      meta:{
        title:'我的卡包'
      },
      component: card
    },
    {
      path: '/orderlist',
      name: 'orderList',
      meta:{
        title:'预约列表'
      },
      component: orderList
    },
    {
      path: '/order/detail',
      name: 'orderDetail',
      meta:{
        title:'订单详情'
      },
      component: orderDetail
    },
    {
      path: '/order/info',
      name: 'orderInfo',
      meta: {loginNoAuth: true, title:'预约'},
      component: orderInfo
    },
    {
      path: '/order/paySuccess',
      name: 'paySuccess',
      meta: {loginNoAuth: true, title:'支付成功'},
      component: paySuccess
    },
    {
      path: '/order/checkList',
      query: {childId:''},
      name: 'checkList',
      meta:{
        title:'检查列表'
      },
      component: checkList
    },
    {
      path: '/order/checkInfo',
      query: {type:''},
      name: 'checkInfo',
      meta:{
        title:'检查详情'
      },
      component: checkInfo
    },
    {
      path: '/booking/booking',
      name: 'booking',
      meta:{
        title:'预约'
      },
      component: booking
    },
]
})
