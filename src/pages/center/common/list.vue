<template>
  <div class="setting">
    <ul class="my-tabs">
      <li class="tab-item" @click="tabClick(0)" :class="{'active':tabIndex === 0}">转账</li>
      <li class="tab-item" @click="tabClick(1)" :class="{'active':tabIndex === 1}">存款</li>
      <li class="tab-item" @click="tabClick(2)" :class="{'active':tabIndex === 2}">提现</li>
      <li class="tab-item" @click="tabClick(3)" :class="{'active':tabIndex === 3}">优惠</li>
      <li class="tab-item" @click="tabClick(4)" :class="{'active':tabIndex === 4}">下注记录</li>
    </ul>
    <div class="tabs-view" v-loading="pageLoading">
      <template v-if="list.length">
        <transfer v-if="tabIndex === 0" :list="list[0].list"></transfer>
        <deposit v-if="tabIndex === 1" :list="list[1].list"></deposit>
        <withdraw v-if="tabIndex === 2" :list="list[2].list"></withdraw>
        <active v-if="tabIndex === 3" :list="list[3].list"></active>
        <bet v-if="tabIndex === 4"></bet>
      </template>
    </div>
  </div>
</template>

<script>
import { getTransactionDetails } from "@/api";
export default {
  data() {
    return {
      tabIndex: 0,
      list: [],
      pageLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    tabClick(val) {
      this.tabIndex = val;
    },
    getList() {
      this.pageLoading = true;
      getTransactionDetails().then(res => {
        this.pageLoading = false;
        this.list = res.data;
        this.getUrlPar();
      });
    },
    getUrlPar() {
      let url = window.location.hash;
      if (url.indexOf("tab") < 0) return false;
      let par = url.substring(url.indexOf("tab") + 4);
      if (par) {
          this.tabIndex = parseInt(par);
      }
    }
  },
  components: {
    Transfer: () => import("./list/Transfer"),
    Deposit: () => import("./list/Deposit"),
    Withdraw: () => import("./list/Withdraw"),
    Active: () => import("./list/Active"),
    Bet: () => import("./list/Bet")
  }
};
</script>


<style lang="less" scoped>
</style>