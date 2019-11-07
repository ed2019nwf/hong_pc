<template>
  <div class="user-info">
    <div class="info-item">
      <div class="info-item-label">真实姓名：</div>
      <div class="info-item-value" v-if="userInfo.relname">{{userInfo.relname}}</div>
      <el-button type="text danger" v-if="!userInfo.relname" @click="openDialog('name')">立即绑定</el-button>
    </div>
    <div class="info-item">
      <div class="info-item-label">手机号：</div>
      <div class="info-item-value" v-if="userInfo.phone">{{userInfo.phone}}</div>
      <el-button type="text danger" v-if="!userInfo.phone" @click="openDialog('phone')">立即绑定</el-button>
    </div>
    <div class="info-item">
      <div class="info-item-label">邮箱：</div>
      <div class="info-item-value" v-if="userInfo.email">{{userInfo.email}}</div>
      <el-button type="text danger" v-if="!userInfo.email" @click="openDialog('email')">立即绑定</el-button>
    </div>
    <div class="info-item">
      <div class="info-item-label">身份证：</div>
      <div class="info-item-value" v-if="userInfo.id_number">{{userInfo.id_number}}</div>
      <el-button type="text danger" v-if="!userInfo.id_number" @click="openDialog('id')">立即绑定</el-button>
    </div>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="userVisible"
      class="login center"
      width="450px"
      :modal="false"
    >
      <div class="mydialog-title" slot="title">{{title}}</div>
      <bind-name v-if="type === 'name'|| type === 'id'" @closeDialog="closeDialog"></bind-name>
      <bind-email v-if="type === 'email'" @closeDialog="closeDialog"></bind-email>
      <bind-phone v-if="type==='phone'" @closeDialog="closeDialog"></bind-phone>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  data() {
    return {
      userVisible: false,
      title: "",
      type: ""
    };
  },
  directives: { elDragDialog },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    openDialog(parames) {
      if (parames === "email") {
        this.title = "绑定邮箱";
      }
      if (parames === "name" || parames === "id") {
        this.title = "实名认证";
      }
      if (parames === "phone") {
        this.title = "绑定手机";
      }
      this.type = parames;
      this.userVisible = true;
    },
    closeDialog() {
      this.userVisible = false;
    }
  },
  components: {
    BindName: () => import("./UserData/BindName"),
    BindEmail: () => import("./UserData/BindEmail"),
    BindPhone: ()=>import("./UserData/BindPhone")
  }
};
</script>

<style scoped lang="less">
.user-info {
  width: 300px;
  margin: 30px 0 30px 300px;
  .info-item {
    display: flex;
    color: #333333;
    font-size: 16px;
    line-height: 25px;
    div {
      padding: 12px 0;
    }
    .info-item-label {
      width: 100px;
      text-align: right;
    }
    .el-button.el-button--text {
      font-size: 16px;
      color: #e40200;
    }
  }
  .mydialog-title {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 60px;
    font-size: 25px;
    color: #fff;
    text-align: center;
  }
}
</style>