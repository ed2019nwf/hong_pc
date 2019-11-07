<template>
  <div class="nav">
    <div class="container nav-box">
      <div class="nav-left">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt />
        </router-link>
      </div>
      <ul class="nav-right">
        <li>
          <router-link to="/" active-class="active" exact>
            <span class="index-new-nav">首页</span>
            <span class="nav-en">HOME</span>
          </router-link>
        </li>
        <li v-for="(item,index) in gameList" :key="index">
          <router-link :to="'/'+item.plattype" active-class="active">
            <span class="index-new-nav">{{item.title}}</span>
            <span class="nav-en">{{item.plattype.toUpperCase()}}</span>
          </router-link>
          <ul class="nav-slider-list-box" :class="item.plattype">
            <li
              class="nav-slider-list-item j-check"
              v-for="(val,key) in item.list"
              :key="key"
              @click="goGame(val)"
            >
              <span class="hoticon"></span>
              {{val.subject}}
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/discont" active-class="active">
            <span class="index-new-nav">优惠</span>
            <span class="nav-en">HOME</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["gameList"])
  },
  mounted() {},
  methods: {
    ...mapActions(["goGame"])
  }
};
</script>

<style lang="less" scoped>
.nav {
  background-color: #2e2e2e;
  display: flex;
  align-items: center;
  min-width: 1200px;
  .nav-box {
    display: flex;
    z-index: 99;
    .nav-left {
      display: flex;
      align-items: center;
    }
    .nav-right {
      flex: 1;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        position: relative;
        > a {
          padding: 19px 35px;
          height: 88px;
          position: relative;
          display: flex;
          flex-direction: column;
          &.active {
            // background: linear-gradient(to bottom, #ffe5c0, #efe8de);
            .index-new-nav {
              color: #feae65;
            }
            .nav-en {
              color: #feae65;
            }
            &::before {
              display: block;
            }
            &::after {
              display: block;
            }
          }

          &:hover {
            // background: linear-gradient(to bottom, #ffe5c0, #efe8de);

            .index-new-nav {
              color: #feae65;
            }
            .nav-en {
              color: #feae65;
            }
            &::before {
              display: block;
            }
            &::after {
              display: block;
            }
          }

          .index-new-nav {
            display: block;
            font-size: 20px;
            color: #ffffff;
          }
          .nav-en {
            color: ffffff;
            font-size: 10px;
          }
          &::before {
            content: "";
            display: none;
            position: absolute;
            width: 60px;
            height: 6px;
            background-color: #ff9900;
            bottom: 0;
            left: 50%;
            margin-left: -30px;
          }
          &::after {
            content: "";
            display: none;
            position: absolute;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #ff9900;
            border-left: 10px solid transparent;
            border-top: 10px solid transparent;
            bottom: 5px;
            left: 50%;
            margin-left: -10px;
          }
        }
        .nav-slider-list-box {
          position: absolute;
          left: -12px;
          z-index: 10;
          width: 135px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #c6c6c6;
          font-size: 15px;
          padding: 10px 0;
          // opacity: 0;
          transform: rotateY(90deg);
          transition: all 0.4s;
          &.live,&.lottery{
            li{
              padding: 10px 7px;
            }
          }
          li {
            float: left;
            width: 135px;
            padding: 10px 20px;
            position: relative;
            cursor: pointer;
            &:hover {
              color: #ff9900;
            }
            span.hoticon {
              display: inline-block;
              content: "";
              width: 11px;
              height: 11px;
              background: url(../../assets/img/hot.png) no-repeat;
              background-size: 100%;
              margin-right: 3px;
            }
          }
        }
        &:hover {
          .nav-slider-list-box {
            opacity: 1;
            filter: alpha(opacity=100);
            transform: rotateY(0);
          }
        }
      }
    }
  }
}
</style>