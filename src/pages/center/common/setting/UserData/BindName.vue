<template>
  <div class="bind-email">
    <el-form label-width="80px" ref="form" :rules="subRules" :model="form">
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="name">
        <el-input v-model="form.id" placeholder="请输入身份证号"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="submit" @click="sub" :loading="btnloading">确定</el-button>
  </div>
</template>

<script>
import { bindName } from "@/api";
import { mapActions } from "vuex";
export default {
  data() {
    function validateName(rule, value, callback) {
      if (!/^[\u4E00-\u9FA5]{2,4}$/.test(value)) {
        callback(new Error("姓名格式错误"));
      } else {
        callback();
      }
    }

    function validateId(rule, value, callback) {
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error("身份证输入不合法"));
      } else {
        callback();
      }
    }

    return {
      form: {
        name: "",
        id: ""
      },
      subRules: {
        name: [{ required: true, trigger: "blur", validator: validateName }],
        id: [{ required: true, trigger: "blur", validator: validateId }]
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
          bindName({ name: this.form.name, id: this.form.id })
            .then(res => {
              this.btnloading = false;
              this.$message.success("认证成功");
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