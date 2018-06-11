<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'mint-ui/lib/style.css';
@import './my-mint.scss';
@import "@/components/provider/uploadImg/uploadImg.scss";

@function px2rem ($px){
    @return $px / 12px * 1rem;
}

@function px2multi ($px1, $px2, $px3, $px4){
    @return $px1 / 12px * 1rem $px1 / 12px * 1rem $px1 / 12px * 1rem $px1 / 12px * 1rem;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media screen and (min-width: 320px) {
    html {
        font-size: 16px;
    }
}

@media screen and (min-width: 375px) {
    html {
        font-size: 16px;
    }
}

@media screen and (min-width: 414px) {
    html {
        font-size: 16px;
    }
}

@media screen and (min-width: 600px) {
    html {
        font-size: 16px;
    }
}
* {
    //font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
    font-family: 'Microsoft YaHei',微软雅黑,'Microsoft Yahei',黑体,宋体,Arial,Simsun,Helvetica,sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
body {
    width: 100%;
    overflow: hidden;
    letter-spacing: px2rem(1px);
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}

a{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;cursor: pointer;
    color: #333;
    text-decoration: none;
    &:link{
        text-decoration:none;
    }
    &:visited{
        text-decoration:none;
    }
    &:hover{
        text-decoration:none;
    }
    &:active{
        text-decoration:none;
    }
}
.flex{
    display: flex;
    .flex-1{
        flex:1;
    }
}
.fn-clear {
    clear: both;
}

.fn-left {
    float: left;
}

.fn-right {
    float: right;
}

.fn-show {
    display: block;
}

.fn-hide {
    display: none;
}

.text-left {
    text-align: left;
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}
.line-height-normal{
    line-height: normal;
}
.container{
    padding: 0 px2rem(10px) 0 px2rem(10px);
}
.w10{
    width: 10%;
}
.w15{
    width: 15%;
}
.w20{
    width: 20%;
}
.w25{
    width: 25%;
}
.w30{
    width: 30%;
}
.w35{
    width: 35%;
}
.w40{
    width: 40%;
}
.w45{
    width: 45%;
}
.w50{
    width: 50%;
}
.w60{
    width: 60%!important;
}
.w70{
    width: 70%;
}
.w80{
    width: 80%;
}
.w90{
    width: 90%;
}
.w100{
    width: 100%;
}
.h100{
    height: 100%;
}
.pad10{
    padding: px2rem(10px);
}
.pt5{
    padding-top: px2rem(5px);
}
.pt10{
    padding-top: px2rem(10px)!important;
}
.pt20{
    padding-top: px2rem(20px);
}
.pb10{
    padding-bottom: px2rem(10px)!important;
}
.pb20{
    padding-bottom: px2rem(20px);
}
.pl10{
    padding-left: px2rem(10px);
}
.pr10{
    padding-right: px2rem(10px);
}
.mt10{
    margin-top: px2rem(10px);
}
.mt5{
    margin-top: px2rem(5px);
}
.mb10{
    margin-bottom: px2rem(10px);
}
.mr10{
    margin-right: px2rem(10px);
}
.ml10{
    margin-left: px2rem(10px);
}
.color-g{
    color: #717171;
}
.bg-white{
    background-color:#fff;
}
.color-white{
    color:#fff;
}
.layout-base{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #efefef;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: 100vh;
    width:100%;
    .layout-header{
        width: 100%;
        height:40px;
        z-index: 10;
    }
    .layout-content{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 100%;
        height: auto;
        .content-view{
            height: 100%;
            .content-page{
                position: absolute;
                top: 40px;
                left: 0;
                right: 0;
                bottom: 0;
                height: auto;
                overflow: auto;
            }
        }
    }
    .layout-footer{
        width: 100%;
        height: 10px;
        overflow: hidden;
        z-index: 99;
    }
}
.page-create-child,.page-update-child{
    .upload-img{
        background-color: inherit!important;
        padding: 0;
        .add-icon{
            width: 100%;
            margin-left: 0;
            margin-bottom: 0;
            border-radius: 50%;
            .text{
                .text-sm{
                    font-size: px2rem(14px);
                }
            }
        }
        .img-item{
            border: none;
            width: 100%;
            margin-left: 0;
            margin-bottom: 0;
        }
    }
}
.page-create-child{
    .add-icon{
        background-color: #888;
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
    }
}
</style>
