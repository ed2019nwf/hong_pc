<template>
  <div class="card">
    <div class="banner"></div>
    <div class="card-container">
      <div class="container" v-loading="!list.length">
        <ul class="card-list cfx" v-if="list.length>0">
          <li v-for="(item,index) in list" :key="index" @click="goGame(item)">
            <div class="pic">
              <img :src="$imgUrl+item.pc_image" alt />
            </div>
            <p>{{item.subject}}</p>
            <el-button type="submit">进入游戏</el-button>
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
            if (item.plattype === "lottery") {
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
.card {
  .banner {
    height: 450px;
    background: url(../../assets/img/banner-caipiao.jpg) no-repeat center;
  }
  .card-container {
    background: #efe8de;

    .card-list {
      padding: 30px 10px;
      min-height: 500px;
      background-color: #fff;
      li {
        padding: 10px;
        cursor: pointer;
        background-color: #f1efec;
        width: 270px;
        margin-right: 20px;
        text-align: center;
        margin-bottom: 20px;
        float: left;
        .pic {
          margin: 0 auto;
          width: 250px;
          height: 160px;
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
          font-size: 18px;
          line-height: 2;
          border-bottom: 1px solid #fff;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>