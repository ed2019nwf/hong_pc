<template>
  <div class="register">
    <div class="container box">
      <div class="register-body">
        <div class="register-title">
          <h2>注册宏博</h2>
          <div class="login-link fr">
            已有账号？
            <el-button type="text" @click="setLoginDialog(true)">请登录</el-button>
          </div>
        </div>

        <div class="register-min">
          <div class="register-form fl">
            <el-form
              ref="form"
              :model="form"
              :rules="loginRules"
              autocomplete="on"
              class="login-form"
              label-width="200px"
            >
              <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item prop="password" label="输入密码">
                <el-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item prop="password1" label="再次输入密码">
                <el-input
                  v-model="form.password1"
                  placeholder="请再次输入密码"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="推荐码">
                <el-input v-model="form.code" placeholder="推荐码" autocomplete="off"></el-input>
              </el-form-item>
              <div class="register-rule">
                <el-checkbox v-model="form.checked">我已阅读并同意</el-checkbox>
                <router-link to="/aboutUs?tab=0">《HongBet(宏博)用户协议》</router-link>
              </div>
              <div class="register-btn">
                <el-button :loading="btnLoading" type="register-btn" @click="sub">立即注册</el-button>
              </div>
            </el-form>
          </div>

          <div class="register-contright">
            <router-link to>
              <img src="https://www.lh5118.com/register/img/register-pic3.jpg" alt />
            </router-link>
            <p>领取8-88体验金</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!/^(?=.*?[A-Za-z]+)(?=.*?[a-z]).*$/.test(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须大于六位数并含字母"));
      } else {
        callback();
      }
    };
    let validatePassword1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须大于六位数并含字母"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      form: {
        username: "",
        password: "",
        password1: "",
        code: "",
        checked: false
      },
      btnLoading: false,
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePassword1 }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["setLoginDialog"]),
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.checked) {
            this.$message.error("请阅读协议并勾选~");
            return;
          }
          this.btnLoading = true;
          register({
            username: this.form.username,
            password: this.form.password1,
            invitationCode: this.form.code
          })
            .then(rep => {
              this.btnLoading = false;
              this.$store.commit("SET_TOKEN", rep.data.token);
              this.$message.success("注册成功");
              this.$router.push("/");
            })
            .catch(err => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.register {
  background-color: #444444;
  position: relative;
  color: #ddd;
  .box {
    min-height: 700px;
    .register-body {
      width: 1200px;
      position: absolute;
      top: 50%;
      margin-top: -282px;
      left: 50%;
      margin-left: -600px;
      background: #fff;
      font-size: 16px;
      line-height: 40px;
      border-radius: 10px;
      height: 550px;
      .register-title {
        padding: 0 40px;
        line-height: 80px;
        height: 80px;
        background-color: #f1efec;
        border-radius: 10px 10px 0 0;
        border-bottom: 2px solid #dbd5cc;
        margin-bottom: 50px;
        h2 {
          font-size: 30px;
          color: #666666;
          font-weight: normal;
          display: inline-block;
        }
        .login-link {
          font-size: 24px;
          color: #666;
        }
        .el-button--text {
          color: #e99c3d;
          font-size: 24px;
        }
      }

      .register-min {
        padding: 0 10px;

        .register-form {
          width: 520px;
          .register-rule {
            color: #666;
            font-size: 16px;
            margin-left: 180px;
            margin-bottom: 22px;
            a {
              color: #e99c3d;
            }
          }
          .register-btn {
            .el-button--register-btn {
              margin-left: 120px;
              background: #b03a34;
              font-size: 20px;
              line-height: 50px;
              padding: 0;
              height: 50px;
              color: #fff;
              width: 400px;
            }
          }
        }

        .register-contright {
          float: right;
          width: 410px;
          margin-right: 45px;
          a {
            display: block;
            img {
              width: 410px;
              height: auto;
            }
          }
          p {
            color: #fff;
            font-size: 24px;
            background-color: #e99c3d;
            height: 80px;
            text-align: center;
            line-height: 80px;
          }
        }
      }
    }
  }
}
</style>

<style>
.register-rule .el-checkbox__input.is-checked + .el-checkbox__label,
.register-rule .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  color: #e99c3d;
}
.register-rule .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #e99c3d;
  border-color: #e99c3d;
}
</style>