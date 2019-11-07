<template>
  <div class="bind-email">
    <el-form label-width="80px" ref="form" :rules="subRules" :model="form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="submit" @click="sub" :loading="btnloading">确定</el-button>
  </div>
</template>

<script>
import { bindEmail } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    function validateEmail(rule, value, callback) {
      if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    }
    return {
      form: {
        email: ""
      },
      subRules: {
        email: [{ required: true, trigger: "blur", validator: validateEmail }]
      },
      btnloading: false
    };
  },
  methods: {
    ...mapActions(["getInfo"]),
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnloading = true;
          bindEmail({ email: this.form.email })
            .then(res => {
              this.btnloading = false;
              this.$message.success("修改成功");
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
  }
};
</script>

<style scoped lang="less">
.bind-email {
  width: 350px;
  margin: 0 auto;
  padding-bottom: 20px;
  text-align: center;
}
</style>