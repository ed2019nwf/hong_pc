<template>
  <div class="message">
    <ul class="my-tabs">
      <li class="tab-item" @click="tabIndex=0" :class="{'active':tabIndex === 0}">全部</li>
      <li class="tab-item" @click="tabIndex=1" :class="{'active':tabIndex === 1}">已读</li>
      <li class="tab-item" @click="tabIndex=2" :class="{'active':tabIndex === 2}">未读</li>
    </ul>
    <div class="message-box">
      <!-- 全部 -->
      <el-table
        border
        :data="list"
        v-if="tabIndex === 0"
        @cell-click="checkMsg"
        :loading="pageLoading"
      >
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read ===0" class="message-status">
              <i></i>未读
            </span>
            <span v-if="scope.row.is_read ===1" class="message-status">已读</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span
              style="margin-left:10px"
            >{{(scope.row.create_time*1000) | formartTime("Y年M月D日 h:m:s")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            <span class>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click.stop="delMsg(scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 已读 -->
      <el-table border :data="read" v-if="tabIndex === 1" :loading="pageLoading">
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read ===0" class="message-status">
              <i></i>未读
            </span>
            <span v-if="scope.row.is_read ===1" class="message-status">已读</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span
              style="margin-left:10px"
            >{{(scope.row.create_time*1000) | formartTime("Y年M月D日 h:m:s")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" align="center" prop="content"></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delMsg(scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 未读 -->
      <el-table border :data="noread" v-if="tabIndex === 2" :loading="pageLoading">
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read ===0" class="message-status">
              <i></i>未读
            </span>
            <span v-if="scope.row.is_read ===1" class="message-status">已读</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span
              style="margin-left:10px"
            >{{(scope.row.create_time*1000) | formartTime("Y年M月D日 h:m:s")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" align="center" prop="content"></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delMsg(scope.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        v-el-drag-dialog
        :visible.sync="userVisible"
        class="login center"
        width="450px"
        :modal="false"
      >
        <div class="message-title" slot="title">我的消息</div>
        <div class="message-content">{{sigleData.content}}</div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMessage, readMessage, delMessage } from "@/api";
import elDragDialog from "@/directive/el-drag-dialog";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      list: [],
      noread: [],
      read: [],
      tabIndex: 0,
      pageLoading: false,
      userVisible: false,
      sigleData: ""
    };
  },
  directives: { elDragDialog },
  mounted() {
    this.reset();
  },
  methods: {
    ...mapActions(["getInfo"]),
    checkMsg(row) {
      //   console.log(row);
      this.userVisible = true;
      this.sigleData = row;
      if (row.is_read === 0) {
        readMessage({ id: row.id }).then(rep => {
          this.reset();
          this.getInfo();
        });
      }
    },
    delMsg(row) {
      delMessage({ id: row.id }).then(rep => {
        this.reset();
      });
    },
    reset() {
      this.pageLoading = true;
      getMessage({ page: 1, page_size: 20, is_read: -1 }).then(rep => {
        this.pageLoading = false;
        this.list = rep.data.message;
        
      });
    }
  },
  watch: {
    list(val) {
      this.noread = [];
      this.read = [];
      val.forEach(element => {
        if (element.is_read === 0) {
          this.noread.push(element);
        } else {
          this.read.push(element);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.message {
  .message-box {
    padding: 20px;
    min-height: 300px;
  }
}
.message-title {
  text-align: center;
  color: #ffffff;
  font-size: 18px;
}
.message-content {
  padding-bottom: 20px;
}
.message-status {
  display: inline-block;
  position: relative;
  i {
    position: absolute;
    left: -5px;
    top: 5px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #f56c6c;
  }
}
</style>
<style>
.el-table__row {
  cursor: pointer;
}
</style>