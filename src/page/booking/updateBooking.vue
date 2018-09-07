<template>
    <div class="layout-base">
        <mt-header title="修改预约">
          <div @click="goBack()" slot="left">
              <mt-button icon="back"></mt-button>
            </div>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
        </mt-header>
        <div class="layout-content">
            <div class="content-view">
                <div class="content-page">
            			<div class="cell-group">
                          <div class="cell flex">
                              <div class="left-box icon-name">
                                宝宝姓名
                              </div>
                              <div class="flex-1">{{selectedChild}}
                              </div>
                          </div>
                            <div class="cell flex">
                                <div class="left-box icon-type">
                                    预约项目
                                </div>
                                <div class="flex-1">
                                    <select @change="changeService()" v-model="selectedService">
                                        <option v-for="service in serviceList" :key='service.id' :value="service">{{service.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="cell flex">
                                <div class="left-box icon-doctor">
                                    预约医生
                                </div>
                                <div class="flex-1">
                                    <select v-model="selectedDoctor" @change="changeDoctor">
                                        <option></option>
                                        <option v-for="doctor in doctorList" :key='doctor.doctorId' :value="doctor">{{doctor.doctorName}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="cell flex">
                                <div class="left-box icon-fee">
                                    预约价格
                                </div>
                                <div class="flex-1" v-if="selectedDoctor.fee">
                                    {{selectedDoctor.fee * 1}}元/次
                                </div>
                            </div>
                          <div class="cell flex">
                            <div class="left-box icon-date">
                              预约日期
                            </div>
                            <div class="flex-1">
                                <select v-model="selectedDate" @change="changeDuty()">
                                    <option></option>
                                    <option v-for="duty in selectedDoctor.doctorDutys" :key='duty.dutyDate' :value="duty">{{duty.dutyDateText}}</option>
                                </select>
                            </div>
                          </div>
                        <div class="cell flex">
                          <div class="left-box icon-time">
                            预约时间
                          </div>
                          <div class="flex-1">
                              <select v-model="selectedTime">
                                    <option></option>
                                    <option v-if="time.use" v-for="time in timeList" :key="time.value" :value="time.value">{{time.value}}</option>
                                    <option v-if="!time.use" v-for="time in timeList" :key="time.value" :value="time.value" disabled>{{time.value + '（' + time.text +'）'}}</option>
                                </select>
                          </div>
                          <div class="flex-1" v-if="type=='ZJ'">{{time}}</div>
                        </div>
            			  </div>
                        <div class="w100 pr10 pl10">
                            <mt-button class="mt10" size="large" type="primary" @click="goBooking()" :disabled="selectedService =='' || selectedDoctor =='' ||selectedDate =='' ||selectedTime =='' ||selectedChild == ''">预约</mt-button>
                        </div>
                </div>
            </div>
        </div>
        <!-- <mt-tabbar v-model="selected">
              <mt-tab-item id="tab1" @click.native="goRouter('tab1')">
                <img slot="icon" v-if="selected === 'tab1'" src="../../assets/booking.png">
                <img slot="icon" v-if="selected !== 'tab1'" src="../../assets/booking_default.png">
                预约
              </mt-tab-item>
              <mt-tab-item id="tab2" @click.native="goRouter('tab2')">
                  <img slot="icon" v-if="selected === 'tab2'" src="../../assets/user.png">
                  <img slot="icon" v-if="selected !== 'tab2'" src="../../assets/user_default.png">
                我的
              </mt-tab-item>
        </mt-tabbar> -->
    </div>
</template>

<script>
import { MessageBox, Indicator, Toast } from "mint-ui";
export default {
  name: "updateBooking",
  data() {
    return {
      selected: "tab1",
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      booking: JSON.parse(sessionStorage.getItem('order')),
      serviceList: "",
      selectedService: "",
      doctorList: "",
      selectedDoctor: "",
      timeList: "",
      selectedDate: "",
      selectedTime: "",
      selectedChild: "",
      childList: "",
      type: "",
      initFlag: true,
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.selectedChild = this.booking.childName;
      this.selectedDate = this.booking.bookingDate.substring(0,10);
      this.selectedTime = this.booking.bookingDate.substring(this.booking.bookingDate.length-5,this.booking.bookingDate.length);
      this.getAllServices();
    });
  },
  methods: {
    getAllServices: function() {
      Indicator.open("加载中...");
      var urlOptions =
        "?username=" + this.username + "&token=" + this.token + "&clinic_id=" + localStorage.getItem('wap_clinic');
      this.$http.get(window.envs.api_url + "/allservices" + urlOptions).then(
        res => {
          if (res.data.status == "no") {
            Indicator.close();
            Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
          } else {
            this.serviceList = res.data.results.list;
            if (this.serviceList.length > 0) {
              this.selectedService = this.serviceList[0];
              for(var i=0;i<this.serviceList.length;i++){
                  if(this.serviceList[i].id == this.booking.serviceId){
                      this.selectedService = this.serviceList[i];
                  }
              }
              this.changeService();
            } else {
              Toast({message: "暂无可预约科室",position: 'middle',duration: 3000});
            }
            Indicator.close();
          }
        },
        res => {
          Indicator.close();
          Toast({message: "服务器错误",position: 'middle',duration: 3000});
        }
      );
    },
    changeService: function() {
      Indicator.open("加载中...");
      var urlOptions =
        "?username=" +
        this.username +
        "&token=" +
        this.token +
        "&clinic_id=" +  localStorage.getItem('wap_clinic') +
        "&service_id=" +
        this.selectedService.id;
      this.$http.get(window.envs.api_url + "/searchtuina" + urlOptions).then(
        res => {
          //this.childList = res.data.results.childs;
          //this.childList.push(res.data.results.childs);
          if (res.data.status == "no") {
            Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
          } else {
            if (res.data.results.doctors.length == 0) {
              Toast({message: "暂无科室医生排班",position: 'middle',duration: 3000});
              this.doctorList = [];
            } else {
              for (var i = 0; i < res.data.results.doctors.length; i++) {
                if (res.data.results.doctors[i].doctorDutys.length > 0) {
                  for (
                    var j = 0;
                    j < res.data.results.doctors[i].doctorDutys.length;
                    j++
                  ) {
                    var dutyDate = res.data.results.doctors[i].doctorDutys[j].dutyDate;
                    var dutyDateText = dutyDate.replace("-", "年");
                    dutyDateText = dutyDateText.replace("-", "月");
                    dutyDateText += '日 ' + this.getWeekTitle(new Date(dutyDate).getDay());
                    res.data.results.doctors[i].doctorDutys[j].dutyDateText = dutyDateText;
                  }
                }
                res.data.results.doctors[i].str = JSON.stringify(
                  res.data.results.doctors[i]
                );
              }
              this.doctorList = res.data.results.doctors;
            }
             //清空数据
            this.selectedDoctor = '';
            this.selectedDate = '';
            this.selectedTime = '';
              if(this.initFlag && this.doctorList.length>0){
                  for(var i=0;i<this.doctorList.length;i++){
                      if(this.booking.doctorId == this.doctorList[i].doctorId){
                          this.selectedDoctor = this.doctorList[i];
                          if (this.doctorList[i].doctorDutys.length > 0) {
                            console.log(this.booking.bookingDate.substring(0,10));
                            for(var j = 0; j < this.doctorList[i].doctorDutys.length; j++){
                              if(this.booking.bookingDate.substring(0,10) == this.doctorList[i].doctorDutys[j].dutyDate){
                                  this.selectedDate = this.doctorList[i].doctorDutys[j];
                                  console.log(111);
                                  this.changeDuty();
                              }
                            }
                        }
                      }
                  }
              }
            this.childList = res.data.results.childs;
            // if (this.childList.length > 0) {
            //   this.selectedChild = this.childList[0];
            //   console.log( this.selectedChild);
            // }
          }
          Indicator.close();
        },
        res => {
          Indicator.close();
          Toast({message: "服务器错误",position: 'middle',duration: 3000});
        }
      );
    },
    changeDoctor: function(){
      //清空数据
      this.selectedDate = '';
      this.selectedTime = '';
    },
    changeDuty: function() {
      this.timeList = [];
      var todayTimeNum = Number((new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + '' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()));
      if (this.selectedDate.timeList && this.selectedDate.timeList.length > 0) {
        for (var i = 0; i < this.selectedDate.timeList.length; i++) {
          var time = {
            value: this.selectedDate.timeList[i],
            use: true,
            text: '',
          };
          //如果是当天日期，判断时间是否已经过去
          if(this.getDayByDate(new Date) == this.selectedDate.dutyDate){
              var timeNum = Number(this.selectedDate.timeList[i].replace(':', ''));
              if(timeNum < todayTimeNum){
                  time.use = false;
                  time.text = '已过期';
              }
          }
          // 排班时间，不再已预约时间中
          if (
            this.selectedDate.selectedList.length > 0 &&
            this.selectedDate.selectedList.indexOf(
              this.selectedDate.timeList[i]
            ) != -1
          ) {
            time.use = false;
            time.text = '已预约';
          }
          this.timeList.push(time);
        }
      }
      //清空数据
      this.selectedTime = '';
      if(this.initFlag && this.timeList.length>0){
          for(var i=0;i<this.timeList.length;i++){
              if(this.booking.bookingDate.substring(this.booking.bookingDate.length-5,this.booking.bookingDate.length) == this.timeList[i].value){
                this.selectedTime = this.timeList[i].value;
              }
          }
          this.initFlag = false;
      }
    },
    goBooking: function(){
      var html = '<div class="text-left"><div>宝宝姓名：'+ this.selectedChild + '</div>' +
                  '<div>预约科室：'+ this.selectedService.name + '</div>' +
                  '<div>预约医生：'+ this.selectedDoctor.doctorName + '</div>' +
                  '<div class="flex"><div>预约日期：</div><div class="flex-1"><div>'+ this.selectedDate.dutyDateText.split(' ')[0] + '</div><div>'+ this.selectedDate.dutyDateText.split(' ')[1] + '</div></div></div>' +
                  '<div>预约时间：'+ this.selectedTime + '</div></div>';
        MessageBox.confirm(html,'确认修改？').then(() => {
            this.submitForm();
        },()=>{

        });
    },
    submitForm: function() {
      Indicator.open('加载中...');
      var param = {
        username: this.username,
        token: this.token,
        user_doctor_id: this.selectedDoctor.doctorId,
        type: "ZJ",
        clinic_id:  localStorage.getItem('wap_clinic'),
        service_id: this.selectedService.id,
        service_name: this.selectedService.name,
        child_id: this.booking.childId,
        child_name: this.selectedChild,
        //age: String(this.booking.age),
        time: this.selectedTime,
        booking_date: this.selectedDate.dutyDate,
        mobile: this.username,
        //booking_fee: "0"
      };
      this.$http.post(window.envs.api_url + "/userupdatebooking/" + this.booking.id, param).then(
        res => {
          //this.childList = res.data.results.childs;
          //this.childList.push(res.data.results.childs);
          if (res.data.status == "no") {
            Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
          } else {
            MessageBox.alert("修改成功", "温馨提示").then(
              () => {
                this.$router.push("/order/detail?id=" + this.booking.id);
              },
              () => {}
            );
          }
          Indicator.close();
        },
        res => {
          Indicator.close();
          Toast({message: "服务器错误",position: 'middle',duration: 3000});
        }
      );
    },
    getWeekTitle: function(value){
      var title = '';
      switch(value){
        case 1:
          title = '星期一';
          break;
        case 2:
          title = '星期二';
          break;
        case 3:
          title = '星期三';
          break;
        case 4:
          title = '星期四';
          break;
        case 5:
          title = '星期五';
          break;
        case 6:
          title = '星期六';
          break;
        case 0:
          title = '星期天';
          break;
      }
      return title;
    },
    getDayByDate: function(date) {
          var d = date.getDate(),
              m = date.getMonth(),
              y = date.getFullYear();
          return y + '-' + ((m + 1) > 9 ? (m + 1) : ('0' + (m + 1))) + '-' + (d > 9 ? d : ('0' + d));
    },
    goRouter: function(tab) {
      if (tab == "tab1") {
        this.$router.push("/booking/booking");
      } else {
        this.$router.push("/user");
      }
    },
    goBack: function() {
        this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.cell-group {
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
  }
  .cell {
    display: flex;
    line-height: 4rem;
    height: 4rem;
    background: #fff;
    border-bottom: 1px solid #d6d6d6;
    padding-left: 10px;
  }
  .flex-1 {
    padding: 0 10px;
  }
  .icon-type {
    background: url("../../assets/icon_type.png") no-repeat;
    background-size: 1.25rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
  .icon-doctor {
    background: url("../../assets/icon_doctor.png") no-repeat;
    background-size: 1.25rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
  .icon-date {
    background: url("../../assets/icon_date.png") no-repeat;
    background-size: 1.25rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
  .icon-time {
    background: url("../../assets/icon_time.png") no-repeat;
    background-size: 1.25rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
  .icon-name {
    background: url("../../assets/icon_name.png") no-repeat;
    background-size: 1.5rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
  .icon-fee {
    background: url("../../assets/icon_fee.png") no-repeat;
    background-size: 1.4rem 1.25rem;
    padding-left: 30px;
    background-position-y: 21px;
  }
}
</style>