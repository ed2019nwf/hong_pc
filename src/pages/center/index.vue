<template>
  <div class="center">
    <div class="container">
      <div class="ucen-h"></div>
      <!-- <div class="ucen-top">
        用户名：{{userInfo.username}}
        总金额：{{userInfo.balance}}
        等级：{{userInfo.level}}

      </div> -->
      <div class="ucen-m cfx">
        <side-bar></side-bar>
        <div class="router-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./common/sidebar";
import { mapState } from "vuex";
export default {
  components: {
    SideBar
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style scoped lang="less">
.center {
  background-color: #efe8de;
  .ucen-h {
    height: 190px;
    background: url("https://www.lh5118.com/images/user/banner/ckwy.jpg")
      no-repeat left top;
  }
  .ucen-top {
    margin-top: 15px;
    height: 100px;
    background-color: #ffffff;
  }
  .ucen-m {
    position: relative;
    margin-top: 15px;
    .router-view {
      margin-left: 225px;
      min-height: 750px;
      background-color: #ffffff;
    }
  }
}
</style>