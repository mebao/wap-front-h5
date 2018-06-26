<template>
    <div class="layout-base">
        <mt-header title="收费信息">
            <router-link to="payList" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <!-- 会员充值 -->
                    <div v-if="payType == '0'">
                        <div class="info-tab pad10">
                            <div class="text-center">{{detail.typeText}}</div>
                            <div class="text-center money">{{detail.amount}}元</div>
                            <div class="flex">
                                <div class="flex-1">充值金额：</div>
                                <div>{{detail.amount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">赠送金额：</div>
                                <div>{{detail.giveAmount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">收款方式：</div>
                                <div>{{detail.wayText}}</div>
                            </div>
                            <div class="flex pt10 color-g">
                                <div class="flex-1">交易时间：</div>
                                <div>{{detail.time}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 支付费用 -->
                    <div v-if="payType == '1'">
                        <div class="info-tab pad10" v-if="bookingfee != '' && bookingfee.feeinfo">
                            <div class="text-center">{{detail.typeText}}</div>
                            <div class="text-center money">{{detail.amount}}元</div>
                            <div v-for="info in bookingfee.feeinfo['医生服务费用']" class="flex" :key="info.id">
                                <div class="flex-1">{{info.serviceName}}</div>
                                <div>{{info.originalFee}}</div>
                            </div>
                            <div v-for="info in bookingfee.feeinfo['检查项目费用']" class="flex" :key="info.id">
                                <div class="flex-1">{{info.projectName}}</div>
                                <div>{{info.originalFee}}</div>
                            </div>
                            <div v-for="info in bookingfee.feeinfo['辅助项目费用']" class="flex" :key="info.id">
                                <div class="flex-1">{{info.projectName}}</div>
                                <div>{{info.originalFee}}</div>
                            </div>
                            <div v-if="bookingfee.feeinfo['药方药品费用'].length > 0">
                                <div v-for="info in bookingfee.feeinfo['药方药品费用'][0].info" class="flex" :key="info.id">
                                    <div class="flex-1">{{info.pname + '-' + info.num + info.unit}}</div>
                                    <div>{{info.allFee}}</div>
                                </div>
                            </div>
                            <div v-for="info in bookingfee.feeinfo['中药药方费用']" class="flex" :key="info.id">
                                <div class="flex-1">{{info.projectName}}</div>
                                <div>{{info.originalFee}}</div>
                            </div>
                            <div v-for="info in bookingfee.feeinfo['其他费用']" class="flex" :key="info.id">
                                <div class="flex-1">{{info.projectName}}</div>
                                <div>{{info.originalFee}}</div>
                            </div>
                            <div class="flex pt10">
                                <div class="flex-1">费用合计：</div>
                                <div>{{detail.needAmount}}</div>
                            </div>
                            <div v-if="bookingfee.feeinfo['预约金']" class="flex">
                                <div class="flex-1">已支付预约金：</div>
                                <div>-{{bookingfee.feeinfo['预约金'].fee}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">折扣金额：</div>
                                <div>-{{detail.discountAmount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">减免金额：</div>
                                <div>-{{detail.giveAmount}}</div>
                            </div>
                            <div class="flex pt10">
                                <div class="flex-1">{{detail.wayText}}：</div>
                                <div>{{detail.amount}}</div>
                            </div>
                            <div v-if="detail.secondWay" class="flex">
                                <div class="flex-1">{{detail.secondWayText}}：</div>
                                <div>{{detail.secondAmount}}</div>
                            </div>
                            <div v-if="detail.secondType != '0'" class="pt10 text-right" :class="{'unComplete': detail.secondType == '1', 'complete': detail.secondType == '2'}">
                                {{detail.secondType == '1' ? '挂账金额待支付' : '挂账金额已支付'}}
                            </div>
                            <div class="flex pt10 color-g">
                                <div class="flex-1">交易时间：</div>
                                <div>{{detail.time}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 药品零售 -->
                    <div v-if="payType == '2'">
                        <div class="info-tab pad10">
                            <div class="text-center">{{detail.typeText}}</div>
                            <div class="text-center money">{{detail.amount}}元</div>
                            <div v-for="info in detail.drug.info" class="flex" :key="info.id">
                                <div class="flex-1">{{info.pname}}-{{info.num}}{{info.unit}}</div>
                                <div>{{info.allFee}}</div>
                            </div>
                            <div class="flex pt10">
                                <div class="flex-1">费用合计：</div>
                                <div>{{detail.drug.needAmount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">折扣金额：</div>
                                <div>-{{detail.drug.discountAmount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">减免金额：</div>
                                <div>-{{detail.giveAmount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">实收金额：</div>
                                <div>{{detail.drug.amount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">收款方式：</div>
                                <div>{{detail.wayText}}</div>
                            </div>
                            <div class="flex pt10 color-g">
                                <div class="flex-1">交易时间：</div>
                                <div>{{detail.time}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 支付预约金 -->
                    <div v-if="payType == '3'">
                        <div class="info-tab pad10">
                            <div class="text-center">{{detail.typeText}}</div>
                            <div class="text-center money">{{detail.amount}}元</div>
                            <div class="flex">
                                <div class="flex-1">支付预约金：</div>
                                <div>{{detail.amount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">收款方式：</div>
                                <div>{{detail.wayText}}</div>
                            </div>
                            <div class="flex pt10 color-g">
                                <div class="flex-1">交易时间：</div>
                                <div>{{detail.time}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 活动卡售卖 -->
                    <div v-if="payType == '4'">
                        <div class="info-tab pad10">
                            <div class="text-center">{{detail.typeText}}</div>
                            <div class="text-center money">{{detail.amount}}元</div>
                            <div class="flex">
                                <div class="flex-1">购买活动卡：</div>
                                <div>{{detail.amount}}</div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">收款方式：</div>
                                <div>{{detail.wayText}}</div>
                            </div>
                            <div class="flex pt10 color-g">
                                <div class="flex-1">交易时间：</div>
                                <div>{{detail.time}}</div>
                            </div>
                        </div>
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
    name:'payDetail',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            detail:JSON.parse(sessionStorage.getItem('payDetail')),
            payType:'',
            bookingfee:'',
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.initDate();
        })
    },
    methods:{
        initDate:function(){
            this.detail.amount = Common.toDecimal2(this.detail.amount);
            var type = this.$route.query.type;
        	if(type == '2'){
        		// 会员充值
        		this.payType = '0';
        	}else if(type == '1'){
        		if(this.detail.drug){
        			// 药品零售
        			// this.payType = '2';
        			// this.detail.drug.discountAmount = Common.toDecimal2(parseFloat(this.detail.drug.needAmount) - parseFloat(this.detail.drug.giveAmount) - parseFloat(this.detail.drug.amount));
        			// if(this.detail.drug.info.length > 0){
        			// 	for(var i = 0; i < this.detail.drug.info.length; i++){
        			// 		this.detail.drug.info[i].allFee = Common.toDecimal2(parseFloat(this.detail.drug.info[i].num) * parseFloat(this.detail.drug.info[i].price));
        			// 	}
        			// }
        		}else{
        			// 支付费用
        			this.payType = '1';
        			Indicator.open('加载中');
                    var urlOptions =  '/' + this.$route.query.id + '?username=' + this.username + '&token=' + this.token;
                    this.$http.get(window.envs.api_url + '/bookingfee' + urlOptions).then((res)=>{
                        Indicator.close();
                        if(res.data.status == 'no'){
                            Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                        }else{
                            this.bookingfee = res.data.results;
                            this.detail.needAmount = 0;
            				if(res.data.results.feeinfo['医生服务费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['医生服务费用'].length; i++){
            						res.data.results.feeinfo['医生服务费用'][i].originalFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['医生服务费用'][i].price) * parseFloat(res.data.results.feeinfo['医生服务费用'][i].number));
            						this.detail.needAmount += parseFloat(res.data.results.feeinfo['医生服务费用'][i].originalFee);
            					}
                            }
            				if(res.data.results.feeinfo['检查项目费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['检查项目费用'].length; i++){
            						res.data.results.feeinfo['检查项目费用'][i].originalFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['检查项目费用'][i].price) * parseFloat(res.data.results.feeinfo['检查项目费用'][i].number));
            						this.detail.needAmount += parseFloat(res.data.results.feeinfo['检查项目费用'][i].originalFee);
            					}
            				}
            				if(res.data.results.feeinfo['辅助项目费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['辅助项目费用'].length; i++){
            						res.data.results.feeinfo['辅助项目费用'][i].originalFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['辅助项目费用'][i].price) * parseFloat(res.data.results.feeinfo['辅助项目费用'][i].number));
            						this.detail.needAmount += parseFloat(res.data.results.feeinfo['辅助项目费用'][i].originalFee);
            					}
            				}
            				if(res.data.results.feeinfo['药方药品费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['药方药品费用'].length; i++){
            						var originalFee = 0;
            						if(res.data.results.feeinfo['药方药品费用'][i].info.length > 0){
            							for(var j = 0; j < res.data.results.feeinfo['药方药品费用'][i].info.length; j++){
            								res.data.results.feeinfo['药方药品费用'][i].info[j].allFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['药方药品费用'][i].info[j].num) * parseFloat(res.data.results.feeinfo['药方药品费用'][i].info[j].price));
            								originalFee += parseFloat(res.data.results.feeinfo['药方药品费用'][i].info[j].allFee);
            								this.detail.needAmount += parseFloat(res.data.results.feeinfo['药方药品费用'][i].info[j].allFee);
            							}
            						}
            						res.data.results.feeinfo['药方药品费用'][i].originalFee = Common.toDecimal2(originalFee);
            					}
            				}
            				if(res.data.results.feeinfo['中药药方费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['中药药方费用'].length; i++){
            						res.data.results.feeinfo['中药药方费用'][i].originalFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['中药药方费用'][i].price) * parseFloat(res.data.results.feeinfo['中药药方费用'][i].number));
            						this.detail.needAmount += parseFloat(res.data.results.feeinfo['中药药方费用'][i].originalFee);
            					}
            				}
            				if(res.data.results.feeinfo['其他费用'].length > 0){
            					for(var i = 0; i < res.data.results.feeinfo['其他费用'].length; i++){
            						res.data.results.feeinfo['其他费用'][i].originalFee = Common.toDecimal2(parseFloat(res.data.results.feeinfo['其他费用'][i].price) * parseFloat(res.data.results.feeinfo['其他费用'][i].number));
            						this.detail.needAmount += parseFloat(res.data.results.feeinfo['其他费用'][i].originalFee);
            					}
            				}
            				this.detail.discountAmount = Common.toDecimal2(this.detail.needAmount - parseFloat(this.detail.giveAmount) - parseFloat(this.detail.amount) - parseFloat(this.detail.secondAmount == null ? '0' : this.detail.secondAmount) - (res.data.results.feeinfo['预约金'] ? parseFloat(res.data.results.feeinfo['预约金'].fee) : 0));
            				this.detail.needAmount = Common.toDecimal2(this.detail.needAmount);
                        }
                    },(res)=>{
                        Indicator.close();
                        Toast({message: "服务器错误",position: 'middle',duration: 3000});
                    });
        		}
        	}else if(type == '3'){
        		// 支付预约金
        		this.payType = '3';
        	}else if(type == '6'){
        		//活动卡售卖
        		this.payType = '4';
        	}else if(type == '4'){
                //药品零售
                if(this.detail.drug){
                    this.payType = '2';
                    this.detail.drug.discountAmount = Common.toDecimal2(parseFloat(this.detail.drug.needAmount) - parseFloat(this.detail.drug.giveAmount) - parseFloat(this.detail.drug.amount));
                    if(this.detail.drug.info.length > 0){
                        for(var i = 0; i < this.detail.drug.info.length; i++){
                            this.detail.drug.info[i].allFee = Common.toDecimal2(parseFloat(this.detail.drug.info[i].num) * parseFloat(this.detail.drug.info[i].price));
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .info-tab{
        background:#fff;
        .money{
            padding:20px 0 10px;
            font-size:20px;
        }
    }
    .complete{
        color: #39A99D;
    }
    .unComplete{
		color: #D45D5D;
	}
</style>
