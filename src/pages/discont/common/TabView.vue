<template>
  <div class="tab-view" v-loading="pageLoading">
    <ul>
      <li v-for="(item,index) in list" :key="index" @click="getSigleData(item)">
        <div class="pic">
          <img :src="item.cover" alt />
        </div>
        <div class="promotion-desc">
          <h2 class="promotion-tit">{{item.title}}</h2>
          <el-button type="submit">查看详情</el-button>
        </div>
      </li>
    </ul>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="discontVisible"
      class="login discount-dialog"
      width="600px"
      :modal="false"
      v-if="item"
    >
      <div class="discount-dialog-title" slot="title">
        <img :src="item.banner_img" draggable="false" />
      </div>
      <div class="dis-dia-top">
        <h2>{{item.title}}</h2>
        <p>截至日期：{{(item.end_time*1000) | formartTime("Y年M月D日")}}</p>
      </div>
      <div class="dis-dia-box" v-html="item.content"></div>
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    directives: { elDragDialog },
    pageLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      item: null,
      discontVisible: false
    };
  },
  methods: {
    getSigleData(val) {
      this.discontVisible = true;
      this.item = val;
    }
  }
};
</script>
<style scoped lang="less">
.tab-view {
  min-height: 500px;
  padding: 30px;
  background-color: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      padding: 10px;
      background-color: #f1efec;
      width: 340px;
      text-align: center;
      margin-bottom: 30px;
      cursor: pointer;
      .pic {
        padding: 0 10px;
        overflow: hidden;
      }
      img {
        width: 100%;
        transition: all .4s;
      }
      &:hover{
          img{
              transform: scale(1.1);
              opacity: .8;
          }
      }
    }
    &:after {
      content: "";
      width: 360px;
    }
    .promotion-desc {
      h2 {
        margin-bottom: 10px;
        font-size: 16px;
        color: #333;
        height: 32px;
        text-align: center;
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
  .discount-dialog-title {
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .dis-dia-box {
    height: 400px;
    overflow-y: auto;
    padding: 15px 0;
  }
}
</style>