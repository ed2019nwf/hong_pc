<template>
  <div class="index-tab">
    <div class="container tab-box" v-if="list.length">
      <div class="tab-box-left">
        <div
          class="left-image"
          :class="{'active':tabIndex === key}"
          v-for="(item,key) in list"
          :key="key"
        >
          <img
            :src="$imgUrl+item.banner"
          />
        </div>
        <ul class="tab-box-crren">
          <li
            @mousemove="choseItem(item,key)"
            @click="goUrl(item)"
            :class="{'active':tabIndex === key}"
            v-for="(item,key) in list"
            :key="key"
          >
            <img :src="$imgUrl+item.icon" alt />
            {{item.title}}
          </li>
        </ul>
      </div>
      <div class="tab-box-right">
        <ul
          class="tab-game-itembox"
          :class="{'active':tabIndex===key}"
          v-for="(item,key) in list"
          :key="key"
        >
          <li
            class="j-check"
            @click="openGame(value)"
            v-for="(value,key) in item.subgame"
            :key="key"
          >
            <span class="small-text-title">{{value.subject}}</span>
            <img :src="$imgUrl+value.pc_image" />
          </li>
        </ul>
      </div>
    </div>
    <!-- <a class="open-more" id="openMorePoker" href="javascript:;">更多</a> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {
    if (this.list.length) {
      this.sigleData = this.list[0].subgame;
    }
  },
  data() {
    return {
      tabIndex: 0,
      sigleData: null
    };
  },
  methods: {
    ...mapActions(["goGame"]),
    openGame(item) {
      this.goGame(item);
    },
    choseItem(val, key) {
      this.tabIndex = key;
      this.sigleData = val.subgame;
    },
    goUrl(item) {
      this.$router.push("/" + item.plattype);
    }
  }
};
</script>

<style scoped lang="less">
.index-tab {
  height: 480px;
  background-color: #f6f6f6;
  position: relative;
  min-width: 1200px;
  .tab-box {
    position: absolute;
    top: -100px;
    left: 50%;
    margin-left: -600px;
    .tab-box-left {
      width: 798px;
      position: relative;
      padding-top: 430px;
      box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
      background-color: #fff;
      .tab-box-crren {
        display: flex;
        li {
          flex: 1;
          position: relative;
          height: 90px;
          text-align: center;
          line-height: 90px;
          font-size: 20px;
          color: #333333;
          border-right: 1px solid #ebeaea;
          // text-align: left;
          cursor: pointer;
          img {
            position: absolute;
            left: 30px;
            top: 15px;
            display: block;
            width: 60px;
            height: 60px;
          }
          &.active {
            border-bottom: 5px solid #ff9900;
          }
        }
      }
      .left-image {
        width: 798px;
        height: 430px;
        position: absolute;
        top: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.6s;
        &.active {
          z-index: 1;
          opacity: 1;
        }
      }
    }
    .tab-box-right {
      width: 371px;
      position: absolute;
      right: 0;
      top: 0;

      .tab-game-itembox {
        position: absolute;
        top: 0;
        opacity: 0;
        transition: all 0.6s;
        height: 525px;
        &.active {
          z-index: 1;
          opacity: 1;
          .small-text-title {
            bottom: 0px;
            opacity: 1;
          }
        }
        li {
          display: block;
          cursor: pointer;
          width: 371px;
          height: 158px;
          margin-bottom: 23px;
          position: relative;
          transition: all 0.3s;
          bottom: 0;
          box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
          .small-text-title {
            color: rgb(51, 51, 51);
            position: absolute;
            bottom: -15px;
            left: 0px;
            width: 164px;
            height: 39px;
            line-height: 39px;
            font-size: 18px;
            background: url("../../../assets/img/wbox.png") no-repeat;
            text-align: left;
            padding-left: 10px;
            letter-spacing: 2px;
            opacity: 0;
            filter: alpha(opacity=0);
            transition: all 0.6s;
          }

          &:hover {
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
            bottom: 10px;
          }
        }
      }
    }
  }

  .open-more {
    position: absolute;
    top: 480px;
    left: 50%;
    margin-left: -72.5px;
    cursor: pointer;
    display: inline-block;
    height: 50px;
    width: 145px;
    text-align: center;
    line-height: 47px;
    color: #ff9900;
    font-size: 18px;
    border: 2px solid #ff9900;
    border-radius: 50px;
    padding-left: 3px;
  }
}
</style>

