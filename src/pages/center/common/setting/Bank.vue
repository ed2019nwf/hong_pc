<template>
  <div class="bank">
    <el-button type="submit" class="add-bank-btn cfx" @click="dialogVisible =true">新增银行卡</el-button>
    <div class="bank-table">
      <el-table
        max-height="580"
        :data="list"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column align="center" prop="bank_name" label="开户行"></el-table-column>
        <el-table-column align="center" prop="barch_name" label="支行"></el-table-column>
        <el-table-column align="center" prop="card_number" label="卡号"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" @click="delCard(row)" type="danger">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogVisible"
      class="login addbank"
      width="450px"
      :modal="false"
    >
      <div class="mydialog-title" slot="title">新增银行卡</div>
      <el-form class="addbank-form" label-width="80px" ref="form" :rules="subRules" :model="form">
        <el-form-item label="开户行" prop="barch_name">
          <el-input v-model="form.barch_name" placeholder="请输入开户行地址"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="card">
          <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="submit" style="margin-bottom:20px" :loaidng="btnloading" @click="sub" :loading="btnloading">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { getBankList, delBankCard, bindBankCard } from "@/api";
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  data() {
    function validateBarch(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入开户行"));
      } else {
        callback();
      }
    }
    function validateCard(rule, value, callback) {
      if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(value)) {
        callback(new Error("银行卡格式错误"));
      } else {
        callback();
      }
    }
    return {
      list: [],
      dialogVisible: false,
      form: {
        card: "",
        barch_name: ""
      },
      subRules: {
        barch_name: [
          { required: true, trigger: "blur", validator: validateBarch }
        ],
        card: [{ required: true, trigger: "blur", validator: validateCard }]
      },
      btnloading: false
    };
  },
  directives: { elDragDialog },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getBankList().then(res => {
        this.list = res.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    delCard(row) {
      this.$confirm("此操作将解绑该银行卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBankCard({ bank_id: row.id }).then(res => {
            this.$message({
              type: "success",
              message: "解绑成功!"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnloading = true;
          bindBankCard({
            card: this.form.card,
            barch_name: this.form.barch_name
          })
            .then(res => {
              this.btnloading = false;
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.getList();
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

<style lang="less">
.add-bank-btn {
  float: right;
  margin: 15px 30px;
}
.bank-table {
  padding: 0 30px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.mydialog-title {
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
.addbank {
    text-align: center;
  .addbank-form {
    width: 300px;
    margin: 0 auto;
    .el-input__inner {
      padding-left: 10px !important;
    }
  }
}
</style>