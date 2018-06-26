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
              <div class="content-page check-list">
                  <div v-for="check in checkList" class="item" :key="check.id">
                        <div class="title">{{check.checkName}}</div>
                        <div>开单医生：{{check.doctorName}}</div>
                        <div class="info-tab">
                            <div class="tab flex">
                                <div class="tab-item w40">项目</div>
                                <div class="tab-item w40">结果</div>
                                <div class="tab-item w20">性质</div>
                            </div>
                            <div v-for="result in check.resultList" class="tab flex" :key="result.id">
                                <!-- 非图片 -->
                                <div v-if="result.isUpload == '0'" class="tab-item w40">
                                    <div>{{result.checkInfoName}}</div>
                                    <div>参考范围：{{result.references}}</div>
                                </div>
                                <div v-if="result.isUpload == '0'" class="tab-item w40">
                                    <div>{{result.values}}</div>
                                    <div>{{result.references == '阴性' ? '' : (result.unit ? '单位：' + result.unit : '')}}</div>
                                </div>
                                <div v-if="result.isUpload == '0'" class="tab-item w20">
                                    <div v-if="result.compare" class="text-center h100">
                                        <!-- <img :src="result.compare == 'low' ? '../../assets/icon-arrow-down.png' : '../../assets/icon-arrow-down.png'" class="icon"> -->
                                        <img v-if="result.compare == 'low'" src="../../assets/icon-arrow-down.png" class="icon">
                                        <img v-if="result.compare != 'low'" src="../../assets/icon-arrow-up.png" class="icon">
                                    </div>
                                </div>
                                <!-- 图片 -->
                                <div v-if="result.isUpload == '1'" class="tab-item">
                                    <img :src="result.values" class="w100" @click="clickImg($event)">
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
      <!-- 放大图片 -->
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';
import BigImg from '@/components/BigImg';

export default {
    name:'checkInfo',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            checkId:JSON.parse(sessionStorage.getItem('checkId')),
            checkList:'',
            imgSrc: '',
            showImg: false,
        }
    },
    components: {
        'big-img':BigImg
    },
    mounted:function(){
        this.$nextTick(function () {
            this.searchUserCheckProjectInfo();
        })
    },
    methods:{
        searchUserCheckProjectInfo:function(){
            Indicator.open('加载中...');
            var username = this.username;
            var token = this.token;
            var id = this.$route.query.type == 'checkList' ? '&id=' + sessionStorage.getItem('checkId') : '';
		    var booking_id = this.$route.query.type== 'orderDetail' ? '&booking_id=' + sessionStorage.getItem('checkBookingId') : '';
            var urlOptions = '?username=' + username + '&token=' + token + id + booking_id  + '&today=1&ischeck=1';
            this.$http.get(window.envs.api_url + '/usercheckprojectinfo' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    this.checkList = res.data.results.list;
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
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
    }
}
</script>

<style lang="scss" scoped>
	.check-list{
        img{
            height: 6.667rem;
        }
		.item{
			margin: 10px;
			background-color: #fff;
			padding: 10px;
			border-radius: 4px;
			.title{
				font-size: 16px;
			}
			.info-tab{
				margin-top: 10px;
				border: 1px solid #E0E0E0;
				.tab{
					border-bottom: 1px solid #E0E0E0;
					&:last-child{
						border-bottom: none;
					}
					.tab-item{
						padding: 5px;
						border-right: 1px solid #E0E0E0;
						&:last-child{
							border-right: none;
						}
						.icon{
							position: relative;
							top: 50%;
							left: 50%;
							margin-top: -10px;
							margin-left: -10px;
							width: 20px;
							height: 20px;
							display: block;
						}
					}
				}
			}
		}
	}
</style>
