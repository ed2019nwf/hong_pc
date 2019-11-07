<template>
  <div class="live">
    <div class="banner"></div>
    <div class="live-container">
      <div class="container" v-loading="!list.length">
        <ul class="live-list cfx" v-if="list.length>0">
          <li v-for="(item,index) in list" :key="index" @click="goGame(item)">
            <div class="pic">
              <!-- 370*240 -->
              <img :src="$imgUrl+item.pc_image" alt />
            </div>
            <div class="live-btn">
              <p>{{item.subject}}</p>
              <el-button type="submit">进入游戏</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState(["gameList"])
  },
  methods:{
    ...mapActions(["goGame"])
  },
  watch: {
    gameList: {
      handler(val) {
        if (val.length > 0) {
          val.forEach(item => {
            if (item.plattype === "live") {
              this.list = item.list;
            }
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.live {
  .banner {
    height: 450px;
    background: url(../../assets/img/livepage-banner.jpg) no-repeat center;
  }
  .live-container {
    background: #efe8de;
    min-height: 500px;
    .live-list {
      padding: 30px 10px;
      min-height: 500px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-right: -20px;
      li {
        cursor: pointer;
        background-color: #dbd5cc;
        width: 370px;
        height: 305px;
        text-align: center;
        margin-bottom: 20px;
        margin-right: 20px;
        .pic {
          margin: 0 auto;
          width: 370px;
          height: 240px;
          overflow: hidden;
        }
        img {
          transition: all 0.4s;
        }
        &:hover {
          background-color: #e89c3e;
          p {
            color: #ffffff;
          }
          img {
            transform: scale(1.1);
            opacity: 0.8;
          }
          .el-button.el-button--submit {
            background-color: #b13a34;
            box-shadow: none;
            border-color: transparent;
          }
        }
        .live-btn{
            padding: 10px 15px;
            display: flex;
            justify-content: space-between
        }
        p {
          color: #666666;
          font-size: 18px;
          line-height: 2;
          text-align: center;
          margin-bottom: 10px;
        }
      }
      &:after {
        width: 380px;
      }
    }
  }
}
</style>