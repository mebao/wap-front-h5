<template>
  <div class="layout-base">
      <mt-header title="修改信息">
          <mt-button icon="back" slot="left" @click="goBack()"></mt-button>
          <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page page-update-child">
                <div class="child-info">
                    <div class="gender-tab mb10 pb10">
                        <p class="tip">*</p>
                        <div class="flex">
                            <div class="tab-left flex-1 text-center">
                                <div class="img-part" :class="{'active': child.gender=='男' || child.gender=='M'}" @click="selectGender('M')">
                                    <div class="icon_boy"></div>
                                </div>
                                <p>男孩</p>
                            </div>
                            <div class="tab-right flex-1 text-center">
                                <div class="img-part" :class="{'active': child.gender=='女' || child.gender=='F'}" @click="selectGender('F')">
                                    <div class="icon_girl"></div>
                                </div>
                                <p>女孩</p>
                            </div>
                        </div>
                    </div>
                    <div class="cell-group">
                        <div class="cell">
                            <p class="left-box">宝宝姓名：</p>
                            <p class="middle-box"><input type="text" v-model="child.childName"/></p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝小名：</p>
                            <p class="middle-box"><input type="text" v-model="child.nickName"/></p>
                        </div>
                        <div class="cell">
                            <p class="left-box">生日：</p>
                            <p class="middle-box"><input type="date" v-model="child.birthday"></p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝星座：</p>
                            <p class="middle-box">
                                <select v-model="child.horoscope">
                                    <option disabled selected>请选择星座</option>
                                    <option v-for="option in optionsHoroscope" :key='option.key' :value="option.key">{{option.value}}</option>
                                </select>
                            </p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝生肖：</p>
                            <p class="middle-box">
                                <select v-model="child.shengxiao">
                                    <option disabled selected>请选择生肖</option>
                                    <option v-for="option in optionsShengxiao" :key='option.key' :value="option.key">{{option.value}}</option>
                                </select>
                            </p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝血型：</p>
                            <p class="middle-box">
                                <select v-model="child.bloodType">
                                    <option disabled selected>请选择血型</option>
                                    <option v-for="option in optionsBloodtype" :key='option.key' :value="option.key">{{option.value}}</option>
                                </select>
                            </p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝身高：</p>
                            <p class="middle-box"><input type="number" v-model="child.height"/></p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝体重：</p>
                            <p class="middle-box"><input type="number" v-model="child.weight"/></p>
                        </div>
                        <!-- <div class="cell">
                            <p class="left-box">宝宝腿长：</p>
                            <p class="middle-box"><input type="number" v-model="child.legLength"/></p>
                        </div>
                        <div class="cell">
                            <p class="left-box">宝宝头围：</p>
                            <p class="middle-box"><input type="number" v-model="child.headCircum"/></p>
                        </div> -->
                        <div class="child-info flex mt10 mb10">
                            <div class="flex-1">
                                <span class="tip"></span>
                                上传头像
                            </div>
                            <div class="info-img">
                                <a class="upload-tab">
                                    <img id="imgEle" v-if="child.imageUrl" :src="child.imageUrl">
                                    <img id="imgEle" v-if="!child.imageUrl" src="../../assets/icon_child.png">
                                    <input type="hidden" id="file" name="file">
                                    <input class="upload" type="file" @change="readyUpload($event)">
                                </a>
                            </div>
                            <div class="flex-1"></div>
                        </div>
                    </div>
                </div>
                <div class="mt10 mb10 pr10 pl10">
                    <mt-button type="primary" size="large" id="create" @click="update" :disabled="child.childName == '' || child.gender =='' || child.birthday == ''">修改宝宝信息</mt-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Indicator } from 'mint-ui';
    import MoUpload from '@/components/upload'
    export default {
        name:'updateChild',
        components : {
            MoUpload,
        },
        data(){
            return {
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                child: JSON.parse(sessionStorage.getItem('child')),
                optionsHoroscope: '',
                optionsShengxiao: '',
                optionsBloodtype: '',
                upToken:'',
                
            }
        },
        mounted:function(){
            this.$nextTick(function () {
               this.getToken();
               this.optionsHoroscope = [
                    {key: 'aries', value: '白羊座'},
                    {key: 'taurus', value: '金牛座'},
                    {key: 'gemini', value: '双子座'},
                    {key: 'cancer', value: '巨蟹座'},
                    {key: 'leo', value: '狮子座'},
                    {key: 'virgo', value: '处女座'},
                    {key: 'libra', value: '天秤座'},
                    {key: 'scorpio', value: '天蝎座'},
                    {key: 'sagittarius', value: '射手座'},
                    {key: 'capricorn', value: '摩羯座'},
                    {key: 'aquarius', value: '水瓶座'},
                    {key: 'pisces', value: '双鱼座'},
                ];
                this.optionsShengxiao = [
                    {key: 'rat', value: '鼠'},
                    {key: 'ox', value: '牛'},
                    {key: 'tiger', value: '虎'},
                    {key: 'hare', value: '兔'},
                    {key: 'dragon', value: '龙'},
                    {key: 'snake', value: '蛇'},
                    {key: 'horse', value: '马'},
                    {key: 'sheep', value: '羊'},
                    {key: 'monkey', value: '猴'},
                    {key: 'cock', value: '鸡'},
                    {key: 'dog', value: '狗'},
                    {key: 'boar', value: '猪'},
                ];
                this.optionsBloodtype = [
                    {key: 'A', value: 'A型'},
                    {key: 'B', value: 'B型'},
                    {key: 'O', value: 'O型'},
                    {key: 'AB', value: 'AB型'},
                ];
                for(var i=0;i<this.optionsHoroscope.length;i++){
                    if(this.child.horoscope == this.optionsHoroscope[i].value){
                        this.child.horoscope = this.optionsHoroscope[i].key;
                    }
                }
                for(var i=0;i<this.optionsShengxiao.length;i++){
                    if(this.child.shengxiao == this.optionsShengxiao[i].value){
                        this.child.shengxiao = this.optionsShengxiao[i].key;
                    }
                }
                for(var i=0;i<this.optionsBloodtype.length;i++){
                    if(this.child.bloodType == this.optionsBloodtype[i].value){
                        this.child.bloodType = this.optionsBloodtype[i].key;
                    }
                }
            })
        },
        methods:{
            selectGender: function(gender){
                this.child.gender = gender;
            },
            goChild:function(child){
                sessionStorage.setItem('child',JSON.stringify(child));
                this.$router.push('orderlist');
            },
            goBack:function(){
                this.$router.go(-1);
            },
            getToken:function(){
                Indicator.open('加载中...');
                this.$http.get(window.envs.api_url + '/childtoken').then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        this.upToken = res.data.uptoken;
                        //this.readyUpload(res.data.uptoken,_file);
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            },
            readyUpload: function(_file){      
                var fff = [];
                var fileJson = _file.target['files'];
                for(var index in fileJson){
                    if(fileJson[index]['name'] && fileJson[index]['size']){
                        var file = fileJson[index];
                        var formData = new FormData();
                        formData.append('file', file);
                        formData.append('name', file.name);
                        formData.append('type', file.type);
                        formData.append('lastModifiedDate', file.lastModifiedDate);
                        formData.append('size', file.size);
                        formData.append('token', this.upToken);// the qiniu upload accessKey.
                        formData.append('key', (new Date()).getTime() + Math.floor(Math.random() * 100)+'.'+file.name.substr(file.name.lastIndexOf('.')+1));

                        var reader = new FileReader();
                        var imgEle = document.getElementById('imgEle');
                        reader.readAsDataURL(file);
                        reader.onload = function(f) {
                            imgEle.setAttribute('src', reader.result);
                        }

                        var xhr = new XMLHttpRequest();
                        xhr.open('post', 'http://upload.qiniu.com/', false);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    var fileEle = document.getElementById('file');
                                    fileEle.setAttribute('value', JSON.parse(xhr.responseText).key);
                                } else {

                                }
                            }
                        };
                        xhr.send(formData);
                    }
                }
            },
            update: function(){
                Indicator.open('加载中...');
                var _this = this;
                var requestObj={
                    username: _this.username,
                    token: _this.token,
                    name: _this.child.childName,
                    nickname: _this.child.nickName,
                    gender: _this.child.gender,
                    birth_date: _this.child.birthday,
                    blood_type: _this.child.bloodType,
                    horoscope: _this.child.horoscope,
                    shengxiao: _this.child.shengxiao,
                    is_default: '1',
                    // remote_domain: '',
                    // remote_file_key: '',
                    clinic_id: localStorage.getItem('wap_clinic'),
                    child_id: _this.child.childId
                }
                 //判断头像(不必传)
                if(document.getElementById('file').value == ''){
                    //判断是否存在头像，并且没有修改
                    if(this.child.imageUrl && this.child.imageUrl != ''){
                    }else{
                        requestObj['remote_domain'] = '';
                        requestObj['remote_file_key'] = '';
                    }
                }else{
                    requestObj['remote_domain'] = 'http://bcircle.meb.meb168.com';
                    requestObj['remote_file_key'] = document.getElementById('file').getAttribute('value');
                }
                _this.$http.post(window.envs.api_url + '/createchild' , requestObj).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                        sessionStorage.setItem('child',JSON.stringify(_this.child));
                        MessageBox.alert('修改成功!').then(action => {
                            _this.$router.push('/user/childInfo');
                        });
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .child-info{
		.img-tab{
			background-color: #fff;
			padding: 10px;
			img{
				width: 100px;
				height: 100px;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
    .info-img{
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
        width: 90px;
        height: 90px;
        overflow: hidden;
    }
    .preimg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #c0c0c0;
        border-radius: 50%;
    }
    .upload-img{
        background-color: inherit !important;
        padding: 0;
    }
    .tip{
        width: .83333rem;
        text-align: center;
        color: red;
        display: inline-block;
        height: .83333rem;
    }
    .middle-box{
        flex:1;
    }
    .gender-tab{
		background-color: #fff;
		padding: px2rem(10px) px2rem(20px);
		margin-bottom: px2rem(10px);
		.flex-1{
			text-align: center;
			.img-part{
				border: 1px solid #efefef;
				display: inline-block;
				border-radius: 50%;
				padding: 20px;
				.icon_boy{
					background: url('../../assets/icon_boy.png') no-repeat;
					background-size: 35px 35px;
					width: 35px;
					height: 35px;
				}
				.icon_girl{
					background: url('../../assets/icon_girl.png') no-repeat;
					background-size: 35px 35px;
					width: 35px;
					height: 35px;
				}
				&.active{
					border: 1px solid #F4D020;
				}
			}
		}
	}
    .upload-tab{
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
        width: 90px;
        height: 90px;
        overflow: hidden;
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #c0c0c0;
            border-radius: 50%;
        }
        .upload{
            cursor: pointer;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
