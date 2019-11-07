<template>
  <div class="my-menu">
    <ul class="user-center-nav">
      <li class="title" :class="{'active':activeGroup === 0}">
        <svg-icon icon-class="user-setting"></svg-icon>账户管理
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/setting">账户设置</router-link>
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/list">账户清单</router-link>
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/message">消息中心</router-link>
      </li>
      <li class="title" :class="{'active':activeGroup === 1}">
        <svg-icon icon-class="money-bag"></svg-icon>钱包中心
      </li>
      <li class="item active">
        <router-link active-class="active" to="/center/pay">充值</router-link>
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/withdraw">提现</router-link>
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/transfer">户内转账</router-link>
      </li>
      <li class="title" :class="{'active':activeGroup === 2}">
        <svg-icon icon-class="discount"></svg-icon>优惠专区
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/discount">我的红利</router-link>
      </li>
      <li class="title" :class="{'active':activeGroup === 3}">
        <svg-icon icon-class="agent"></svg-icon>代理中心
      </li>
      <li class="item">
        <router-link active-class="active" to="/center/agent">代理中心</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeGroup: 0
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.activeGroup = val.meta.group;
      },
      immediate: true
    }
  }
};
</script>


<style scoped lang="less">
.my-menu {
  width: 190px;
  float: left;
  height: 750px;
  background-color: #fff;
  margin-bottom: 20px;
  li {
    position: relative;
    text-align: center;
    color: #333333;
    background-color: #fff;
    display: block;
    width: 190px;
    height: 35px;
    position: relative;
    border-bottom: 1px solid #f1efec;
    border-top: 1px solid #fff;
    line-height: 35px;
    &.title {
      height: 50px;
      background-color: #e99c3d;
      padding-left: 5px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      svg {
        position: absolute;
        left: 25px;
        top: 13px;
        margin-right: 15px;
        font-size: 24px;
      }
      &.active{
        background-color: #b03a34;
      }
    }

    &.item {
      a {
        display: block;
        &.active::before {
          background-color: #e99c3d;
        }
        &::before {
          content: "";
          width: 4px;
          height: 33px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #dbd5cc;
        }
      }
    }
  }
}
</style>