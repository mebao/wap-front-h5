<template>
    <div class="layout-base">
        <mt-header :title="child.childName">
            <mt-button icon="back" slot="left" @click="goBack()"></mt-button>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div class="order-tab" v-for="order in allBookings" :key="order.id">
                      <div class="tab">
        					<div @click="detail(order)">
                                <div class="flex">
                                    <div class="flex-1 date">{{order.bookingDateText}}</div>
                                    <div>
                                        <div class="status" :class="{'in': order.status == '3' || order.status == '4' || order.status == '11', 'cancel':  order.status == '0', 'complete': order.status == '5'}">{{order.statusText}}</div>
                                    </div>
                                </div>
        						<p class="pt10">
        							<span>接诊医生：</span>
        							<span>{{order.doctorName}}</span>
        							<span>{{order.serviceName}}</span>
        						</p>
                                <p v-if="order.status != '0' && order.diagnosis != null && order.diagnosis != ''" class="pt10">
                                    <span>诊断结果：</span>
                                    <span :class="{'diagnosis': !(order.status == '4' || order.status == '5' || order.status == '11'), 'has-diagnosis': order.status == '4' || order.status == '5' || order.status == '11'}">{{order.status == '4' || order.status == '5' || order.status == '11' ? (!order.diagnosis || order.diagnosis == '' ? '暂无' : order.diagnosis) : '尚未就诊'}}</span>
                                </p>
        					</div>
        					<p class="text-right" v-show="order.status==1">
        						<button class="btn-cancel" @click="cancelOrder(order.id)">取消订单</button>
        					</p>
                        </div>
                      <div class="sawtooth"></div>
                  </div>
                  <div v-if="nodata" class="ml10 mt10">
                     暂无预约信息
                  </div>
                   <div class="mt10"></div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
    name:'orderList',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            child:JSON.parse(sessionStorage.getItem('child')),
            bookingList:'',
            caseList:'',
            bookingInNum: '0',
            allBookings:'',
            checkProjects:'',
            caseHistory:'',
            nodata: false,
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            document.title = this.child.childName;
            this.searchBookingfee();
            this.searchUserCheckProject();
            this.searchCaseHistory();
        })
    },
    methods:{
        goBack:function(){
            if(this.$route.query.from == 'childInfo'){
                this.$router.push('/user/childInfo');
            }else{
                this.$router.push('/user');
            }
        },
        searchBookingfee:function(){
            Indicator.open('加载中...');
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.child.childId;
            this.$http.get(window.envs.api_url + '/mybookings' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.allBookings = res.data.results.allBookings;
                    if(res.data.results.allBookings.length > 0){
                        for(var i = 0; i  < res.data.results.allBookings.length; i++){
                            res.data.results.allBookings[i].bookingDateText = res.data.results.allBookings[i].bookingDate.replace('-', '年');
                            res.data.results.allBookings[i].bookingDateText = res.data.results.allBookings[i].bookingDateText.replace('-', '月');
                            res.data.results.allBookings[i].bookingDateText = res.data.results.allBookings[i].bookingDateText.replace(' ', '日 ');
                            if(res.data.results.allBookings[i].begin){
                                res.data.results.allBookings[i].beginText = res.data.results.allBookings[i].begin.replace('-', '年');
                                res.data.results.allBookings[i].beginText = res.data.results.allBookings[i].beginText.replace('-', '月');
                                res.data.results.allBookings[i].beginText = res.data.results.allBookings[i].beginText.replace(' ', '日 ');
                            }
                            if(res.data.results.allBookings[i].status == '4' || res.data.results.allBookings[i].status == '5' || res.data.results.allBookings[i].status == '11'){
                                this.bookingInNum++;
                            }
                        }
                    }else{
                        this.nodata = true;
                    }
                }
                Indicator.close();
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchCaseHistory:function(){
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.child.childId;
            this.$http.get(window.envs.api_url + '/searchcasehistory' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.caseHistory = res.data.results.list;
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchUserCheckProject:function(){
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.child.childId + '&today=1&ischeck=1';
            this.$http.get(window.envs.api_url + '/usercheckprojects' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.checkProjects = res.data.results.list;
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        checkList: function(){
            this.$router.push({path: '/order/checkList',query:{childId:this.child.childId}});
        },
        detail: function(order){
            this.$router.push('order/detail?id=' + order.id);
        },
        cancelOrder: function(id){
            MessageBox.confirm('<textarea id="cancelRemark" placeholder="请输入取消原因" style="padding: 10px; width: 100%; border-radius: 4px; border-color: #d6d6d6;"></textarea>','温馨提示').then(() => {
                var options={
						username: this.username,
						token: this.token,
						id: id,
						remark: document.getElementById('cancelRemark').value,
					}
                    var urlOptions = '/' + id + '?username=' + this.username + '&token=' + this.token + '&remark=' + document.getElementById('cancelRemark').value
                    Indicator.open('加载中...');
                    this.$http.get(window.envs.api_url + '/bookingcancelled' + urlOptions).then((res)=>{
                        Indicator.close();
						if(res.data.status=='ok'){
							this.searchBookingfee();
						}else{
                            MessageBox('温馨提示',res.data.errorMsg);
                        }
                    },(res)=>{
                        Indicator.close();
                        Toast({message: "服务器错误",position: 'middle',duration: 3000});
                    });
            },()=>{

            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-tab{
    	background: url('../../assets/bg2.jpg') repeat-y;
    	background-size: 100%;
        color:#fff;
        .child-img{
            width:70px;
        }
        .tab{
            background-color: rgba(0,0,0,0.2);
            padding-top:20px;
        }
    	.order-info{
    		padding:10px;
    		.item{
                border-right:1px solid #fff;
    			&.no-border{
    				border-right:none;
    			}
    		}
    	}
    }
    .order-tab{
        background:#fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        margin: 10px 10px 0px;
        .tab{
            padding:10px;
            .diagnosis{
                color: #D45D5D;
            }
            .has-diagnosis{
                color: #34E945;
            }
        }
        .status{
            border-radius: 4px;
            color: #fff;
            padding: 2px 10px;
            background-color: #D45D5D;
            &.in{
                background-color:#39A99D;
            }
            &.cancel{
                background-color:#666666;
            }
            &.complete{
                background-color:#448CCB;
            }
        }
        .btn-cancel{
            padding: 5px 10px;
            background-color: #F4D020;
            border: none;
            color: #fff;
            border-radius: 5px;
        }
        .sawtooth{
            height: 5px;
            background: url('../../assets/sawtooth.jpg') no-repeat;
            background-size: 100% 100%;
        }
    }
</style>
