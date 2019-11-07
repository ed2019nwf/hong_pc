<template>
  <div class="changepwd">
    <div class="my-form">
      <el-form label-width="110px" ref="form" :rules="subRules" :model="form">
        <el-form-item label="原提现密码" prop="oldPwd">
          <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧的资金密码"></el-input>
        </el-form-item>
        <el-form-item label="新提现密码" prop="newPwd">
          <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认提现密码" prop="newPwd1">
          <el-input v-model="form.newPwd1" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="submit" @click="sub" :loading="btnloading">确定</el-button>
    </div>
    <dl class="changepwd-note">
      <dt>温馨提示</dt>
      <dd>1.取款密码为6位纯数字。例如：123456。</dd>
      <dd>
        2.原取款密码为
        <b>登录密码</b>
        为了您的账户安全 请尽快修改新支付密码
      </dd>
      <dd>3.若忘记取款密码，请联系在线客服核实身份后重置取款密码。</dd>
    </dl>
  </div>
</template>
<script>
import { changeOutPwd } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    function validateOldPwd(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入原始提现密码"));
      } else {
        callback();
      }
    }
    function validatePwd(rule, value, callback) {
      if (value.length < 1) {
        callback(new Error("请输入新提现密码"));
      } else if (value.length < 6) {
        callback(new Error("密码格式错误"));
      } else {
        callback();
      }
    }

    let validatePwd1 = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请再次输入新提现密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次出入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      form: {
        oldPwd: "",
        newPwd: "",
        newPwd1: ""
      },
      btnloading: false,
      subRules: {
        oldPwd: [
          { required: true, trigger: "blur", validator: validateOldPwd }
        ],
        newPwd: [{ required: true, trigger: "blur", validator: validatePwd }],
        newPwd1: [{ required: true, trigger: "blur", validator: validatePwd1 }]
      }
    };
  },
  mounted() {},
  methods: {
    sub() {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.btnloading = true;
          changeOutPwd({
            oldithdrawalpassword: this.form.oldPwd,
            ithdrawalpassword: this.form.newPwd1
          })
            .then(res => {
              this.btnloading = false;
              this.$message.success("修改成功");
              this.$refs.form.resetField();
              this.form.oldPwd = "";
              this.form.newPwd = "";
              this.form.newPwd1 = "";
            })
            .catch(err => {
              this.btnloading = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.changepwd {
  position: relative;
  .my-form {
    width: 300px;
    margin-top: 30px;
    margin-left: 260px;
    text-align: center;
  }

  .el-form-item {
    height: 60px;
    margin-bottom: 0;
    overflow: hidden;
  }
  .changepwd-note {
    padding: 30px 60px;
    color: #b03a34;
    margin-top: 20px;
    border-top: 1px solid #d9d9d9;
    dt {
      font-size: 16px;
      margin-bottom: 15px;
    }
    dd {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
</style>