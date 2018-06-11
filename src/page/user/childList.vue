<template>
  <div class="layout-base">
    <mt-header title="宝宝列表">
        <router-link to="user" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        <!-- <router-link to="/user/createChild" slot="right">
            <mt-button>新增宝宝</mt-button>
        </router-link> -->
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page">
                <div class="childList">
                    <div v-for="child in childList" class="info" @click="goChild(child)" :key="child.childId">
                        {{child.childName}} 的信息
                    </div>
                    <div v-if="nodata" class="ml10 mt10">
                        暂无宝宝
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    export default {
        name:'childList',
        data(){
            return {
                childList:[],
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                nodata: false,
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.searchchild();
            })
        },
        methods:{
            searchchild:function(){
                Indicator.open('加载中...');
                var urlOptions = '?username=' + this.username + '&token=' + this.token;
                this.$http.get(window.envs.api_url + '/childprofilelist' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        MessageBox('温馨提示', res.data.errorMsg);
                    }else{
                        this.childList = this.childList.concat(res.data.results.childs);
                        if(this.childList.length == 0){
                            this.nodata = true;
                        }
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    MessageBox('温馨提示', '服务器错误');
                });
            },
            goChild: function(child){
                sessionStorage.setItem('child',JSON.stringify(child));
                this.$router.push('/user/childInfo');
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
