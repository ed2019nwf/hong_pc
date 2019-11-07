<template>
  <div class="discount-swiper">
    <div class="discount-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-lazy" v-for="(item,index) in bannerList" :key="index">
          <div class="discount-slide" :style="{backgroundImage:`url(${item})`}"></div>
        </div>
      </div>
      <ul class="bannerDot"></ul>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      bannerList: [
        require("@/assets/img/sendmoney.jpg"),
        require("@/assets/img/cicunbibisong.jpg"),
        require("@/assets/img/cunkuanwuyou.jpg")
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new Swiper(".discount-container", {
        loop: true, // 循环模式选项
        autoplay: true,
        effect: "fade",
        // 如果需要分页器
        pagination: {
          el: ".bannerDot",
          bulletElement: "li",
          bulletClass: "banner-bullet",
          bulletActiveClass: "active",
          clickable: true
        }
      });
    }
  }
};
</script>

<style >
.discount-slide {
  height: 310px;
}
.discount-container {
  padding-top: 30px;
  position: relative;
  height: 340px;
}
.bannerDot {
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: right;
  padding-right: 15px;
  position: absolute;
  bottom: 0 !important;
  z-index: 100;
  width: 100%;
  padding-top: 9px;
}

.banner-bullet {
  display: inline-block;
  width: 40px;
  height: 10px;
  background-color: #efe8de;
  border-radius: 10px;
  margin-left: 5px;
  cursor: pointer;
}
.banner-bullet.active {
  background-color: #e89c3e;
}
</style>