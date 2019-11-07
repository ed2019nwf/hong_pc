<template>
  <div class="bet-list">
    <el-table
      max-height="650"
      :loading="tableLoad"
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" prop="bill_no" label="订单号"></el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="{row}">{{row.bet_time }}</template>
      </el-table-column>
      <el-table-column align="center" label="平台">
        <template slot-scope="{row}">{{ row.platform }}</template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="{row}">{{ row.game_type }}</template>
      </el-table-column>
      <el-table-column align="center" label="下注金额">
        <template slot-scope="{row}">{{ row.valid_blance }}</template>
      </el-table-column>
      <el-table-column align="center" label="结果">
        <template slot-scope="{row}">{{ row.result }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getBetList } from "@/api";
export default {
  data() {
    return {
      list: [],
      tableLoad: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoad = true;
      getBetList().then(rep => {
        this.tableLoad = false;
        this.list = rep.data.list;
      });
    }
  }
};
</script>

<style scoped lang="less">
.bet-list {
  padding: 15px;
  .order-form {
    span {
      display: inline-block;
      margin-right: 10px;
      font-size: 16px;
      line-height: 40px;
    }
  }
}
</style>