<template>
  <div class="sport">
    <div class="banner"></div>
    <div class="sport-container">
      <div class="container" v-loading="!list.length">
        <ul class="sport-list cfx" v-if="list.length>0">
          <li v-for="(item,index) in list" :key="index" @click="goGame(item)">
            <div class="pic">
              <!-- 843*340 -->
              <img :src="$imgUrl+item.pc_image" alt />
            </div>
            <div class="sport-btn">
              <h2>{{item.subject}}</h2>
              <h3>体育赛事投注</h3>
              <p>提供最专业的体育平台，</p>
              <p>每月提供5000场精采体育赛事！</p>
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
            if (item.plattype === "sport") {
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
.sport {
  .banner {
    height: 450px;
    background: url(../../assets/img/sportpage-banner.jpg) no-repeat center;
  }
  .sport-container {
    background: #efe8de;
    min-height: 500px;
    .sport-list {
      padding: 30px 10px;
      min-height: 500px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-right: -20px;
      li {
        cursor: pointer;
        background-color: #dbd5cc;
        width: 100%;
        height: 340px;
        display: flex;
        text-align: center;
        margin-bottom: 20px;
        margin-right: 20px;
        .pic {
          width: 843px;
          height: 340px;
          overflow: hidden;
        }
        img {
          transition: all 0.4s;
        }
        &:hover {
          background-color: #e89c3e;
          h2{
              color: #ffffff;
          }
          p {
            color: #ffffff;
          }
          //   img {
          //     width: 910px;
          //     height: 110%;
          //     margin-left: -5%;
          //     margin-top: -2.5%;
          //   }
          .el-button.el-button--submit {
            background-color: #b13a34;
            box-shadow: none;
            border-color: transparent;
          }
        }
        .sport-btn {
          padding: 10px 15px;
          flex: 1;
          h2 {
            font-size: 50px;
            font-weight: bold;
          }
          h3 {
            color: #b13a34;
            font-size: 36px;
            margin-bottom: 20px;
          }
          p{
              text-align: center;
              margin: 0;
          }
          .el-button{
              margin-top: 20px;
          }
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
        flex: 1;
      }
    }
  }
}
</style>