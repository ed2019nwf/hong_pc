<template>
  <div class="header">
    <div class="container header-box">
      <div class="link-info">
        <router-link to="/download">下载APP</router-link>
        <!-- <router-link to>在线客服</router-link> -->
        <div class="marquee">
          <svg-icon icon-class="marquee" class="marquee-icon"></svg-icon>
          <Marquee></Marquee>
        </div>
      </div>
      <div class="header-right" v-if="!userInfo">
        <el-button type="login" @click="openLoginDialog">登&nbsp;录</el-button>
        <el-button type="register" @click="goReg">注&nbsp;册</el-button>
      </div>
      <ul class="header-right" v-if="userInfo">
        <li>
          欢迎回来：
          <span>{{userInfo.nickname}}</span>
        </li>
        <li>
          等级：
          <span>{{userInfo.level}}</span>
        </li>
        <li class="balance">
          余额：
          <span>{{userInfo.balance}}</span>&nbsp;
          <i
            class="el-icon-refresh"
            :class="{'loading':balanceLoding}"
            @click="refreshBalance"
          ></i>
        </li>
        <li>
          站内信：
          <router-link to="/center/message">{{userInfo.message}}</router-link>
        </li>
        <li>
          <el-button type="login" @click="goUrl('/center/pay')">充&nbsp;值</el-button>
        </li>
        <li>
          <router-link to="/center/transfer">转账</router-link>
          <router-link to="/center/withdraw">提现</router-link>
        </li>
        <li @click="goOut" class="out">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Marquee from "@/components/marquee";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Marquee
  },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      balanceLoding: false
    };
  },
  methods: {
    ...mapActions(["setLoginDialog", "getInfo", "out"]),
    goReg() {
      if (this.$route.path !== "/register") this.$router.push("/register");
    },
    openLoginDialog() {
      this.setLoginDialog(true);
    },
    goUrl(url) {
      this.$router.push(url);
    },
    refreshBalance() {
      if (this.balanceLoding === true) return false;
      this.balanceLoding = true;
      this.getInfo()
        .then(() => {
          this.balanceLoding = false;
        })
        .catch(err => {
          this.balanceLoding = false;
        });
    },
    goOut() {
      this.out().then(res => {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        this.$message.success("退出成功");
      });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 60px;
  background: #2e2e2e;
  position: relative;
  .header-box {
    display: flex;
    .link-info {
      height: 60px;
      display: flex;
      align-items: center;
      .marquee {
        position: relative;
        width: 335px;
        height: 35px;
        background-color: #333333;
        margin-left: 20px;
        padding-left: 50px;
        .marquee-icon {
          position: absolute;
          left: 15px;
          top: 7px;
          font-size: 20px;
        }
      }
      a {
        position: relative;
        font-size: 14px;
        padding: 0 10px;
        display: inline-block;
        line-height: 1.5;
        color: #959595;
        &::after {
          content: "";
          width: 1px;
          height: 9px;
          background-color: #605f5f;
          position: absolute;
          right: 0px;
          top: 6px;
        }
      }
    }
    .header-right {
      flex: 1;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        margin-left: 12px;
        span {
          color: #fb9b08;
        }
        &.balance {
          background-color: #201e1a;
          padding: 5px 8px;
          border-radius: 5px;
          i {
            cursor: pointer;
            &.loading {
              animation: refRotate 1s infinite;
            }
          }
        }
        a {
          color: #fb9b08;
          display: inline-block;
          position: relative;
          padding-left: 10px;
          &:first-child {
            padding-right: 10px;
            padding-left: 0;
            &::before {
              content: "";
              width: 1px;
              height: 9px;
              background-color: #605f5f;
              position: absolute;
              right: 0;
              top: 8px;
            }
          }
        }
        &.out {
          cursor: pointer;
        }
      }
    }
  }
}

@keyframes refRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>