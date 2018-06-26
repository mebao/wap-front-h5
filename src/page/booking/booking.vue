<template>
    <div class="layout-base">
        <mt-header title="预约">
          <router-link to="/user" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
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
                              <div class="flex-1">
                                <select v-model="selectedChild">
                                    <option v-for="child in childList" :key='child.childId' :value="child">{{child.childName}}</option>
                                </select>
                              </div>
                          </div>
                            <div class="cell flex">
                                <div class="left-box icon-type">
                                    预约项目
                                </div>
                                <div class="flex-1">
                                    <select @change="changeService()" :value="selectedService">
                                        <option v-for="service in serviceList" :key='service.id' :value="service">{{service.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="cell flex">
                                <div class="left-box icon-doctor">
                                    预约医生
                                </div>
                                <div class="flex-1">
                                    <select v-model="selectedDoctor">
                                        <option></option>
                                        <option v-for="doctor in doctorList" :key='doctor.doctorId' :value="doctor">{{doctor.doctorName}}</option>
                                    </select>
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
                                    <option v-if="time.use" v-for="time in timeList" :key="time.value">{{time.value}}</option>
                                    <option v-if="!time.use" v-for="time in timeList" :key="time.value" disabled>{{time.value + '（' + time.text +'）'}}</option>
                                </select>
                          </div>
                          <div class="flex-1" v-if="type=='ZJ'">{{time}}</div>
                        </div>
            			  </div>
                        <div class="w100 pr10 pl10">
                            <mt-button class="mt10" size="large" type="primary" @click="submitForm()" :disabled="selectedService =='' || selectedDoctor =='' ||selectedDate =='' ||selectedTime =='' ||selectedChild == ''">确认预约</mt-button>
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
  name: "booking",
  data() {
    return {
      selected: "tab1",
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
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
    };
  },
  mounted: function() {
    this.$nextTick(function() {
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
            this.childList = res.data.results.childs;
            if (this.childList.length > 0) {
              this.selectedChild = this.childList[0];
            }
          }
          Indicator.close();
        },
        res => {
          Indicator.close();
          Toast({message: "服务器错误",position: 'middle',duration: 3000});
        }
      );
    },
    changeDuty: function() {
      this.timeList = [];
      var todayTimeNum = Number((new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + '' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()));
      if (this.selectedDate.timeList.length > 0) {
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
    },
    submitForm: function() {console.log(111);
      Indicator.open('加载中...');
      var param = {
        username: this.username,
        token: this.token,
        user_doctor_id: this.selectedDoctor.doctorId,
        type: "ZJ",
        clinic_id:  localStorage.getItem('wap_clinic'),
        service_id: this.selectedService.id,
        service_name: this.selectedService.name,
        child_id: this.selectedChild.childId,
        child_name: this.selectedChild.childName,
        age: String(this.selectedChild.age),
        time: this.selectedTime,
        booking_date: this.selectedDate.dutyDate,
        mobile: this.username,
        booking_fee: "0"
      };
      this.$http.post(window.envs.api_url + "/createbooking", param).then(
        res => {
          //this.childList = res.data.results.childs;
          //this.childList.push(res.data.results.childs);
          if (res.data.status == "no") {
            Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
          } else {
            MessageBox.alert("预约成功", "温馨提示").then(
              () => {
                this.$router.push("/user");
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
}
</style>