<template>
  <div class="changepwd">
    <el-form label-width="80px" ref="form" :rules="subRules" :model="form">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="form.oldPwd" type="password" placeholder="请输入原始密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPwd1">
        <el-input v-model="form.newPwd1" type="password" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="submit" @click="sub" :loading="btnloading">确定</el-button>
  </div>
</template>
<script>
import { changePwd } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    function validateOldPwd(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入原始密码"));
      } else {
        callback();
      }
    }
    function validatePwd(rule, value, callback) {
      if (value.length < 1) {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6) {
        callback(new Error("密码格式错误"));
      } else {
        callback();
      }
    }

    let validatePwd1 = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请输入新密码"));
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
          changePwd({ oldpassword: this.form.oldPwd, newpassword: this.form.newPwd1 })
            .then(res => {
              this.btnloading = false;
              this.$message.success("修改成功,请重新登录");
              this.$store.commit("CLEAR_DATA");
              this.$router.push("/");
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
  width: 300px;
  margin-top: 30px;
  margin-left: 300px;
  text-align: center;
  .el-form-item {
    height: 60px;
    margin-bottom: 0;
    overflow: hidden;
  }
}
</style>