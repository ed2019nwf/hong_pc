<template>
  <div class="discount" v-loading="pageLoading">
    <ul class="my-tabs">
      <li class="tab-item" @click="tabIndex = 0" :class="{'active':tabIndex === 0}">可领红利</li>
      <li class="tab-item" @click="tabIndex = 1" :class="{'active':tabIndex === 1}">已领红利</li>
    </ul>
    <div class="discount-container">
      <ul class="discount-list1" v-if="tabIndex === 0">
        <li v-for="(item,index) in drawList" :key="index" @click="choseDiscount(item)">
          <div class="d-img">
            <img :src="item.cover" />
          </div>
          <div class="d-right">
            <h2>{{item.title}}</h2>
            <p>截至日期：{{(item.end_time*1000) | formartTime("Y年M月D日")}}</p>
            <p>{{item.platform_name}}</p>
          </div>
        </li>
      </ul>
      <ul class="discount-list1" v-if="tabIndex === 1">
        <li v-for="(item,index) in mylist" :key="index" @click="choseDiscount(item)">
          <div class="d-img">
            <img :src="item.cover" />
          </div>
          <div class="d-right">
            <h2>{{item.title}}</h2>
            <p>截至日期：{{(item.end_time*1000) | formartTime("Y年M月D日")}}</p>
            <p>{{item.platform_name}}</p>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogVisible"
      class="login discount-dialog"
      width="600px"
      :modal="false"
      v-if="sigleData"
    >
      <div class="discount-dialog-title" slot="title">
        <img :src="sigleData.banner_img" draggable="false" />
      </div>
      <div class="dis-dia-top">
        <h2>{{sigleData.title}}</h2>
        <p>截至日期：{{(sigleData.end_time*1000) | formartTime("Y年M月D日")}}</p>
      </div>
      <div class="dis-dia-box" v-html="sigleData.content"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getBonus } from "@/api";
import elDragDialog from "@/directive/el-drag-dialog";

export default {
  data() {
    return {
      tabIndex: 0,
      pageLoading: false,
      list: [],
      dialogVisible: false,
      sigleData: null,
      drawList:[],
      mylist:[]
    };
  },
  directives: { elDragDialog },
  mounted() {
    this.getList();
  },
  methods: {
    choseDiscount(item) {
      this.dialogVisible = true;
      this.sigleData = item;
    },
    getList() {
      this.pageLoading = true;
      getBonus().then(res => {
        this.pageLoading = false;
        this.list = res.data;
      });
    }
  },
  watch:{
    list(val){
      val.forEach(element => {
          if(element.vaild === 0){
            this.drawList.push(element)
          }else{
            this.mylist.push(element)
          }
      });
    }
  }
};
</script>

<style scoped lang="less">
.discount-container {
  height: 690px;
  overflow-y: auto;
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
.dis-dia-top {
  h2 {
    font-size: 40px;
    color: #333333;
    font-weight: bold;
  }
}
.dis-dia-box {
  height: 400px;
  overflow-y: auto;
  padding: 15px 0;
}
.discount-list1 {
  padding: 30px;
  li {
    display: flex;
    background-color: #f1efec;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 30px;
    cursor: pointer;
    .d-right {
      margin-left: 30px;
    }
    h2 {
      font-size: 17px;
      color: #666;
      margin-bottom: 12px;
    }
    p {
      color: #666;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
}
</style>