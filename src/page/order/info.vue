<template>
    <div class="layout-base">
        <mt-header title="预约">
            <div slot="left">
              <mt-button icon="back" @click="goBack()"></mt-button>
            </div>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div class="cell-group">
                    <div class="cell">
                        <div class="left-box">
                            宝宝姓名:
                        </div>
                        <div class="middle-box">{{info.childName}}</div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            手机号码:
                        </div>
                        <div class="middle-box">{{info.mobile}}</div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            预约服务:
                        </div>
                        <div class="middle-box">{{info.serviceName}}</div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            预约医生:
                        </div>
                        <div class="middle-box">{{info.doctorName}}</div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            预约日期:
                        </div>
                        <div class="middle-box">{{info.bookingDate}}</div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            状态:
                        </div>
                        <div class="middle-box">{{info.statusText}}</div>
                    </div>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default{
    name:'orderInfo',
    data(){
        return {
            bookingId: this.$route.query.id,
            info: '',
            envs: '',
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.resetEnvs();
            this.searchBookingInfo();
        })
    },
    methods:{
        searchBookingInfo:function(){
            Indicator.open('加载中...');
            var urlOptions = '/'+ this.bookingId;
            this.$http.get(this.envs.api_url + '/bookinginfo' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.info = res.data.results.bookinginfo;
                }
                Indicator.close();
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        goBack:function(){
            this.$router.go(-1);
        },
        resetEnvs: function(){
            var allEnvs = {
                product: {
                    env:'product',
                    api_url: 'http://wapapi.meb168.com/mebapi',
                },
                product_zunyi: {
                    env:'product_zunyi',
                    api_url: 'http://wapapi.meb168.com/mebapi',
                },
                product_kunming: {
                    env:'product_kunming',
                    api_url: 'http://km01.yunapi.meb168.com/mebapi',
                },
                product_test: {
                    env:'product_test',
                    api_url: 'http://mebtestapi.meb168.com/mebapi',
                },
                localhost: {
                    env:'localhost',
                    api_url: 'http://localhost/mebnew/mebapi',
                }
            };
           if(process.env.NODE_ENV === 'development'){
                this.envs = allEnvs.localhost;
            }else if(process.env.NODE_ENV === 'production'){
                switch (this.$route.query.clinic_id) {
                    case '1':
                    {
                        this.envs = allEnvs.product_zunyi;
                        break;
                    }
                    case '4':
                    {
                        this.envs = allEnvs.product_zunyi;
                        break;
                    }
                    case '2':
                    {
                        this.envs = allEnvs.product_kunming;
                        break;
                    }
                    case '99':
                    {
                        this.envs = allEnvs.product_kunming;
                        break;
                    }
                    case '10':
                    {
                        this.envs = allEnvs.product_test;
                        break;
                    }
                    default:
                        this.envs = allEnvs.product_zunyi;
                        break;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cell-group{
    padding-left: 10px;
    background: #fff;
    .cell{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #d6d6d6;
        &:last-child{
            border-bottom: none;  
        }
        display: flex;
        .middle-box{
            flex: 1;
            margin-left: 10px;
            overflow: hidden;
        }
    }
}
</style>
