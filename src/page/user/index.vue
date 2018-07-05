<template>
  <div class="layout-base">
      <mt-header title="个人中心">
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page">
                <!-- <div class="top-tab">
                    <div class="tab-info">
                        <div class="tab">
                            <div></div>
                            <div class="info name">
                                <span class="">{{user.name}}：{{user.mobile}}</span>
                            </div>
                            <div v-if="user.memberId != null" class="info mt10">
                                {{user.memberName}}
                            </div>
                            <div class="info mt10">
                                <div :key="act.cardId" v-for="act in user.actCards" class="">{{act.activityName}} 剩余次数：{{act.num}}次</div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="top-tab">
                    <div class="tab-info">
                        <div class="flex">
                            <div><img slot="icon" src="../../assets/5.png" width="100" height="105"></div>
                            <div class="flex-1 user info ml10"><div class="name">{{user.name}} 家长</div><div>{{user.mobile}}</div></div>
                            <div class="flex-1"></div>
                            <div class="card info"><div class="card-name" v-if="user.memberName!=null">{{user.memberName}}</div><div class="balance mt3">余额：{{user.userBalance}}元</div></div>
                        </div>
                    </div>
                </div>
                <div class="childList mt5">
                    <mt-cell class="booking" title="我的预约" :class="activeBooking?'active':''" @click.native="checkActive('booking')">
                        <img slot="icon" src="../../assets/2.png" width="24" height="24">
                    </mt-cell>
                    <mt-cell v-if="activeBooking" class="childInfo"  v-for="child in childList" :key="'booking'+child.childId" :title="child.childName+'的预约'" is-link @click.native="goBooking(child)">
                        <img v-if="child.gender == '男'" slot="icon" src="../../assets/boy.png" height="24">
                        <img v-if="child.gender == '女'" slot="icon" src="../../assets/girl.png" height="24">
                    </mt-cell>
                    <mt-cell class="child" :class="active?'active':''" title="我的宝宝" @click.native="checkActive('child')">
                        <img slot="icon" src="../../assets/1.png" width="24" height="24">
                    </mt-cell>
                    <mt-cell v-if="active" class="childInfo"  v-for="child in childList" :key="child.childId" :title="child.childName" is-link @click.native="goChild(child)">
                        <img v-if="child.gender == '男'" slot="icon" src="../../assets/boy.png" height="24">
                        <img v-if="child.gender == '女'" slot="icon" src="../../assets/girl.png" height="24">
                    </mt-cell>
                    <mt-cell title="我的卡包" is-link @click.native="goCard()">
                        <img slot="icon" src="../../assets/3.png" width="24" height="24">
                    </mt-cell>
                    <mt-popup class="actPopup" v-model="popupVisible" position="bottom"  popup-transition="popup-fade">
                        <div class="card-header flex"><div></div><div class="flex-1 text-center">我的卡包</div><div @click="cancelCard()"><img src="../../assets/cancel.png" height="15"></div></div>
                        <div class="card flex" :class="index == (user.actCards.length-1) ? 'last' : ''" v-for="(card,index) in user.actCards" :key="card.activityId"><img slot="icon" src="../../assets/3.png" width="22" height="22"><div class="flex-1 ml10">{{card.activityName}}</div><div>{{card.num+'次'}}</div></div>
                    </mt-popup>
                    <mt-cell title="交易记录" is-link to="user/payList">
                        <img slot="icon" src="../../assets/4.png" width="24" height="24">
                    </mt-cell>
                    <div class="flex mt20">
                        <div class="flex-1 text-center">
                            <router-link to="/booking/booking">
                                <img src="../../assets/create_booking.png" width="100" height="100">
                            </router-link>
                        </div>
                        <div class="flex-1 text-center">
                            <router-link to="/user/createChild">
                                <img src="../../assets/create_child.png" width="100" height="100">
                            </router-link>
                        </div>
                    </div>
                    <div class="btn-large">
                        <mt-button class="mt10" size="large" type="primary" @click="layout()" >退出</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <mt-tabbar v-model="selected">
          <mt-tab-item id="tab1" @click.native="goRouter('tab1')">
            <img slot="icon" v-if="selected === 'tab1'" src="../../assets/booking.png">
            <img slot="icon" v-if="selected !== 'tab1'" src="../../assets/booking_default.png">
            预约
          </mt-tab-item>
          <mt-tab-item id="tab2" @click.native="goRouter('tab2')">
              <img slot="icon" v-if="selected === 'tab2'" src="../../assets/user.png">
              <img slot="icon" v-if="selected !== 'tab2'" src="../../assets/user_default.png">
            我的
          </mt-tab-item>
    </mt-tabbar> -->
  </div>
