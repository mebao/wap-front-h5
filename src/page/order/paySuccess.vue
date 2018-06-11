<template>
    <div class="layout-base">
        <mt-header title="支付成功">
      </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <div v-if="tab == 'success'" class="success-tab">
                        <img src="../../assets/pay_success.png">
                        <p class="info">支付成功</p>
                        <p class="tel">客服电话：{{mobile}}</p>
                        <div class="flex pt20">
                            <div class="flex-1"></div>
                            <mt-button @click="showInfo()" class="btn btn-primary btn-small w60" type="primary">查看详情</mt-button>
                            <div class="flex-1"></div>
                        </div>
                    </div>
                    <div v-if="tab == 'error'" class="error-tab">
                        <img src="../../assets/pay_error.png">
                        <p class="info">支付成功，订单数据异常，请联系客服</p>
                        <p class="tel">客服电话：{{mobile}}</p>
                        <div class="btn-dock">
                            <a :href="'tel://' + mobile" class="btn btn-primary">联系客服</a>
                        </div>
                    </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'paySuccess',
    data(){
        return {
            mobile: this.$route.query.clinic_id == 2 || this.$route.query.clinic_id == 99 ? '0871-68860030' : '0851-27556691' ,
            tab: 'success',
        }
    },
    methods:{
        showInfo: function(){
            this.$router.push({path: '/order/info', query: {id: this.$route.query.id,clinic_id: this.$route.query.clinic_id}});
        }
    }
}
</script>

<style lang="scss" scoped>
.success-tab{
    margin-top: 4rem;
    text-align: center;
    .info{
        font-size:24px;
        margin-top:20px;
    }
    p{
        font-weight: bold;
    }
    .tel{
        margin-top: 20px;
        font-size: 18px;
    }
    img{
        width: 7.5rem;
    }
}
</style>
