<template>
  <div class="layout-base">
      <mt-header title="添加宝宝">
          <router-link to="/user/childList" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
    </mt-header>
    <div class="layout-content">
        <div class="content-view">
            <div class="content-page page-create-child">
                <div class="gender-tab">
                    <p class="tip">*</p>
                    <div class="flex">
                        <div class="tab-left flex-1 text-center">
                            <div class="img-part" :class="{'active': gender=='M'}" @click="selectGender('M')">
                                <div class="icon_boy"></div>
                            </div>
                            <p>男孩</p>
                        </div>
                        <div class="tab-right flex-1 text-center">
                            <div class="img-part" :class="{'active': gender=='F'}" @click="selectGender('F')">
                                <div class="icon_girl"></div>
                            </div>
                            <p>女孩</p>
                        </div>
                    </div>
                </div>
                <div class="cell-group">
                    <div class="cell">
                        <div class="left-box">
                            <span class="tip">*</span>
                            <span>姓名</span>
                        </div>
                        <div class="middle-box">
                            <input type="text" v-model="name" placeholder="请输入宝宝的姓名" required="">
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            <span class="tip"></span>
                            <span>小名</span>
                        </div>
                        <div class="middle-box">
                            <input type="text" v-model="nickname" placeholder="请输入宝宝的小名">
                        </div>
                    </div>
                    <div class="cell">
                        <div class="left-box">
                            <span class="tip">*</span>
                            <span>生日</span>
                        </div>
                        <div class="middle-box date">
                            <input type="date" v-model="birth_date">
                            <!-- <calendar-widget day-selected="dateText"></calendar-widget> -->
                        </div>
                    </div>
                </div>
                <div class="other-tab flex">
                    <div class="tab-item flex-1">
                        <p class="tip"></p>
                        <select v-model="horoscope">
                            <option disabled selected>请选择星座</option>
                            <option v-for="option in optionsHoroscope" :key='option.key' :value="option.key">{{option.value}}</option>
                        </select>
                        <!-- <optionswidget options-key="1" options-data="optionsHoroscope.data" options-back="optionsHoroscope.backData" options-text="optionsHoroscope.text" options-title="optionsHoroscope.title" options-callback="optionsHoroscope.callback"></optionswidget> -->
                    </div>
                    <div class="tab-item flex-1">
                        <p class="tip"></p>
                        <select v-model="shengxiao">
                            <option disabled selected>请选择生肖</option>
                            <option v-for="option in optionsShengxiao" :key='option.key' :value="option.key">{{option.value}}</option>
                        </select>
                        <!-- <optionswidget options-key="2" options-data="optionsShevxiao.data" options-back="optionsShevxiao.backData" options-text="optionsShevxiao.text" options-title="optionsShevxiao.title" options-callback="optionsShevxiao.callback"></optionswidget> -->
                    </div>
                    <div class="tab-item flex-1">
                        <p class="tip"></p>
                        <select v-model="blood_type">
                            <option disabled selected>请选择血型</option>
                            <option v-for="option in optionsBloodtype" :key='option.key' :value="option.key">{{option.value}}</option>
                        </select>
                        <!-- <optionswidget options-key="3" options-data="optionsBloodtype.data" options-back="optionsBloodtype.backData" options-text="optionsBloodtype.text" options-title="optionsBloodtype.title" options-callback="optionsBloodtype.callback"></optionswidget> -->
                    </div>
                </div>
                <div class="child-info flex mt10 mb10">
                    <div class="flex-1">
                        <span class="tip"></span>
                        上传头像
                    </div>
                    <div class="info-img">
                        <a class="upload-tab">
                            <img id="imgEle" src="../../assets/icon_child.png">
                            <input type="hidden" id="file" name="file">
                            <input class="upload" type="file" @change="readyUpload($event)">
                        </a>
                    </div>
                    <div class="flex-1"></div>
                </div>
                <div class="w100 pr10 pl10 mt10 mb10">
                    <mt-button id="create" size="large" type="primary" class="btn btn-primary"  @click="create" :disabled="name == '' || gender =='' || birth_date == '' || horoscope == '' || shengxiao == '' || blood_type == ''">确认添加</mt-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import { Indicator,Toast } from 'mint-ui';
    import common from '@/components/common';
    export default {
        name:'createChild',
        data(){
            return {
                selected:'tab2',
                childList:[],
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token'),
                user:'',
                name: '',
                nickname: '',
                gender:'',
                birth_date:common.formatDate(new Date(),'yyyy-MM-dd'),
                blood_type: '请选择血型',
                horoscope: '请选择星座',
                shengxiao: '请选择生肖',
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
            })
        },
        methods:{
            selectGender: function(gender){
                this.gender = gender;
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
            create: function(){
                Indicator.open('加载中...');
                var _this = this;
                var requestObj={
                    username: _this.username,
                    token: _this.token,
                    name: _this.name,
                    nickname: _this.nickname,
                    gender: _this.gender,
                    birth_date: _this.birth_date,
                    blood_type: _this.blood_type == '请选择血型' ? '' : _this.blood_type,
                    horoscope: _this.horoscope == '请选择星座' ? '' : _this.horoscope,
                    shengxiao: _this.shengxiao == '请选择生肖' ? '' : _this.shengxiao,
                    is_default: '1',
                    // remote_domain: '',
                    // remote_file_key: '',
                    clinic_id: localStorage.getItem('wap_clinic'),
                }
                 //判断头像(不必传)
                if(document.getElementById('file').value == ''){
                    //判断是否存在头像，并且没有修改
                    requestObj['remote_domain'] = '';
                    requestObj['remote_file_key'] = '';
                }else{
                    requestObj['remote_domain'] = 'http://bcircle.meb.meb168.com';
                    requestObj['remote_file_key'] = document.getElementById('file').getAttribute('value');
                }
                _this.$http.post(window.envs.api_url + '/createchild' , requestObj).then((res)=>{
                    if(res.data.status == 'no'){
                        Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                    }else{
                         _this.$router.push('/user');
                    }
                    Indicator.close();
                },(res)=>{
                    Indicator.close();
                    Toast({message: "服务器错误",position: 'middle',duration: 3000});
                });
            },
            goChild:function(child){
                sessionStorage.setItem('child',JSON.strivify(child));
                this.$router.push('orderlist');
            },
            goRouter:function(tab){
                if(tab == 'tab1'){
                    this.$router.push('/bookiv/bookiv');
                }else{
                    this.$router.push('/user');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @function px2rem ($px){
        @return $px / 12px * 1rem;
    }
    select {
        width: 100%;
        border: none;
        border-width: 0px;
        border-top-style: none;
        border-right-style: none;
        border-left-style: none;
        border-bottom-style: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: #fff;
        font-size:16px;
        padding:5px 10px;
    }
    .info-img{
        width: px2rem(100px);
    }
    .tip{
        width: .83333rem;
        text-align: center;
        color: red;
        display: inline-block;
        height: .83333rem;
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
    .cell-group {
        select,input {
            width: 100%;
            border: none;
            border-width: 0px;
            border-top-style: none;
            border-right-style: none;
            border-left-style: none;
            border-bottom-style: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            background-color: #fff;
            font-size:16px;
        }
        .cell {
            display: flex;
            line-height: 4rem;
            height: 4rem;
            background: #fff;
            border-bottom: 1px solid #d6d6d6;
            padding-left: 10px;
        }
        .middle-box {
            padding: 0 10px;
            flex: 1;
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
