<template>
  <div class="transfer-details">
    <el-table
      max-height="650"
      :data="list"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column align="center" prop="order_id" label="订单号"></el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="{row}">{{ row.create_time }}</template>
      </el-table-column>
      <el-table-column align="center" label="详情">
        <template slot-scope="{row}">{{ row.content }}</template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="{row}">{{ row.money }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{row}">{{ row.status|changeStatus }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTransactionDetails } from "@/api";
export default {
  props: ["list"]
};
</script>

<style scoped lang="less">
.transfer-details {
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