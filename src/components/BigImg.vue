<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img-layer"></div>
            <div class="img">
                <img :src="imgSrc">
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['imgSrc'],
    methods: {
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        }
    }
}
</script>
<style lang="scss" scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}


/* bigimg */

/*遮罩层样式*/
.img-view .img-layer {
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: auto;
}

/*不限制图片大小，实现居中*/
.img-view .img{
    width: 100%;
    position: absolute;
    margin: auto;
    z-index: 100;
    bottom: 0;
    max-height: 80%;
    left: 0;
    overflow: auto;
    text-align: center;
}
</style>