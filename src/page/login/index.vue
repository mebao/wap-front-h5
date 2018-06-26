<template>
    <div class="layout-base login">
        <mt-header title="登录">
        </mt-header>
        <div class="layout-content ">
            <div class="content-view">
                <div class="content-page">
                    <div class="">
                        <div class="login_logo"><img src="../../assets/login_logo.png" /></div>
                        <div class="cell-group">
                            <div class="cell flex user_input">
                                <div class="left-box icon-type">
                                    <img src="../../assets/user_icon.png" />
                                </div>
                                <div class="flex-1">
                                    <input v-model="mobile" type="tel"  maxlength="11" minlength="11" placeholder="手机号码"/>
                                </div>
                            </div>
                            <div class="cell flex verify_input">
                                <div class="left-box icon-type">
                                    <img src="../../assets/verify_icon.png" />
                                </div>
                                <div class="flex-1">
                                    <input v-model="verify_code" type="tel"  maxlength="6" minlength="6" placeholder="验证码"/>
                                </div>
                                <div class="right-box">
                                    <mt-button class="ml10"  @click="smsverifycode()" type="primary" :disabled="lockEnabled || mobile.length != '11'">{{sendSMSText[0]}}</mt-button>
                                </div>
                            </div>
                        </div>
                        <div class="w100 login-btn">
                            <mt-button class="mt10" size="large" type="primary" @click="login()" :disabled="verify_code.length != '6' || mobile.length != '11'">登录</mt-button>
                        </div>
                    </div>
                    <!-- <mt-field v-model="mobile" type="tel" :attr="{for:'new_pass', maxlength: 11,minlength: 11 }" label="用户名" maxlength="11" minlength="11" placeholder="请输入手机号码"></mt-field> -->
                    <!-- <mt-field v-model="vali_code" type="tel" :attr="{ maxlength: 4,minlength: 4 }" label="图形验证码" placeholder="请输入图形验证码">
                        <img :src="imgCode" class="img-code" @click="changeImgCode()">
                    </mt-field> -->
                    <!-- <mt-field v-model="verify_code" type="tel" :attr="{ maxlength: 6,minlength: 6 }" label="验证码" placeholder="请输入验证码">
                        <mt-button class="ml10"  @click="smsverifycode()" type="primary" :disabled="lockEnabled || mobile.length != '11'">{{sendSMSText[0]}}</mt-button>
                    </mt-field>
                    <div class="w100 pr10 pl10">
                        <mt-button class="mt10" size="large" type="primary" @click="login()" :disabled="verify_code.length != '6' || mobile.length != '11'">登录</mt-button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {baseLoginUrl,baseUrl} from '@/config/env'
import { MessageBox,Indicator,Toast } from 'mint-ui';

