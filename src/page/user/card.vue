<template>
    <div class="layout-base">
        <mt-header title="我的卡包">
            <router-link to="/user" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <mt-cell v-for="card in cardList" :key="card.cardId" :title="card.activityName+'（剩余次数：'+card.num+'次）'"></mt-cell>
                  <div class="mt10 ml10 mb10" v-if="cardList.length==0">暂无活动卡</div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
    name:'childInfo',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            cardList:JSON.parse(sessionStorage.getItem('cards')),
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            
        })
    },
    methods:{
 
    },
       
}
</script>

<style lang="scss" scoped>

</style>
