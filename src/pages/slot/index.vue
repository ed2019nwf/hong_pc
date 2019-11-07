<template>
  <div class="slot">
    <div class="banner">
      <roll v-if="list.length"></roll>
    </div>
    <div class="slot-container">
      <div class="container">
        <div class="search-info-box">
          <div class="search-item">
            <p class="plat-title">游戏平台：</p>
            <ul class="plat-name">
              <li
                v-for="(item,key) in tabList"
                :key="key"
                :class="{'active':tabIndex === key}"
                @click="tabIndex = key"
              >{{item.name}}</li>
            </ul>
          </div>
        </div>
        <ul class="slot-list cfx" v-loading="!list.length">
          <li
            v-for="(item,index) in list"
            :key="index"
            @click="goGame({apiurl:tabList[tabIndex].url,type:item.game_type})"
          >
            <div class="pic">
              <img :src="item.pic" alt />
            </div>
            <p>{{item.memo}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getSlotList } from "@/api";
export default {
  data() {
    return {
      list: [],
      tabList: [
        {
          name: "MG",
          value: 0,
          url: "/v1/mg"
        },
        {
          name: "BBIN",
          value: 1,
          url: "/v1/bbin"
        }
      ],
      tabIndex: 0
    };
  },
  methods: {
    ...mapActions(["goGame"]),
    getList(val) {
      getSlotList({ platform: this.tabList[val].name }).then(rep => {
        this.list = rep.data.items;
      });
    }
  },
  watch: {
    tabIndex: {
      handler(val) {
        this.list = [];
        this.getList(val);
      },
      immediate: true
    }
  },
  components: {
    Roll: () => import("./common/roll")
  }
};
</script>

<style lang="less" scoped>
.slot {
  .banner {
    position: relative;
    height: 450px;
    background: url(../../assets/img/slotpage-banner.jpg) no-repeat center;
  }
  .slot-container {
    padding-top: 30px;
    background: #efe8de;
    .container {
      overflow: hidden;
    }
    .search-info-box {
      background-color: #f1efec;
      padding: 20px 15px;
      border-radius: 15px 15px 0 0;
      .search-item {
        display: flex;
        color: #666666;
        line-height: 35px;
        p {
          width: 70px;
        }
        .plat-name {
          display: flex;
          li {
            height: 35px;
            padding: 0 10px;
            margin-right: 10px;
            border-radius: 3px;
            cursor: pointer;
            &.active {
              color: #fff;
              background-color: #e99c3d;
            }
          }
        }
      }
    }
    .slot-list {
      padding: 30px 10px;
      min-height: 300px;
      background-color: #fff;
      margin-right: -30px;
      li {
        cursor: pointer;
        width: 120px;
        margin-right: 30px;
        text-align: center;
        margin-bottom: 20px;
        float: left;
        .pic {
          width: 120px;
          height: 120px;
          overflow: hidden;
        }
        img {
          transition: all 0.4s;
        }
        &:hover {
          img {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        p {
          color: #666666;
          font-size: 14px;
          line-height: 2;
          //   border-bottom: 1px solid #fff;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>