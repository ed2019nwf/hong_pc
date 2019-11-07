<template>
  <div class="discont">
    <div class="banner">
      <div class="container">
        <Carousel></Carousel>
      </div>
    </div>
    <div class="discont-container">
      <div class="container">
        <ul class="discont-tab-title">
          <li @click="tabIndex = 0" :class="{'active':tabIndex === 0}">所有优惠</li>
          <li @click="tabIndex = 1" :class="{'active':tabIndex === 1}">棋牌游戏</li>
          <li @click="tabIndex = 2" :class="{'active':tabIndex === 2}">真人视讯</li>
          <li @click="tabIndex = 3" :class="{'active':tabIndex ===3}">体育游戏</li>
          <li @click="tabIndex = 4" :class="{'active':tabIndex ===4}">老虎机游戏</li>
          <li @click="tabIndex = 5" :class="{'active':tabIndex ===5}">捕鱼游戏</li>
          <li @click="tabIndex = 6" :class="{'active':tabIndex ===6}">彩票游戏</li>

          <!-- <li @click="tabIndex = 3" :class="{'active':tabIndex ===7}">电子游戏</li> -->


        </ul>
        <div class="discont-tab-list">
            <tab-view :list="list" :pageLoading="pageLoading"></tab-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActiveList } from "@/api";
export default {
  data() {
    return {
      tabIndex: 0,
      list: [],
      pageLoading: false
    };
  },
  methods: {},
  components: {
    Carousel: () => import("./common/Carousel"),
    TabView: () => import("./common/TabView")
  },
  watch: {
    tabIndex: {
      handler(val) {
        this.pageLoading = true;
        this.list = [];
        getActiveList({ platform: val }).then(res => {
          this.pageLoading = false;
          this.list = res.data;
        });
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
   .discont-tab-list ul li:last-child{
    margin-left:20px;
  }
</style>
<style scoped lang="less">
.discont {
  .banner {
    height: 450px;
    background: url(../../assets/img/new_banner_bg.jpg) center;
  }
  .discont-container {
    background-color: #f0ece8;
  }
  .discont-tab-title {
    position: absolute;
    top: -80px;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80px;
    background-color: #f1efec;
    border-radius: 10px 10px 0 0;
    border-bottom: 2px solid #dbd5cc;
    li {
      padding-top: 30px;
      cursor: pointer;
      text-align: center;
      font-size: 18px;
      width: 168px;
      height: 80px;
      color: #444444;
      line-height: 50px;
      background: url(../../assets/img/tab-off.png) no-repeat bottom left;
      &.active {
        color: #ffffff;
        background: url(../../assets/img/tab-on.png) no-repeat bottom left;
      }
    }
  }
  
}

</style>