export default {
    name:'login',
    data(){
        return {
            mobile:'',
            vali_code:'',//图形验证码
            verify_code:'',//短信验证码
            //imgCode: baseLoginUrl + '/getcode?id=1',
            sendSMSText:['发送验证码'],
            num:1,
            lockEnabled:'',
            count:60,
        }
    },
    methods:{
        smsverifycode:function(){
            this.count = 60;
            Indicator.open('加载中...');
            this.lockEnabled = true;
            var param={
    			mobile: this.mobile,
    			action_type: 102,
    			vali_code: this.vali_code,
            };
    		this.$http.post(baseLoginUrl + '/smsverifycode', param).then(function(res){
                if(res.data.status == 'no'){
                    this.lockEnabled = false;
                    Toast({
                        message: res.data.errorMsg,
                        position: 'middle',
                        duration: 3000
                    });
                }else{
                    Toast({
                        message: '验证码已发送',
                        position: 'middle',
                        duration: 3000
                    });
                    var verifyCodeInterval = window.setInterval(()=>{
                        this.count--;
                        this.$set(this.sendSMSText,0,this.count + '秒后重发');
                        if(this.count==0){
                            this.lockEnabled = false;
                            this.$set(this.sendSMSText,0,'重新发送');
                        }
                        if(this.count==0){
                            window.clearInterval(verifyCodeInterval);
                        }
                    },1000);
                }
                Indicator.close();
    		},function(res){
                Indicator.close();
                this.lockEnabled = false;
                Toast({
                    message: res.data.errorMsg,
                    position: 'middle',
                    duration: 3000
                });
    		});
        },
        login:function(){
            Indicator.open('加载中...');
            var param = {
                mobile:this.mobile,
                verify_code : this.verify_code
            }
            this.$http.post(baseLoginUrl + '/topuserlogin',param).then((res)=>{
                if(res.data.status == 'no'){
                    Indicator.close();
                    Toast({
                        message: res.data.errorMsg,
                        position: 'middle',
                        duration: 3000
                    });
                }else{
                    localStorage.setItem('wap_clinic', res.data.results.user.clinicId);
                    this.resetEnvs();
                    var urlOptions =　res.data.results.user.userId;
                    this.mobile = res.data.results.user.mobile;
                    this.$http.get(window.envs.api_url + '/topuser/'+urlOptions).then((res)=>{
                        if(res.data.status == 'no'){
                            Indicator.close();
                            Toast({
                                message: res.data.errorMsg,
                                position: 'middle',
                                duration: 3000
                            });
                        }else{
                            localStorage.setItem('username',this.mobile);
                            localStorage.setItem('token',res.data.results.userinfo.token);
                            if(sessionStorage.getItem('toUrl')==null){
                                this.$router.push('/user');
                            }else{
                                this.$router.push(sessionStorage.getItem('toUrl'));
                            }
                        }
                        Indicator.close();               
                    },(res)=>{
                        Indicator.close();
                        Toast({
                            message: '服务器错误',
                            position: 'middle',
                            duration: 3000
                        });
                    });
                }
            },(res)=>{
                Indicator.close();
                Toast({
                    message: '服务器错误',
                    position: 'middle',
                    duration: 3000
                });
            });
        },
        // 获取图形验证码
    	changeImgCode:function(){
    		this.num++;
    		this.imgCode = baseLoginUrl + '/getcode?id=' + this.num;
        },
        resetEnvs: function() {
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
                    api_url: 'http://172.16.252.101/mebnew/mebapi',
                }
            };
            if(process.env.NODE_ENV === 'development'){
                window.envs = allEnvs.localhost;
            }else if(process.env.NODE_ENV === 'production'){
                switch (localStorage.getItem('wap_clinic')) {
                    case '1':
                    {
                        window.envs = allEnvs.product_zunyi;
                        break;
                    }
                    case '4':
                    {
                        window.envs = allEnvs.product_zunyi;
                        break;
                    }
                    case '2':
                    {
                        window.envs = allEnvs.product_kunming;
                        break;
                    }
                    case '99':
                    {
                        window.envs = allEnvs.product_kunming;
                        break;
                    }
                    case '10':
                    {
                        window.envs = allEnvs.product_test;
                        break;
                    }
                    default:
                        window.envs = allEnvs.product_zunyi;
                        break;
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .content-page{
        top:0!important;
    }
    .login{
        text-align: center;
        background: url('http://static.meb168.com/1528860816747.png?imageslim');
        background-repeat: no-repeat;
        background-position: center;
        background-size:cover;
        height:100vh;
        margin:0;
        padding:0;
    }
    .login_logo{
        img{
            width:8rem;
            margin:70px 0 30px;
        }
    }
    .cell-group{
        padding:0 20px;
        .cell{
            border-radius: 20px;
            margin-bottom:20px;
            height:2.5rem;
            line-height: 2.5rem;
        }
    }
    .user_input{
        padding-right:10px;
    }
    .user_input,.verify_input{
        .icon-type{
            img{
                width:20px;
                margin-right:10px;
                margin-bottom:-3px
            }
        }
        .right-box{
            button{
                height:34px;
                margin-right:10px;
                border-radius: 20px;
                font-size:16px;
                line-height:34px;
            }
        }
    }
    .login-btn{
        padding:0 20px;
        button{
            border-radius: 20px;
        }
    }
</style>
