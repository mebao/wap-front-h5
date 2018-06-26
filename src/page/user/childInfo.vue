<template>
    <div class="layout-base">
        <mt-header :title="child.childName">
            <router-link to="/user" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
            <!-- <mt-button slot="right" @click="goChild()">修改信息</mt-button> -->
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div class="top-tab">
                        <div class="tab">
                            <div class="flex">
                                <div class="flex-1 pay-tab text-center">
                                </div>
                                <div>
                                    <img v-if="child.imageUrl" :src="child.imageUrl" class="child-img">
                                    <img v-if="child.imageUrl == null" src="../../assets/icon_child.png" class="child-img">
                                </div>
                                <div class="flex-1"></div>
                            </div>
                            <div class="text-center info mt5">
                                <span class="color-main">{{child.gender}}</span>
                                <span class=""><span v-if="child.bloodType != '未知'">{{child.bloodType}}</span></span>
                                <span class=""><button @click="goChild()" class="editor"><span>编辑</span><img src="../../assets/editor.png" height="20" width="20" slot="icon"></button></span>
                            </div>
                            <div class="text-center info mt5">
                                <span>{{child.age}}</span>
                                <span v-if="child.shengxiao != '未知'">{{child.shengxiao}}</span>
                                <span v-if="child.horoscope != '未知'">{{child.horoscope}}</span>
                            </div>
                            <!-- <div class="order-info">
                                <div class="flex text-center">
                                    <div v-if="child" class="flex-1">
                                        <router-link to="/orderList">
                                            <div class="item">{{bookingInNum}}次就诊</div>
                                        </router-link>
                                    </div>
                                    <div v-if="child" class="flex-1">
                                        <div class="item">{{caseHistory.length}}份病历</div>
                                    </div>
                                    <div v-if="child" class="flex-1" @click="checkList()">
                                        <div class="item no-border">{{checkProjects.length}}组报告</div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                   <div class="mt10"></div>
                   <div class="order-info">
                        <div class="flex text-center">
                            <div v-if="child" class="flex-1">
                                <router-link to="/orderList">
                                    <div class="item">{{bookingInNum}}次就诊</div>
                                </router-link>
                            </div>
                            <div v-if="child" class="flex-1">
                                <div class="item">{{caseHistory.length}}份病历</div>
                            </div>
                            <div v-if="child" class="flex-1" @click="checkList()">
                                <div class="item no-border">{{checkProjects.length}}组报告</div>
                            </div>
                        </div>
                    </div>
                   <!-- <div class="childInfo">
                       <router-link to="/orderList">
                            <div class="info">
                                    预约信息
                            </div>
                        </router-link>
                    </div> -->
                    <div class="flex growth-btn">
                        <div class="flex-1 text-center"><button @click="goAddGrowth()">新建成长数据</button></div>
                        <div class="flex-1 text-center"><button v-if="!nodata" @click="goGrowthData()" class="last-button">修改成长数据</button><button v-if="nodata" class="last-button disabled">修改成长数据</button></div>
                    </div>
                    <div class="pr10 pl10">
                        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
                    </div>
                    <div class="pr10 pl10">
                        <ve-line :data="chartDataWeight" :settings="chartSettingsWeight"></ve-line>
                    </div>
                    <!-- <div v-if="nodata" class="ml10 mt10">暂无成长数据</div> -->
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';
import veLine from 'v-charts/lib/line'

