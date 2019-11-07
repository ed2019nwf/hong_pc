<template>
  <div class="pay">
    <ul class="my-tabs">
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="{'active':tabIndex === index}"
        class="tab-item"
        @click="tabIndex = index"
      >{{item.pay_type === 2?'微信支付'+item.id:"支付宝支付"+item.id}}</li>
    </ul>
    <div class="pay-view" v-if="list.length>0" v-loading="pageLoading">
      <el-form label-width="100px" ref="form" :rules="subRules" :model="form" class="pay-form">
        <el-form-item label="充值金额:" prop="money">
          <el-input v-model="form.money" @input="vaildMoney($event)" placeholder="请输入充值金额"></el-input>
        </el-form-item>
      </el-form>
      <p>单笔限额{{list[tabIndex].amount_min}}-{{list[tabIndex].amount_max}}</p>
      <div class="pay-item">
        <h2>常用金额:</h2>
        <ul>
          <li
            v-for="(item,index) in moneylist"
            @click="form.money = item"
            :class="{'active':form.money == item}"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <div class="text-center pay-btn">
        <el-button type="submit" @click="pay" :loading="btnLoading">充值</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getPayInfo, goPay } from "@/api";
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
    return {
      list: [],
      pageLoading: false,
      tabIndex: 0,
      form: {
        money: ""
      },
      moneylist: [10, 20, 30, 50, 100, 200, 300, 500, 1000],
      subRules: {
        money: [{ required: true, trigger: "blur", validator: validateMoney }]
      },
      btnLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.pageLoading = true;
      getPayInfo().then(res => {
        this.pageLoading = false;
        this.list = res.data;
      });
    },
    vaildMoney(e) {
      this.form.money = e.replace(/[^\d]/g, "");
    },
    pay() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let index = this.tabIndex;
          this.btnLoading = true;
          goPay({ id: this.list[index].id, money: this.form.money }).then(
            rep => {
              this.btnLoading = false;
              this.$message.success("亲!~请尽快支付哦~")
              window.open(rep.data.url, "width=400,height=600");
              this.$router.push("/center/list?tab=2");
            }
          ).catch(err=>{
            this.btnLoading = false;
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.pay-view {
  padding: 30px;
  width: 420px;
  margin-left: 240px;
  margin-top: 30px;
  position: relative;
  .pay-btn {
    margin-top: 25px;
  }
  .pay-form {
    height: 80px;
    overflow: hidden;
  }
  p {
    position: absolute;
    right: 30px;
    top: 75px;
    color: #b03a34;
    font-size: 12px;
  }
  .pay-item {
    // display: flex;
    h2 {
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 35px;
      padding-right: 12px;
      width: 100px;
      text-align: right;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        cursor: pointer;
        width: 80px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 5px;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        transition: 0.1s;
        margin-bottom: 10px;
        &.active {
          background-color: #e08a07;
          color: #ffffff;
        }
      }
    }
  }
}
</style>