</template>
<script>
    import { MessageBox,Indicator,Toast } from 'mint-ui';
    export default {
        name:'user',
        data(){
            return {
                selected:'tab2',
                childList:[],
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                user:'',
                active: false,
                activeBooking: false,
                popupVisible: false,
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.searchchild();
                this.searchuser();
            })
        },
        methods:{
            checkActive:function(type){
                if(type=='booking'){
                    this.activeBooking = !this.activeBooking;
                }else{
                    this.active = !this.active;
                }
            },
            searchuser:function(){
                var urlOptions = '?username=' + this.username + '&token=' + this.token;
                this.$http.get(window.envs.api_url + '/searchuser' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        this.user = res.data.results.users[0];
                    }
                },(res)=>{
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            },
            searchchild:function(){
                Indicator.open('加载中...');
                var urlOptions = '?username=' + this.username + '&token=' + this.token;
                this.$http.get(window.envs.api_url + '/childprofilelist' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        this.childList = this.childList.concat(res.data.results.childs);
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            },
            layout:function(){
                MessageBox.confirm('确定退出?','温馨提示').then(() => {
                    localStorage.removeItem('username');
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                },()=>{

                });
            },
            goChild: function(child){
                sessionStorage.setItem('child',JSON.stringify(child));
                this.$router.push('/user/childInfo');
            },
            goBooking: function(child){
                sessionStorage.setItem('child',JSON.stringify(child));
                this.$router.push('/orderList?from=user');
            },
            goCard: function(){
                this.popupVisible = true;
                // sessionStorage.setItem('cards',JSON.stringify(this.user.actCards));
                // this.$router.push('/user/card');
            },
            goGrowth: function(child){
                sessionStorage.setItem('child',JSON.stringify(child));
                this.$router.push('/user/childGrowthLine');
            },
            goRouter:function(tab){
                if(tab == 'tab1'){
                    this.$router.push('/booking/booking');
                }else{
                    this.$router.push('/user');
                }
            },
            cancelCard: function(){
                this.popupVisible = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mt20{
        margin-top:20px;
    }
    .mt3{
        margin-top:3px;
    }
    .top-tab{
    	background: url('../../assets/bg_pay.jpg') repeat-y;
    	background-size: 100%;
    	.tab-info{
    		background-color: rgba(0,0,0,0.4);
    		padding:30px 0 10px 20px;
    		min-height: 100px;
            color:#fff;
    		.info{
    			color:#fff;
    			font-weight: bold;
                margin-top:30px;
    			.name{
                    font-size: 18px;
                    color:#FFE65D;
                }
                .card-name{
                    background-color:#FFE65D;
                    border-top-left-radius:15px;
                    border-bottom-left-radius:15px;
                    padding:5px 15px;
                    color:#0E1E3D;
                }
                .balance{
                    font-size:12px;
                    text-align: center;
                }
    		}
    	}
    }
    .child /deep/, .booking /deep/{
        .mint-cell-wrapper:after{
            border: solid 2px #c8c8cd;
            border-bottom-width: 0;
            border-left-width: 0;
            content: " ";
            top: 50%;
            right: 20px;
            position: absolute;
            width: 5px;
            height: 5px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
        }
    }
    .child, .booking{
        &.active /deep/{
            .mint-cell-wrapper:after{
                -webkit-transform: translateY(-50%) rotate(135deg);
                transform: translateY(-50%) rotate(135deg);
            }
        }
    }
    .childList{
        .info{
            background-color:#fff;
            padding:10px;
            margin:10px 0;
        }
        .childInfo  /deep/{
            background-color: #f6f9ff;
            .mint-cell-title{
                margin-left:20px;
            }
        }
    }
    .actPopup{
        bottom: 50%;
        width: 85%;
        max-height:30vh;
        overflow: auto;
        .card-header{
            font-size: 18px;
            font-weight: 700;
            color: #333;
            border-bottom:1px solid #333;
            height:44px;
            padding:10px;
        }
        .card{
            height:40px;
            padding:10px 40px 10px 10px;
            border-bottom:1px solid #d9d9d9;
            &.last{
              border-bottom:none;  
            }
        }
    }
</style>
