<template>
  <div class="withdraw">
    <ul class="my-tabs">
      <li class="tab-item active">提现</li>
    </ul>
    <div class="withdraw-container">
      <el-form label-width="120px" ref="form" :rules="subRules" :model="form" class="withdraw-form">
        <el-form-item label="银行卡:">
          <el-select style="width:230px" v-model="form.card" placeholder="请选择">
            <el-option
              v-for="(item,index) in cardList"
              :key="index"
              :label="item.bank_name"
              :value="item.id"
            >
              <span style="float:left;color: #333333; font-size: 12px">{{item.bank_name}}</span>
              <span
                style="float: right;margin-left:15px; color: #8492a6; font-size: 12px"
              >{{item.card_number}}</span>
            </el-option>
          </el-select>
          <el-button
            type="text"
            @click="()=>{$router.push('/center/setting?tab=3')}"
            class="withdraw-add-btn"
          >添加银行卡</el-button>
          <!-- <el-input v-model="form.money" @input="vaildMoney($event)" placeholder="请输入充值金额"></el-input> -->
        </el-form-item>
        <el-form-item label="金额:" prop="money">
          <el-input v-model="form.money" @input="vaildMoney($event)" placeholder="请输入提款金额"></el-input>
          <p class="tip">单笔限额：500,000</p>
        </el-form-item>
        <el-form-item label="提款密码:" style="margin-bottom:0" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入提款密码"></el-input>
        </el-form-item>
        <p class="note">*每个账户每周可享受 7 次免费提款，第 8 次开始每次提款加收 1% 行政费用，提款次数无上限。</p>
        <div class="text-center">
          <el-button type="submit" :loading="btnLoading" @click="sub">确定</el-button>
        </div>
      </el-form>
    </div>

    <div class="withdraw-note">
      <dl>
        <dt>温馨提示：</dt>
        <dd>1.取款密码为6位纯数字。例如：123456。</dd>
        <dd>2.原取款密码为 登录密码 为了您的账户安全 请尽快修改新支付密码</dd>
        <dd>3.若忘记取款密码，请联系在线客服核实身份后重置取款密码。</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-drag-dialog";
import { getBankList, withdraw } from "@/api";
export default {
  data() {
    let validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入金额"));
      } else if (!/^\d{0,}$/.test(value)) {
        callback(new Error("金额格式错误"));
      } else {
        callback();
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        card: "",
        pwd: "",
        money: ""
      },
      subRules: {
        money: [{ required: true, trigger: "blur", validator: validateMoney }],
        pwd: [{ required: true, trigger: "blur", validator: validatePwd }]
      },
      cardList: [],
      dialogVisible: false,
      btnLoading: false
    };
  },
  directives: { elDragDialog },
  mounted() {
    this.getCard();
  },
  methods: {
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          withdraw({
            bank_id: this.form.card,
            money: this.form.money,
            ithdrawal_password: this.form.pwd
          })
            .then(res => {
              this.btnLoading = false;
              this.$message.success("提款成功");
              this.$router.push("/center/list?tab=2");
            })
            .catch(err => {
              this.btnLoading = false;
            });
        }
      });
    },
    vaildMoney(e) {
      this.form.money = e.replace(/[^\d]/g, "");
    },
    getCard() {
      getBankList().then(res => {
        if (res.data.length < 1) {
          this.$alert("立即绑定", "绑定银行卡后才可提款", {
            confirmButtonText: "确定"
          })
            .then(() => {
              this.$router.push("/center/setting?tab=3");
            })
            .catch(() => {
              this.$router.push("/center/setting?tab=3");
            });
          return false;
        }
        this.cardList = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.withdraw-container {
  width: 513px;
  margin-left: 220px;
  padding: 70px 30px 0;
  .el-form-item {
    position: relative;
    height: 45px;
    padding-right: 100px;
    overflow: hidden;
  }
  .withdraw-add-btn {
    position: absolute;
    color: #f56c6c;
    right: -85px;
    top: 0;
  }
  p.tip {
    position: absolute;
    color: #999;
    right: 0;
    bottom: -25px;
    line-height: 25px;
    font-size: 12px;
  }
  .note {
    font-size: 12px;
    text-align: justify;
    margin-left: 120px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
}
.withdraw-note {
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
</style>