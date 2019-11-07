<template>
  <el-dialog
    v-el-drag-dialog
    :visible.sync="loginVisible"
    class="login"
    width="450px"
    @closed="closeDialog"
  >
    <div class="login-title" slot="title">用户登录</div>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input v-model="form.username" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input v-model="form.password" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="sublogin" :loading="btnLogin" @click="goLogin">登录</el-button>
      <div class="login-footer-link">
        <el-button type="text" @click="goForget">忘记密码？</el-button>
        <el-button type="text" @click="goReg">立即注册</el-button>
        <!-- <router-link to="/forgetPwd"></router-link> -->
        <!-- <router-link to="/register">立即注册</router-link> -->
      </div>
    </div>
    <div class="dialog-tip"></div>
  </el-dialog>
</template>


<script>
import elDragDialog from "@/directive/el-drag-dialog";
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginPop",
  directives: { elDragDialog },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!/^(?=.*?[A-Za-z]+)(?=.*?[a-z]).*$/.test(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须大于六位数并含字母"));
      } else {
        callback();
      }
    };
    return {
      loginVisible: false,
      form: {
        username: "",
        password: ""
      },
      btnLogin: false,
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["login", "setLoginDialog"]),
    goForget() {
      // if (this.$route.path !== "/forgetPwd") {
      //   this.$router.push("/forgetPwd");
      //   this.setLoginDialog(false);
      // }
      this.$message.error("请联系客服！！")
    },
    goReg() {
      if (this.$route.path !== "/register") {
        this.$router.push("/register");
        this.setLoginDialog(false);
      }
    },
    goLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLogin = true;
          this.login({
            username: this.form.username,
            password: this.form.password
          })
            .then(res => {
              this.btnLogin = false;
              this.$message.success("登录成功");
              this.setLoginDialog(false);
              // console.log(this.$route.meta.roles === -1)
              if (this.$route.meta.roles === -1) {
                this.$router.push("/");
              }
            })
            .catch(err => {
              this.btnLogin = false;
            });
        }
      });
    },
    closeDialog() {
      this.setLoginDialog(false);
    }
  },
  computed: {
    ...mapState(["loginDialog"])
  },
  watch: {
    loginDialog: {
      handler(val) {
        this.loginVisible = val;
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="less">
.login {
  .login-title {
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
  .login-form {
    width: 300px;
    margin: 0 auto;
  }
  .svg-container {
    position: absolute;
    z-index: 10;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    text-align: center;
  }
  .login-footer-link {
    width: 300px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    .el-button--text {
      color: #feae65;
    }
  }
  .dialog-tip {
    position: absolute;
    bottom: -83px;
    left: 0;
    height: 83px;
    width: 450px;
    background:url(../../assets/img/login-under.png) no-repeat left top;
    background-size: 100%;
  }
}
</style>