<template>
  <div class="layout-base">
      <mt-header title="个人中心">
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page">
                <div class="top-tab">
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
                </div>
                <div class="childList">
                    <div class="info" @click="goChild()">
                        我的宝宝
                    </div>
                    <router-link to="user/payList">
                        <div class="info">
                            交易记录
                        </div>
                    </router-link>
                    <div @click="layout()" class="info">退出
                    </div>
                </div>
            </div>
        </div>
    </div>
    <mt-tabbar v-model="selected">
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
    </mt-tabbar>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    export default {
        name:'user',
        data(){
            return {
                selected:'tab2',
                childList:[],
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                user:'',
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.searchchild();
                this.searchuser();
            })
        },
        methods:{
            searchuser:function(){
                var urlOptions = '?username=' + this.username + '&token=' + this.token;
                this.$http.get(window.envs.api_url + '/searchuser' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        MessageBox('温馨提示', res.data.errorMsg);
                    }else{
                        this.user = res.data.results.users[0];
                    }
                },(res)=>{
                    MessageBox('温馨提示', '服务器错误');
                });
            },
            searchchild:function(){
                Indicator.open('加载中...');
                var urlOptions = '?username=' + this.username + '&token=' + this.token;
                this.$http.get(window.envs.api_url + '/childprofilelist' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        MessageBox('温馨提示', res.data.errorMsg);
                    }else{
                        this.childList = this.childList.concat(res.data.results.childs);
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    MessageBox('温馨提示', '服务器错误');
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
            goChild: function(){
                this.$router.push('/user/childList');
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
            }
        },
    }
</script>

<style lang="scss" scoped>
    .top-tab{
    	background: url('../../assets/bg_pay.jpg') repeat-y;
    	background-size: 100%;
    	.tab-info{
    		background-color: rgba(0,0,0,0.4);
    		padding:30px 10px 20px;
    		min-height: 100px;
    		.info{
    			color:#fff;
    			font-weight: bold;
    			&.name{
    				font-size: 18px;
    			}
    		}
    	}
    }
    .childList{
        .info{
            background-color:#fff;
            padding:10px;
            margin:10px 0;
        }
    }
</style>
