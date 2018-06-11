<template>
  <div class="layout-base">
    <mt-header title="成长数据">
        <router-link to="/user/childInfo" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page">
                <div class="data-tab" v-if="data.length > 0">
                    <div class="data-item flex">
                        <div class="w35">日期</div>
                        <div class="w25">身高(CM)</div>
                        <div class="w25">体重(斤)</div>
                        <div class="w15 text-center">选择</div>
                    </div>
                    <div class="data-item flex" v-for="(growthdata, index) in data" :key="index">
                        <div class="w35">{{growthdata.time.substring(0,10)}}</div>
                        <div class="w25">{{growthdata.height}}</div>
                        <div class="w25">{{growthdata.weight}}</div>
                        <div class="w15 text-center">
                            <span class="btn-select" :class="{'active': selectedData==index}" @click="selected(index, growthdata)"></span>
                        </div>
                    </div>
                </div>
                <div v-if="data.length > 0" class="pl10 pr10 mt10 mb10">
                    <mt-button type="primary" size="large" :disabled="selectedData==-1" @click="update()">修改</mt-button>
                </div>
                <div v-if="nodata" class="ml10 mt10 mb10">
                    暂无成长数据
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    export default {
        name: 'growthdatas',
        data(){
            return {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                height:'',
                weight:'',
                date:'',
                selectedData: '-1',
                data:'',
                nodata: false,
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.growthdatas();
            })
        },
        methods:{
            growthdatas:function(){
                Indicator.open('加载中...');
                var urlOptions = '?username=' + this.username + '&token=' + this.token + '&child_id=' + this.$route.query.id;
                this.$http.get(window.envs.api_url + '/growthdatas' + urlOptions).then((res)=>{
                    if(res.data.status == 'no'){
                        MessageBox('温馨提示', res.data.errorMsg);
                    }else{
                        this.data = res.data.results.growth;
                        if(this.data.length==0){
                            this.nodata = true;
                        }
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    MessageBox('温馨提示', '服务器错误');
                });
            },
            selected: function(index, growthdata){
                this.selectedData = index;
                sessionStorage.setItem('growth', JSON.stringify(growthdata));
            },
            update: function(){
                this.$router.push({path: '/user/updateGrowth', query:{id: this.$route.query.id}});
            }
        },
    }
</script>

<style lang="scss" scoped>
    .data-tab{
        background: #fff;
        .data-item{
            padding: 0 10px;
            border-width: 0 0 1px 0;
            border-style: solid;
            border-color: #efefef;
            div{
                padding: 10px 0;
            }
            .btn-select{
                width: 10px;
                height: 10px;
                border: 1px solid #888;
                border-radius: 50%;
                display: inline-block;
                &.active{
                    background: #333;
                }
            }
        }
    }
</style>
