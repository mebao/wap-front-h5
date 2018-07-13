<template>
<div>
    <div class="layout-base">
        <mt-header title="预约">
            <router-link to="/orderlist" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/user" slot="right">
              <img src="../../assets/home.png" height="18"/><span>首页</span>
            </router-link>
        </mt-header>
      <div class="layout-content">
          <div class="content-view">
              <div class="content-page">
                  <mt-navbar v-model="selected">
                    <mt-tab-item id="1">详情</mt-tab-item>
                    <mt-tab-item id="2" v-if="casehistory !='' || healthrecord == ''">病历</mt-tab-item>
                    <mt-tab-item id="3" v-if="healthrecord != ''">儿保</mt-tab-item>
                    <mt-tab-item id="4">医嘱</mt-tab-item>
                  </mt-navbar>
                  <mt-tab-container v-model="selected">
                      <mt-tab-container-item id="1">
                          <div class="pad10">
                                <p v-if="(order.status  == '1' || order.status  == '2') && use" class="tip mb10">
                                <span>离面诊时间还有</span>
                                <span>{{order.timeDiff}}</span>
                            </p>
                            <div class="cell-group">
                                <div class="cell">
                                    <div>
                                        预约时间:
                                    </div>
                                    <div class="right-box">{{order.bookingDateText}}</div>
                                </div>
                                <div class="cell">
                                    <div>
                                        接诊医生:
                                    </div>
                                    <div class="right-box">{{order.doctorName}}</div>
                                </div>
                                <div class="cell">
                                    <div>
                                        就诊宝宝:
                                    </div>
                                    <div class="right-box">{{order.childName}}</div>
                                </div>
                                <div class="cell">
                                    <div>
                                        就诊科室:
                                    </div>
                                    <div class="right-box">{{order.serviceName}}</div>
                                </div>
                                <div class="cell" v-if="order.begin">
                                    <div>
                                        就诊时间:
                                    </div>
                                    <div class="right-box">{{order.beginText}}</div>
                                </div>
                            </div>
                          </div>
                          <div class="w100 pr10 pl10">
                            <mt-button v-if="order.status == '1' || order.status == '2'" size="large" type="primary" @click="udpateBooking()">修改预约</mt-button>
                          </div>
                      </mt-tab-container-item>
                      <mt-tab-container-item id="2" v-if="casehistory !='' || healthrecord == ''">
                        <div v-if="hasCasehistory" class="pad10">
                    		<div class="cell-group text">
                    			<div v-if="casehistory.weight != null && casehistory.weight != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					体重:
                    				</div>
                    				<div class="right-box">
                                        <div class="line-height-normal">
                                            {{casehistory.weight}}Kg
                                        </div>
                                        <div v-if="casehistory.midWeight != null && casehistory.midWeight != ''" class="line-height-normal">
                                            中等值：{{casehistory.midWeight}}Kg
                                        </div>
                                        <div v-if="casehistory.weight != null && casehistory.weight != '' && casehistory.midWeight != null && casehistory.midWeight != ''" class="line-height-normal">
                                            对比：{{casehistory.compareWeight}}
                                        </div>
                                    </div>
                    			</div>
                    			<div v-if="casehistory.height != null && casehistory.height != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					身高:
                    				</div>
                    				<div class="right-box">
                                        <div class="line-height-normal">
                                            {{casehistory.height}}cm
                                        </div>
                                        <div v-if="casehistory.midHeight != null && casehistory.midHeight != ''" class="line-height-normal">
                                            中等值：{{casehistory.midHeight}}cm
                                        </div>
                                        <div v-if="casehistory.height != null && casehistory.height != '' && casehistory.midHeight != null && casehistory.midHeight != ''" class="line-height-normal">
                                            对比：{{casehistory.compareHeight}}
                                        </div>
                                    </div>
                    			</div>
                    			<div v-if="casehistory.bodyTemperature != null && casehistory.bodyTemperature != ''" class="cell">
                    				<div class="left-box clearly-width">
                    					体温:
                    				</div>
                    				<div class="right-box">
                                        {{casehistory.bodyTemperature}}°C
                                    </div>
                    			</div>
                    			<div v-if="casehistory.headCircum != null && casehistory.headCircum != ''" class="cell">
                    				<div class="left-box clearly-width">
                    					头围:
                    				</div>
                    				<div class="right-box">
                                        {{casehistory.headCircum}}cm
                                    </div>
                    			</div>
                    			<div v-if="casehistory.breastCircum != null && casehistory.breastCircum != ''" class="cell">
                    				<div class="left-box clearly-width">
                    					胸围:
                    				</div>
                    				<div class="right-box">
                                        {{casehistory.breastCircum}}cm
                                    </div>
                    			</div>
                    			<div v-if="casehistory.topicComment != null && casehistory.topicComment != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					主诉:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.topicComment}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.checkResult != null && casehistory.checkResult != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					检查结果:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.checkResult}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.presentIllness != null && casehistory.presentIllness != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					现病史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.presentIllness}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.previousHistory != null && casehistory.previousHistory != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					既往史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.previousHistory}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.allergy != null && casehistory.allergy != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					过敏史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.allergy}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.familyHistory != null && casehistory.familyHistory != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					家族史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.familyHistory}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.breedHistory != null && casehistory.breedHistory != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					孕育史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.breedHistory}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.growthHistory != null && casehistory.growthHistory != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					生长发育史:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.growthHistory}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.physicalCheck != null && casehistory.physicalCheck != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					体格检查:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.physicalCheck}}
                                    </div>
                    			</div>
                    			<div v-if="(casehistory.breathe != null && casehistory.breathe != '') || (casehistory.bloodPressure != null && casehistory.bloodPressure != '') || (casehistory.faceNeck != null && casehistory.faceNeck != '') || (casehistory.heartLung != null && casehistory.heartLung != '') || (casehistory.abdomen != null && casehistory.abdomen != '') || (casehistory.limbs != null && casehistory.limbs != '') || (casehistory.nervousSystem != null && casehistory.nervousSystem != '')" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					体格检查详情:
                    				</div>
                    				<div class="right-box">
                                        <div v-if="casehistory.breathe != null && casehistory.breathe != ''" class="line-height-normal">
                                            呼吸：{{casehistory.breathe}}次/分
                                        </div>
                                        <div v-if="casehistory.bloodPressure != null && casehistory.bloodPressure != ''" class="line-height-normal">
                                            血压：{{casehistory.bloodPressure}}mmHg
                                        </div>
                                        <div v-if="casehistory.faceNeck != null && casehistory.faceNeck != ''" class="line-height-normal">
                                            面、颈部：{{casehistory.faceNeck}}
                                        </div>
                                        <div v-if="casehistory.heartLung != null && casehistory.heartLung != ''" class="line-height-normal">
                                            心肺：{{casehistory.heartLung}}
                                        </div>
                                        <div v-if="casehistory.abdomen != null && casehistory.abdomen != ''" class="line-height-normal">
                                            腹部：{{casehistory.abdomen}}
                                        </div>
                                        <div v-if="casehistory.limbs != null && casehistory.limbs != ''" class="line-height-normal">
                                            四肢：{{casehistory.limbs}}
                                        </div>
                                        <div v-if="casehistory.nervousSystem != null && casehistory.nervousSystem != ''" class="line-height-normal">
                                            神经系统：{{casehistory.nervousSystem}}
                                        </div>
                                    </div>
                    			</div>
                    			<div v-if="casehistory.files.length > 0" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					文件:{{casehistory.files.length}}
                    				</div>
                    				<div class="right-box imageBox">
                                        <div v-for="file in casehistory.files" class="file-area" :key="file.fileId">
                                            <img @click="clickImg($event)" v-if="file.fileExt != 'pdf'" :src="file.fileUrl">
                                            <div @click="showPdf(file.fileUrl)" v-if="file.fileExt == 'pdf'">{{file.fileName}}</div>
                                        </div>
                                    </div>
                    			</div>
                    			<div v-if="casehistory.diagnosis != null && casehistory.diagnosis != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					诊断:
                    				</div>
                    				<div class="right-box line-height-normal has-diagnosis">
                                        {{casehistory.diagnosis}}
                                    </div>
                    			</div>
                    			<div v-if="casehistory.advise != null && casehistory.advise != ''" class="cell height-auto">
                    				<div class="left-box clearly-width">
                    					建议:
                    				</div>
                    				<div class="right-box line-height-normal">
                                        {{casehistory.advise}}
                                    </div>
                    			</div>
                            </div>
                        </div>
                        <div v-if="!hasCasehistory" class="pad10">
                            暂无病例信息
                        </div>
                      </mt-tab-container-item>
                      <mt-tab-container-item id="3" v-if="healthrecord != ''">
                        <div class="pad10">
                            <div class="cell-group text">
                                <div v-if="healthrecord.weight != null && healthrecord.weight != ''" class="cell height-auto">
                                    <div class="left-box clearly-width">
                                        体重:
                                    </div>
                                    <div class="right-box">
                                        <div class="line-height-normal">
                                            {{healthrecord.weight}}Kg
                                        </div>
                                        <div v-if="healthrecord.mediumWeight != null && healthrecord.mediumWeight != ''" class="line-height-normal">
                                            中等值：{{healthrecord.mediumWeight}}Kg
                                        </div>
                                        <div v-if="healthrecord.weight != null && healthrecord.weight != '' && healthrecord.mediumWeight != null && healthrecord.mediumWeight != ''" class="line-height-normal">
                                            对比：{{healthrecord.compareWeight}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="healthrecord.height != null && healthrecord.height != ''" class="cell height-auto">
                                    <div class="left-box clearly-width">
                                        身高:
                                    </div>
                                    <div class="right-box">
                                        <div class="line-height-normal">
                                            {{healthrecord.height}}cm
                                        </div>
                                        <div v-if="healthrecord.mediumHeight != null && healthrecord.mediumHeight != ''" class="line-height-normal">
                                            中等值：{{healthrecord.mediumHeight}}cm
                                        </div>
                                        <div v-if="healthrecord.height != null && healthrecord.height != '' && healthrecord.mediumHeight != null && healthrecord.mediumHeight != ''" class="line-height-normal">
                                            对比：{{healthrecord.compareHeight}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="healthrecord[item.key] != null && healthrecord[item.key] != ''" v-for="item in healthItem" class="cell height-auto" :key="item.name">
                                    <div class="left-box clearly-width">
                                        {{item.name}}:
                                    </div>
                                    <div class="right-box line-height-normal">
                                        {{healthrecord[item.key] + item.unit}}
                                    </div>
                                </div>
                    			<div v-if="healthrecord.files.length > 0" class="cell height-auto">

                    				<div class="left-box clearly-width">
                    					文件:{{healthrecord.files.length}}
                    				</div>
                    				<div class="right-box">
                                        <div v-for="file in healthrecord.files" :key="file.fileId">
                                            <img @click="clickImg($event)" v-if="file.fileExt != 'pdf'" :src="file.fileUrl">
                                            <div @click="showPdf(file.fileUrl)" v-if="file.fileExt == 'pdf'">{{file.fileName}}</div>
                                        </div>
                                    </div>
                    			</div>
                            </div>
                                 
                        </div>
                      </mt-tab-container-item>
                      <mt-tab-container-item id="4">
                        <div v-if="check != '' || assist != '' || prescript.length > 0 || tcmPrescript.length > 0" class="pad10">
                        <div class="cell-group text">
                          <div v-if="check != ''" class="cell height-auto flex">
                              <div>
                                  实验室检查:
                              </div>
                              <div class="right-box">
                                  <div class="">
                                      {{check}}
                                  </div>
                              </div>
                          </div>
                          <div v-if="assist != ''" class="cell height-auto">
                              <div class="left-box clearly-width">
                                  治疗:
                              </div>
                              <div class="right-box">
                                  <div class="line-height-normal">
                                      {{assist}}
                                  </div>
                              </div>
                          </div>
                          <div v-if="prescript.length > 0" v-for="(item, index) in prescript" class="cell height-auto" :key="item.id">
                              <div class="left-box clearly-width">
                                  {{index == 0 ? '西/中成药处方:' : ''}}
                              </div>
                              <div class="right-box">
                                  <div>
                                      <span>{{item.pname}}</span>
                                      <span>{{item.format}}</span>
                                      <span>{{item.num + item.unit}}</span>
                                      <span>{{item.days}}天</span>
                                  </div>
                                  <div>
                                      用法：
                                      <span>{{item.frequency}}</span>
                                      <span>一次{{item.oneNum + item.oneUnit}}</span>
                                      <span>{{item.usage}}</span>
                                  </div>
                              </div>
                          </div>
                          <div v-if="tcmPrescript.length > 0" v-for="(item, index) in tcmPrescript" class="cell height-auto" :key="item.id">
                              <div class="left-box clearly-width">
                                  {{index == 0 ? '中药处方:' : ''}}
                              </div>
                              <div class="right-box">
                                  <div v-for="info in item.infos" :key="info.infoId">
                                      <span>{{info.tcmName}}</span>
                                  </div>
                                  <div>
                                      用法：
                                      <span>{{item.frequency}}</span>
                                      <span>一次{{item.oneNum + item.oneUnit}}</span>
                                      <span>{{item.usage}}</span>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div v-if="check != ''" class="btn-dock">
                          <mt-button size="large" type="primary" @click="showCheckInfo()">查看检查详情</mt-button>
                        </div>
                        </div>
                        <div v-if="check == '' && assist == '' && prescript.length == 0" class="pad10">
                        暂无医嘱信息
                        </div>
                      </mt-tab-container-item>
                  </mt-tab-container>
              </div>
          </div>
      </div>
    <!-- 放大图片 -->
    </div>
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

    </div>
</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';
import BigImg from '@/components/BigImg';

export default {
    name:'orderDetail',
    data(){
        return {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            child: JSON.parse(sessionStorage.getItem('child')),
            order: '',
            selected:'1',
            bookingList:'',
            caseList:'',
            bookingInNum: '0',
            allBookings:'',
            check:'',
            checkList:'',
            prescript:'',
            assist:'',
            tcmPrescript:'',
            healthrecord: '',
            hasCasehistory: false,
            casehistory: '',
            healthItem: '',
            use: '',
            imgSrc: '',
            showImg: false,
        }
    },
    components: {
        'big-img':BigImg
    },
    mounted:function(){
        this.$nextTick(function () {
            document.title = '预约';
            Indicator.open('加载中...');
            this.searchBooking();
            this.searchUserCheckProject();
            this.searchCaseHistory();
            this.searchHealthRecord();
            this.searchTcmPrescript();
            this.searchPrescript();
            this.searchBookingAssist();
            this.healthItem = [
                {name: '头围', key: 'headCircum', unit: 'cm'},
                {name: '胸围', key: 'breastCircum', unit: 'cm'},
                {name: '体温', key: 'bodyTemperature', unit: '°C'},
                {name: '脉搏', key: 'pulse', unit: '次/分钟'},
                {name: '呼吸', key: 'breathe', unit: '次/分钟'},
                {name: '血压', key: 'bloodPressure', unit: 'mmHg'},
                {name: '精神及神志', key: 'spirit', unit: ''},
                {name: '营养状态', key: 'nutritionalStatus', unit: ''},
                {name: '皮肤', key: 'skin', unit: ''},
                {name: '口腔黏膜', key: 'oralMucosa', unit: ''},
                {name: '毛发', key: 'hair', unit: ''},
                {name: '浅表淋巴结', key: 'lymphNode', unit: ''},
                {name: '头颅', key: 'head', unit: ''},
                {name: '前囟', key: 'bregmatic', unit: ''},
                {name: '双眼', key: 'eyes', unit: ''},
                {name: '耳', key: 'ear', unit: ''},
                {name: '鼻', key: 'nose', unit: ''},
                {name: '咽喉', key: 'throat', unit: ''},
                {name: '扁桃体', key: 'tonsil', unit: ''},
                {name: '牙龈', key: 'gums', unit: ''},
                {name: '舌系带', key: 'tongue_tie', unit: ''},
                {name: '牙窝沟', key: 'teeth_pit', unit: ''},
                {name: '牙菌斑', key: 'plaque', unit: ''},
                {name: '出牙数', key: 'teeth_num', unit: '颗'},
                {name: '龋齿', key: 'dental_caries', unit: ''},
                {name: '胸廓', key: 'thoracic', unit: ''},
                {name: '心脏', key: 'heart', unit: ''},
                {name: '双肺', key: 'lung', unit: ''},
                {name: '双肾', key: 'kidney', unit: ''},
                {name: '腹部', key: 'abdomen', unit: ''},
                {name: '乳腺', key: 'mammaryGland', unit: ''},
                {name: '脊柱及四肢', key: 'limb', unit: ''},
                {name: '肋骨', key: 'ribs', unit: ''},
                {name: '髋关节', key: 'hip_joint', unit: ''},
                {name: '斜颈', key: 'torticollis', unit: ''},
                {name: '外生殖器', key: 'genitalia', unit: ''},
                {name: '肛门', key: 'anus', unit: ''},
                {name: '神经发育', key: 'neurodevelopment', unit: ''},
                {name: '血常规', key: 'bloodRoutineExamination', unit: ''},
                {name: '尿常规', key: 'routineUrine', unit: ''},
                {name: '大便常规', key: 'stoolRoutineExamination', unit: ''},
                {name: '骨密度', key: 'boneDensity', unit: ''},
                {name: '骨碱性磷酸酶', key: 'BALP', unit: ''},
                {name: '微量元素', key: 'traceElement', unit: ''},
                {name: '铅、镉、锰', key: 'heavyMetal', unit: ''},
                {name: 'ABO血型鉴定', key: 'bloodType', unit: ''},
                {name: '喂养指导', key: 'feeding', unit: ''},
                {name: '生活指导', key: 'life', unit: ''},
                {name: '免疫接种指导', key: 'immunization', unit: ''},
                {name: '疾病预防', key: 'diseasePrevention', unit: ''},
                {name: '答疑解惑', key: 'answeringQuestions', unit: ''},
                {name: '诊疗记录', key: 'record', unit: ''},
                {name: '复查日期', key: 'reviewDate', unit: ''},
	        ]
        })
    },
    methods:{
        searchBooking: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&child_id=' + this.child.childId + '&id=' + this.$route.query.id;
            this.$http.get(window.envs.api_url + '/mybookings' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    if(res.data.results.allBookings.length > 0){
                        res.data.results.allBookings[0].bookingDateText = res.data.results.allBookings[0].bookingDate.replace('-', '年');
                        res.data.results.allBookings[0].bookingDateText = res.data.results.allBookings[0].bookingDateText.replace('-', '月');
                        res.data.results.allBookings[0].bookingDateText = res.data.results.allBookings[0].bookingDateText.replace(' ', '日 ');
                        if(res.data.results.allBookings[0].begin){
                            res.data.results.allBookings[0].beginText = res.data.results.allBookings[0].begin.replace('-', '年');
                            res.data.results.allBookings[0].beginText = res.data.results.allBookings[0].beginText.replace('-', '月');
                            res.data.results.allBookings[0].beginText = res.data.results.allBookings[0].beginText.replace(' ', '日 ');
                        }
                        this.order = res.data.results.allBookings[0];
                        this.use = new Date().getTime() < new Date(this.order.bookingDate);
                    }
                }
                Indicator.close();
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchCaseHistory: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&booking_id=' + this.order.id;
            this.$http.get(window.envs.api_url + '/searchcasehistory' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    if(res.data.results.list.length > 0){
                        this.hasCasehistory = true;
                        this.casehistory = res.data.results.list[0];
                    }else{
                        this.hasCasehistory = false;
                    }
                }
                Indicator.close();
            },(res)=>{
                Indicator.close();
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchHealthRecord: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&booking_id=' + this.order.id;
            this.$http.get(window.envs.api_url + '/searchhealthrecord' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});  
                }else{
                    if(res.data.results.list.length > 0){
                        this.healthrecord = res.data.results.list[0];
                    }
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchTcmPrescript: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&booking_id=' + this.order.id  + '&isout=1';
            this.$http.get(window.envs.api_url + '/searchtcmprescript' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});  
                }else{
                    if(res.data.results.list.length > 0){
                        this.tcmPrescript = res.data.results.list;
                    }else{
                        this.tcmPrescript = [];
                    }
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchPrescript: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&booking_id=' + this.order.id  + '&isout=1';
            this.$http.get(window.envs.api_url + '/searchprescript' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});  
                }else{
                    if(res.data.results.list.length > 0){
                        for(var i = 0; i < res.data.results.list.length; i++){
				            res.data.results.list[i].infoLength = res.data.results.list[i].info.length;
                        }
                        var prescript = res.data.results.list[0];
                        if(prescript.info.length > 0){
                            this.prescript = prescript.info;
                        }
                    }else{
                        this.prescript = [];
                    }
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchBookingAssist: function(){
            var urlOptions = '?username=' + this.username + '&token=' + this.token + '&booking_id=' + this.order.id;
            this.$http.get(window.envs.api_url + '/bookingassist' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});  
                }else{
                    var assist = '';
                    if(res.data.results.list.length > 0){
                        for(var i = 0; i < res.data.results.list.length; i++){
                            assist += res.data.results.list[i].assistName + '、';
                        }
                    }
                    if(assist.length > 0){
                        assist = assist.slice(0, assist.length - 1);
                    }
                    this.assist = assist;
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        searchUserCheckProject: function(){
            var username = this.username;
            var token = this.token;
            var urlOptions = '?username=' + username + '&token=' + token + '&booking_id=' + this.order.id + '&today=1&ischeck=1';
            this.$http.get(window.envs.api_url + '/usercheckprojects' + urlOptions).then((res)=>{
                if(res.data.status == 'no'){
                    Toast({ message: res.data.errorMsg,position: 'middle',duration: 3000});
                }else{
                    var check = '';
                    var checkList = [];
                    if(res.data.results.list.length > 0){
                        for(var i = 0; i < res.data.results.list.length; i++){
                            // 判断该检查是否填写检查结果
                            if(res.data.results.list[i].checkDoctorId){
                                checkList.push(res.data.results.list[i]);
                                check += res.data.results.list[i].checkName + '、';
                            }
                        }
                    }
                    if(check.length > 0){
                        check = check.slice(0, check.length - 1);
                    }
                    this.check = check;
                    this.checkList = checkList; 
                }
            },(res)=>{
                Toast({message: "服务器错误",position: 'middle',duration: 3000});
            });
        },
        showCheckInfo:function(){
            sessionStorage.setItem('checkBookingId',this.order.id);
            this.$router.push({path:'/order/checkInfo',query:{type:'orderDetail'}});
        },
        showPdf: function(_url){
            window.open(_url);
        },
         clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
        udpateBooking: function(){
            sessionStorage.setItem('order',JSON.stringify(this.order));
            this.$router.push({path:'/booking/updateBooking'});
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn-tab{
        position: absolute;
        z-index: 99999;
        background-color: #fff;
        top: 0;
        .item{
            padding:10px;
            .icon{
                width:24px;
            }
        }
    }
    .cell-group{
        width: 100%;
        border-width: 0px;
        border-radius: 4px;
        border-style: solid;
        border-color: #d6d6d6;
        padding-left: 10px;
        margin-bottom: 10px;
        background: #fff;
        &.text{
            .cell{
                padding: 1.2em 0;
                line-height: normal;
                height: auto;
            }
        }
        .clearly-width{
            width:6.25rem;
            max-width: 16.66667rem;
            height: 100%;
            overflow: hidden;
        }
        .cell{
            width: 100%;
            height: 4rem;
            line-height: 4rem;
            border-bottom: 1px dashed #d6d6d6;
            &:last-child{
              border-bottom: none;  
            }
            display: flex;
            .right-box{
                flex: 1;
                margin-left: 10px;
                overflow: hidden;
                img{
                    height: 6.667rem;
                }
            }
        }
    }
</style>
