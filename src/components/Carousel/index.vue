<template>
  <div class="swiper">
    <div class="swiper-container" v-if="list.length">
      <div class="swiper-wrapper">
        <div v-for="(el,key) in list" class="swiper-slide swiper-lazy" :key="key">
          <div class="myslide" :style="{backgroundImage:`url(${el.image})`}"></div>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->
      <ul class="dollBar"></ul>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  mounted: function() {
    if (this.list.length > 0) {
    }
  },
  data() {
    return {};
  },
  updated() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true,
      effect: "fade",
      // 如果需要分页器
      pagination: {
        el: ".dollBar",
        type: "bullets",
        bulletElement: "li",
        bulletClass: "my-bullet",
        bulletActiveClass: "active",
        clickable: true
      },
      lazy: {
        loadPrevNext: true,
        loadingClass: "my-lazy-loading"
      }
    });
  }
};
</script>

<style lang="less">
.swiper-slide{
    height: 560px;
}
.myslide {
  position: absolute;
  z-index: 10;
  left: 50%;
  margin-left: -960px;
  width: 1920px;
  height: 560px;
  background-size: 100%;
  background-position: auto center;
  background-repeat: no-repeat;
}
.swiper-container-horizontal > .swiper-pagination-bullets.dollBar {
  width: 1200px;
  position: absolute;
  bottom: 110px;
  left: 50%;
  margin-left: -600px;
  z-index: 2;
  text-align: right;
  li {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #8c8c8c;
    margin-right: 10px;
    cursor: pointer;
    &.active {
      background-color: #f98603;
    }
  }
}
</style>