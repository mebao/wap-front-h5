<template>
    <div class="layout-base">
        <mt-header title="收费信息">
            <router-link to="/user" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div class="top-tab">
                      <div class="tab-info">
                          <div class="tab">
                              <div></div>
                              <div class="info name">
                                  <span class="">余额：{{user.userBalance}}元</span>
                              </div>
                              <div class="flex pt10 pb10 color-white">
                                <div class="flex-1 text-center">累计充值：{{recharge}}元</div>
                                <div class="flex-1 text-center">累计消费：{{consume}}元</div>
                            </div>
                          </div>
                      </div>
                  </div>
                 <mt-cell :key="tran.id" v-for="tran in tranList" :title="tran.time" :label="tran.typeText" @click.native="goRouter(tran)">-{{tran.amount}}</mt-cell>
                 <div v-if="nodata" class="ml10 mt10">
                     暂无交易记录
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';
import Common from '@/components/common';

export default {
    name:'payList',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            tranList:'',
            user:'',
            recharge: 0,
            consume: 0,
            nodata: false,
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            Indicator.open('加载中...');
            this.searchuser();
            this.searchtran();
        })
    },
    methods:{
        searchuser:function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token;
            this.$http.get(window.envs.api_url + '/searchuser' + urlOptions).then((res)=>{
                this.user = res.data.results.users[0];
            },(res)=>{

            });
        },
        searchtran:function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token;
            this.$http.get(window.envs.api_url + '/searchtran' + urlOptions).then((res)=>{
                Indicator.close();
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    if(res.data.results.list.length > 0){
            			for(var i = 0; i < res.data.results.list.length; i++){
            				res.data.results.list[i].payAmount = Common.toDecimal2((parseFloat(res.data.results.list[i].amount) + parseFloat(res.data.results.list[i].secondAmount)).toString());
            				res.data.results.list[i].totalAmount = Common.toDecimal2(parseFloat(res.data.results.list[i].amount) + parseFloat(res.data.results.list[i].giveAmount) + parseFloat(res.data.results.list[i].secondAmount == null ? '0' : res.data.results.list[i].secondAmount));
            				// 判断是否为充值
            				if(res.data.results.list[i].type == '2'){
            					this.recharge += parseFloat(res.data.results.list[i].totalAmount);
            				}
            				// 判断是否为消费
            				if(res.data.results.list[i].type == '1' || res.data.results.list[i].type == '3'){
            					this.consume += parseFloat(res.data.results.list[i].totalAmount);
                            }
                            res.data.results.list[i].amount = Common.toDecimal2(res.data.results.list[i].amount);
            			}
                    }else{
                        this.nodata = true;
                    }
                    this.tranList = res.data.results.list;
                    this.recharge = Common.toDecimal2(this.recharge);
		            this.consume = Common.toDecimal2(this.consume);
                }
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        goRouter:function(pay){
            sessionStorage.setItem('payDetail', JSON.stringify(pay));
            this.$router.push({path:'/user/payDetail',query:{id:pay.bookingId,type:pay.type}});
        }
    }
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
                text-align:center;
    			color:#fff;
    			font-weight: bold;
    			&.name{
    				font-size: 18px;
    			}
    		}
    	}
    }
    .mint-cell{
        min-height:60px;
        .mint-cell-label{
            font-size: 14px;
        }
    }
</style>
