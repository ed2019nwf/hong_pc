<template>
  <div class="setting">
    <ul class="my-tabs">
      <li class="tab-item" @click="tabClick(0)" :class="{'active':tabIndex === 0}">个人资料</li>
      <li class="tab-item" @click="tabClick(1)" :class="{'active':tabIndex === 1}">修改登录密码</li>
      <li class="tab-item" @click="tabClick(2)" :class="{'active':tabIndex === 2}">修改提现密码</li>
      <li class="tab-item" @click="tabClick(3)" :class="{'active':tabIndex === 3}">绑定/解绑银行卡</li>
    </ul>
    
    <div class="tabs-view">
      <user-data v-if="tabIndex === 0"></user-data>
      <change-pwd v-if="tabIndex === 1"></change-pwd>
      <change-out-pwd v-if="tabIndex === 2"></change-out-pwd>
      <bank v-if="tabIndex === 3"></bank>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  mounted() {
    this.getUrlPar();
  },
  methods: {
    tabClick(val) {
      this.tabIndex = val;
    },
    getUrlPar() {
      let url = window.location.href;
      if (url.indexOf("tab") < 0) return false;
      let par = url.substring(url.indexOf("tab") + 4);
      if (par) {
          this.tabIndex = parseInt(par);
      }
    }
  },
  components: {
    UserData: () => import("./setting/UserData"),
    ChangePwd: () => import("./setting/ChangePwd"),
    ChangeOutPwd: () => import("./setting/ChangeOutPwd"),
    Bank: () => import("./setting/Bank")
  }
};
</script>


<style lang="less" scoped>
.tabs-view{
  padding-top: 15px;
}
</style>