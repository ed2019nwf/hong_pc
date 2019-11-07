<template>
  <div class="bind-email">
    <el-form label-width="80px" ref="form" :rules="subRules" :model="form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" :disabled="codeTitle<60" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="code">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        <el-button
          class="send-code"
          @click="sendCode"
          :disabled="codeTitle < 60"
          :loading="btnloading1"
        >{{codeTitle === 60?'发送验证码':codeTitle+'s再次发送'}}</el-button>
      </el-form-item>
    </el-form>
    <p class="info" v-if="codeTitle<60">{{info}}</p>
    <el-button type="submit" @click="sub" :loading="btnloading">确定</el-button>
  </div>
</template>

<script>
import { sendPhoneCode, bindPhone } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    function validatePhone(rule, value, callback) {
      if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        callback(new Error("手机格式错误"));
      } else {
        callback();
      }
    }

    return {
      form: {
        phone: "",
        code: ""
      },
      subRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }]
      },
      btnloading: false,
      btnloading1: false,
      codeTitle: 60,
      timer: null,
      info: ""
    };
  },
  methods: {
    ...mapActions(["getInfo"]),
    sendCode() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnloading1 = true;
          sendPhoneCode({ phone: this.form.phone }).then(res => {
            this.btnloading1 = false;
            this.info = res.info;
            this.codeTitle--;
            this.timer = setInterval(() => {
              this.codeTitle -= 1;
              if (this.codeTitle < 1) {
                clearInterval(this.timer);
                this.timer = null;
                this.codeTitle = 60;
              }
            }, 1000);
          }).catch(err=>{
              this.btnloading1 = false;
          });
        }
      });
    },

    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.code) {
            this.$message.error("请输入验证码");
            return;
          }
          this.btnloading = true;
          bindPhone({ phone: this.form.phone, code: this.form.code })
            .then(res => {
              this.btnloading = false;
              this.$message.success("绑定成功");
              this.getInfo().then(() => {
                this.$emit("closeDialog");
              });
            })
            .catch(err => {
              this.btnloading = false;
            });
        }
      });
    }
  },
  beforeDestroy(){
      this.timer=null;
      clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.bind-email {
  width: 350px;
  margin: 0 auto;
  padding-bottom: 20px;
  text-align: center;
  .el-form-item.code {
    text-align: left;
    .el-input {
      width: 150px;
    }
    .send-code {
      float: right;
      width: 112px;
    }
  }
  .info {
    text-align: left;
    margin: -10px 0 15px 80px;
    color: #b03a34;
  }
}
</style>