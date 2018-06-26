<template>
  <div class="layout-base">
    <mt-header title="修改数据">
        <mt-button icon="back" slot="left" @click="goBack()"></mt-button>
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
                            身高：
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="growth.height" placeholder="请输入身高">
                        </div>
                        <div class="right-box">
                            cm
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            体重：
                        </div>
                        <div class="middle-box">
                            <input type="number" v-model="growth.weight" placeholder="请输入体重">
                        </div>
                        <div class="right-box">
                            kg
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            测量时间：
                        </div>
                        <div class="middle-box">{{growth.time.substring(0,10)}}</div>
                    </div>
                </div>
                <div class="pr10 pl10 mt10 mb10">
                    <mt-button type="primary" size="large" @click="updateGrowth()">保存</mt-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    export default {
        name: 'updateGrowth',
        data(){
            return {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                growth: JSON.parse(sessionStorage.getItem('growth')),
                growthStorage: JSON.parse(sessionStorage.getItem('growth')),
            }
        },
        methods:{
            updateGrowth:function(){
                var params={
                    username: this.username,
                    token: this.token,
                    child_id: this.$route.query.id,
                    time: this.growth.time
                }
                if(this.growth.height!=this.growthStorage.height && this.growth.hid!=0){
                    params.hid=this.growth.hid;
                }
                if(this.growth.height!=this.growthStorage.height){
                    params.height=this.growth.height;
                }
                if(this.growth.weight!=this.growthStorage.weight && this.growth.wid!=0){
                    params.wid=this.growth.wid;
                }
                if(this.growth.weight!=this.growthStorage.weight){
                    params.weight=this.growth.weight;
                }
                if(params.weight == ''){
                    Toast({message: "请填写体重",position: 'middle',duration: 3000});
                    return;
                }
                if(params.height == ''){
                    Toast({message: "请填写身高",position: 'middle',duration: 3000});
                    return;
                }
                Indicator.open('加载中...');
                this.$http.post(window.envs.api_url + '/updategrowth' , params).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        window.history.go(-1);
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            },
            goBack: function(){
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
