<template>
  <div class="transfer-details">
    <!-- <el-form :inline="true" :model="form" class="order-form">
      <el-form-item>
        <el-select v-model="form.genre" placeholder="类型">
          <el-option
            v-for="(val,index) in selectLsit"
            :key="index"
            :label="val.name"
            :value="val.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <span class="tip" style="margin-left:30px">从</span>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.startTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <span class="tip">到</span>
      <el-form-item>
        <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-button type="submit" style="margin-left:25px" @click="getList">查询</el-button>
    </el-form>-->
    <el-table max-height="650" :data="list" border style="width: 100%" stripe>
      <el-table-column align="center" prop="order_id" label="订单号"></el-table-column>
      <el-table-column align="center" label="投注时间">
        <template slot-scope="{row}">{{ row.create_time }}</template>
      </el-table-column>
      <el-table-column align="center" label="投注内容">
        <template slot-scope="{row}">{{ row.content }}</template>
      </el-table-column>
      <el-table-column align="center" label="投资金额">
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