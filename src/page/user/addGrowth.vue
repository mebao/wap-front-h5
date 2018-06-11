<template>
  <div class="layout-base">
    <mt-header title="添加数据">
        <router-link to="/user/childInfo" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page">
                <div class="cell-group">
                    <div class="cell">
                        <div class="left-box">
                            身高
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="height" placeholder="请输入身高">
                        </div>
                        <div class="right-box">
                            CM
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            体重
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="weight" placeholder="请输入体重">
                        </div>
                        <div class="right-box">
                            斤
                        </div>
                    </div>
                    <!-- <div class="cell">
                        <div class="left-box">
                            腿长
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="leg_length" placeholder="请输入腿长">
                        </div>
                        <div class="right-box">
                            CM
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            三围
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="head_circum" placeholder="头围">
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="breast_circum" placeholder="胸围">
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="waist_circum" placeholder="腹围">
                        </div>
                    </div> -->
                    <div class="cell">
                        <div class="left-box">
                            测量时间
                        </div>
                        <div class="middle-box input-date">
                            <input type="date" v-model="date">
                        </div>
                    </div>
                </div>
                <div class="w100 pr10 pl10 mt10 mb10">
                    <mt-button @click="addGrowth()" type="primary" size="large">保存</mt-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    import common from '@/components/common';
    export default {
        name: 'addGrowth',
        data(){
            return {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                height:'',
                weight:'',
                date: common.formatDate(new Date(),'yyyy-MM-dd'),
            }
        },
        methods:{
            addGrowth:function(){
                var params={
                    username: this.username,
                    token: this.token,
                    child_id: this.$route.query.id,
                    list: {
                        'height': this.height,
                        'weight': this.weight,
                        // 'leg_length': this.leg_length,
                        // 'head_circum': this.head_circum,
                        // 'breast_circum': this.breast_circum,
                        // 'waist_circum': this.waist_circum
                    },
                    time: this.date
		        }
                this.$http.post(window.envs.api_url + '/createchildgrowth', params).then((res)=>{
                    if(res.data.status == 'no'){
                        MessageBox('温馨提示', res.data.errorMsg);
                    }else{
                        this.$router.push('/user/childInfo');
                    }
                },(res)=>{
                    MessageBox('温馨提示', '服务器错误');
                });
            },
            goRouter:function(tab){
                if(tab == 'tab1'){
                    this.$router.push('/booking/booking');
                }else{
                    this.$router.push('/user');
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
     .input-date{
         flex:1;
     }
</style>
