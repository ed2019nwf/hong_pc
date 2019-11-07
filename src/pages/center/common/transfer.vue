<template>
  <div class="transfer">
    <ul class="my-tabs">
      <li class="tab-item active">户内转账</li>
    </ul>
    <div class="transfer-container">
      <el-form label-width="120px" ref="form" :rules="subRules" :model="form" class="transfer-form">
        <el-form-item label="来源账户:" prop="out">
          <el-select style="width:230px" :loading="pageLoading" v-model="form.in" placeholder="请选择">
            <el-option
              v-for="(item,index) in list"
              :key="index"
              :label="item.memo"
              :value="item.conf_id"
            >
              <span style="float:left;color: #333333; font-size: 12px">{{item.memo}}</span>
              <span
                style="float: right;margin-left:15px; color: #b03a34; font-size: 12px"
              >{{item.balance}}元</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标账户:" prop="in">
          <el-select style="width:230px" :loading="pageLoading" v-model="form.out" placeholder="请选择">
            <el-option
              v-for="(item,index) in list"
              :key="index"
              :label="item.memo"
              :value="item.conf_id"
            >
              <span style="float:left;color: #333333; font-size: 12px">{{item.memo}}</span>
              <span
                style="float: right;margin-left:15px; color: #b03a34; font-size: 12px"
              >{{item.balance}}元</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转账金额:" prop="money">
          <el-input v-model="form.money" @input="vaildMoney($event)" placeholder="请输入转账金额"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="submit" :loading="btnLoading" @click="sub">确定</el-button>
        </div>
      </el-form>
    </div>
    <div class="transfer-note">
      <dl>
        <dt>温馨提示：</dt>
        <dd>1.请在户内转账前进行平台激活，方可转账成功。</dd>
        <dd>2.户内转账只支持整数转账。</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import { getPlatForm, transferPlat } from "@/api";
export default {
  data() {
    let validateIn = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error("请选择"));
      } else if (value === this.form.out) {
        callback(new Error("转入转出来源不能一致"));
      } else {
        callback();
      }
    };
    let validateOut = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error("请选择"));
      } else if (value === this.form.in) {
        callback(new Error("转入转出来源不能一致"));
      } else {
        callback();
      }
    };
    let validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入金额"));
      } else if (!/^\d{0,}$/.test(value)) {
        callback(new Error("金额格式错误"));
      } else {
        callback();
      }
    };
    return {
      form: {
        money: "",
        out: "",
        in: ""
      },
      list: [],
      subRules: {
        in: [{ required: true, trigger: "blur", validator: validateIn }],
        out: [{ required: true, trigger: "blur", validator: validateOut }],
        money: [{ required: true, trigger: "blur", validator: validateMoney }]
      },
      pageLoading: false,
      btnLoading: false
    };
  },
  mounted() {
    this.resetData();
  },
  methods: {
    vaildMoney(e) {
      this.form.money = e.replace(/[^\d]/g, "");
    },
    resetData() {
        this.pageLoading = true;
      getPlatForm().then(rep => {
        this.pageLoading = false;
        this.list = rep.data;
      }).catch(err=>{
        this.pageLoading = false;
        this.$message.error(err)
      });
    },
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          transferPlat({
            in: this.form.in,
            out: this.form.out,
            money: this.form.money
          })
            .then(rep => {
              this.btnLoading = false;
              this.$message.success("转账成功");
              this.form.in = "";
              this.form.out = "";
              this.form.money = "";
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
.transfer {
  .transfer-container {
    margin-left: 250px;
    padding-top: 80px;
    width: 450px;
    .el-form-item {
      padding-right: 100px;
      height: 60px;
      margin-bottom: 0;
      overflow: hidden;
    }
    .money-tip {
      width: 100px;
      position: absolute;
      right: -105px;
      top: 0;
      color: #b03a34;
    }
  }
  .transfer-note {
    margin-top: 150px;
    border-top: 1px solid #d9d9d9;
    dl {
      margin-left: 30px;
      padding: 30px;
      dt {
        font-size: 16px;
        color: #b03a34;
        margin-bottom: 10px;
      }
      dd {
        line-height: 2.2;
        font-size: 14px;
        color: #b03a34;
      }
    }
  }
}
</style>