export default {
    name:'childInfo',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            childId:JSON.parse(sessionStorage.getItem('child')).childId,
            child:'',
            bookingList:'',
            caseList:'',
            bookingInNum: '0',
            allBookings:'',
            checkProjects:'',
            caseHistory:'',
            chartData:{},
            chartSettings:{},
            chartDataWeight:{},
            chartSettingsWeight:{},
            active: 'tab-height',
            heightdata:'',
            weightdata:'',
            childList:'',
            nodata: false,
        }
    },
    components:{
        've-line': veLine
    },
    mounted:function(){
        this.$nextTick(function () {
            this.searchchild();
            this.searchBookingfee();
            this.searchUserCheckProject();
            this.searchCaseHistory();
            this.searchchildgrowth();
        })
    },
    methods:{
        searchchild:function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token;
            this.$http.get(window.envs.api_url + '/childprofilelist' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Indicator.close();
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.childList = res.data.results.childs;
                    for(var i=0;i<res.data.results.childs.length;i++){
                        if(this.childId == res.data.results.childs[i].childId){
                            this.child = res.data.results.childs[i];
                            document.title = this.child.childName;
                        }
                    }
                }
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchBookingfee:function(){
            Indicator.open('加载中...');
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.childId;
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
                    }
                }
                Indicator.close();
            },(res)=>{
                Indicator.close();
                MessageBox('温馨提示','服务器错误');
            });
        },
        searchCaseHistory:function(){
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.childId;
            this.$http.get(window.envs.api_url + '/searchcasehistory' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.caseHistory = res.data.results.list;
                }
            },(res)=>{
                MessageBox('温馨提示','服务器错误');
            });
        },
        searchUserCheckProject:function(){
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&child_id=' + this.childId + '&today=1&ischeck=1';
            this.$http.get(window.envs.api_url + '/usercheckprojects' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Indicator.close();
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.checkProjects = res.data.results.list;
                }
            },(res)=>{
                Indicator.close();
                MessageBox('温馨提示','服务器错误');
            });
        },
        checkList: function(){
            this.$router.push({path: '/order/checkList',query:{childId:this.child.childId}});
        },
        searchchildgrowth:function(){
                var urlOptions = '?username=' + this.username + '&token=' + this.token + '&child_id=' + this.childId;
                this.$http.get(window.envs.api_url + '/childgrowth' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        this.chartSettings = {
                            labelMap: {
                                'height': '身高（cm）'
                            },
                        }
                        if(res.data.results.growth.heights){
                            this.heightdata = res.data.results.growth.heights;
                        }
                        if(res.data.results.growth.weights){
                            this.weightdata = res.data.results.growth.weights;
                        }
                        if(this.heightdata=='' && this.weightdata==''){
                            this.nodata = true;
                        }
                        this.chartData = {
                            columns: ['age','height'],
                            rows: res.data.results.growth.heights ? res.data.results.growth.heights : [{height:'0',age:''}]
                        }
                        this.chartSettingsWeight = {
                            labelMap: {
                                'weight': '体重（kg）'
                            },
                        }
                        this.chartDataWeight = {
                            columns: ['age','weight'],
                            rows: res.data.results.growth.weights ? res.data.results.growth.weights : [{weight:'0',age:''}]
                        }
                    }
                },(res)=>{
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
        },
        goAddGrowth: function(){
            this.$router.push({path: '/user/addGrowth', query: {id: this.childId}});
        },
        goGrowthData: function(){
            this.$router.push({path: '/user/growthdatas', query: {id: this.childId}});
        },
        goChild:function(){
            sessionStorage.setItem('child',JSON.stringify(this.child));
            this.$router.push('/user/updateChild');
        },
    },
       
}
</script>

<style lang="scss" scoped>
    .color-main{
        color: #0D78D3;
    }
    .growth-btn{
        margin:20px 0;
        button{
            color: #fff;
            background-color:#0D78D3;
            border: none;
            padding:5px 10px;
            border-radius: 4px;
        }
        .last-button{
            background-color: #0D78D3;
            &.disabled{
                background-color: #cacaca;
            }
        }
    }
    .top-tab{
    	background: url('../../assets/bg2.jpg') repeat-y;
    	background-size: 100%;
        color:#fff;
        .child-img{
            width:70px;
            height: 70px;
            border-radius: 50%
        }
        .editor{
            padding:5px;
            background-color: #0D78D3;
            color: #fff;
            border: none;
            border-radius: 3px;
            img{
                vertical-align: middle;
                display: inline-block;
                margin-left: 5px;  
                margin-top: -5px;
            }
        }
        .tab{
            background-color: rgba(0,0,0,0.2);
            padding:20px 0 25px;
        }
    	.order-info{
    		padding:10px;
    		.item{
                border-right:1px solid #fff;
                color: #fff;
    			&.no-border{
    				border-right:none;
    			}
    		}
    	}
    }
    .order-info{
        margin: 0 0 10px;
        .flex-1{
            margin: 0 5px;
            background-color:#0D78D3;
            padding: 5px;
            border-radius: 4px;
            .item{
                color:#fff;
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
