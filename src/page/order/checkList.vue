<template>
    <div class="layout-base">
        <mt-header title="报告列表">
            <router-link to="/user/childInfo" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div class="check-tab" v-for="check in checkList" :key="check.id">
                      <div class="tab">
                            <div @click="checkInfo(check.id)">
                                <p>
                                    <span>检查项目：</span>
                                    <span>{{check.checkName}}</span>
                                </p>
                                <p class="pt10">
                                    <span>报告时间：</span>
                                    <span>{{check.time}}</span>
                                </p>
                            </div>
                        </div>
                      <div class="sawtooth"></div>
                  </div>
                  <div v-if="nodata" class="ml10 mt10">
                     暂无检查报告
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
    name:'checkList',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            child:this.$route.query.childId,
            checkList:'',
            nodata: false
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.searchUserCheckProject();
        })
    },
    methods:{
        searchUserCheckProject: function(){
            Indicator.open('加载中...');
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&child_id=' + this.child + '&today=1&ischeck=1';
            this.$http.get(window.envs.api_url + '/usercheckprojects' + urlOptions).then((res)=>{
                Indicator.close();
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.checkList = res.data.results.list;
                    if(this.checkList.length==0){
                        this.nodata = true;
                    }
                }
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        checkInfo: function(checkId){
            sessionStorage.setItem('checkId', checkId);
            this.$router.push({path: '/order/checkInfo', query: {type: 'checkList'}});
        },
    }
}
</script>

<style lang="scss" scoped>
    .check-tab{
        background:#fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        margin: 10px 10px 0px;
        .tab{
            padding:10px;
        }
        .sawtooth{
            height: 5px;
            background: url('../../assets/sawtooth.jpg') no-repeat;
            background-size: 100% 100%;
        }
    }
</style>
