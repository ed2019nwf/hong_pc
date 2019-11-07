<template>
  <div class="agent-list">
    <ul class="my-tabs">
      <li class="tab-item" :class="{'active':tabIndex === 0}" @click="tabIndex = 0">代理中心</li>
      <li class="tab-item" @click="tabIndex = 1" :class="{'active':tabIndex === 1}">客户报表</li>
    </ul>
    <div class="agent-container" v-if="tabIndex === 0">
      <div class="agent-info" v-if="info && line">
        <el-card class="agent-card" shadow="always">账户金额：{{info.balance}}</el-card>
        <el-card class="agent-card" shadow="always">代理代码：{{line.id}}</el-card>
        <el-card class="agent-card" shadow="always">活跃人数：{{info.active_number}}</el-card>
        <el-card class="agent-card" shadow="always">客户输赢：{{info.wins_loses}}</el-card>
      </div>
      <div class="agent-share">
        <el-card class="agent-card" shadow="always">
          分享链接：{{userUrl}}
          <el-button class="copy" @click="copy" :data-clipboard-text="userUrl" type="submit">复制</el-button>
        </el-card>
      </div>
      <div class="agent-table"></div>
    </div>

    <div class="agent-container" v-if="tabIndex === 1">
      <div class="agent-filter">
        <el-form ref="form" :model="form" :inline="true" label-width="80px" class="form-inline">
          <el-form-item label="用户名">
            <el-input v-model="form.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line text-center" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-button type="submit" @click="getTable" :loading="tableLoaing">查询</el-button>
        </el-form>
      </div>
      <el-table
        max-height="580"
        :data="agentList"
        border
        style="width: 100%"
        :loading="tableLoaing"
      >
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="balance" label="中心钱包余额"></el-table-column>
        <el-table-column align="center" prop="deposit" label="总存款"></el-table-column>
        <el-table-column align="center" prop="bonus" label="总红利"></el-table-column>
        <el-table-column align="center" prop="withdrawl" label="总提款"></el-table-column>
        <el-table-column align="center" prop="win_lose" label="输赢"></el-table-column>
        <el-table-column align="center" prop="valid_fee" label="有效投注额"></el-table-column>
        <el-table-column align="center" label="最后登录时间">
          <template slot-scope="{row}">{{row.login_times*1000 | formartTime("Y年M月D日")}}</template>
        </el-table-column>
        <el-table-column align="center" label="注册时间">
          <template slot-scope="{row}">{{row.register_time*1000 | formartTime("Y年M月D日")}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getAgentLine, getAgentInfo, getAgentList } from "@/api";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      info: null,
      line: null,
      userUrl: "",
      tabIndex: 0,
      agentList: [],
      form: {
        user: "",
        date1: "",
        date2: ""
      },
      tableLoaing: false
    };
  },
  mounted() {
    this.getLine();
    this.getInfo();
    this.getTable();
  },
  methods: {
    getLine() {
      getAgentLine().then(rep => {
        this.line = rep.data[0];
        this.userUrl = window.location.host + `?p=${this.line.id}`;
      });
    },
    getInfo() {
      getAgentInfo().then(rep => {
        this.info = rep.data;
      });
    },
    copy() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    getTable() {
      this.tableLoaing = true;
      getAgentList({
        username: this.form.user,
        begin_time: this.form.date1,
        end_time: this.form.date2
      })
        .then(rep => {
          this.tableLoaing = false;
          this.agentList = rep.data.data;
        })
        .catch(err => {
          this.tableLoaing = false;
        });
    }
  }
};
</script>
<style scoped lang="less">
.agent-container {
  padding: 30px;
  .agent-info {
    color: #2c3e50;
    font-size: 16px;
    display: flex;
    .agent-card {
      margin-right: 30px;
    }
  }
  .agent-share {
    width: 350px;
    margin-top: 30px;
    .el-button {
      margin-left: 15px;
    }
  }
}
</style>