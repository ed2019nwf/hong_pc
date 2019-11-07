<template>
  <div class="step">
    <el-steps :active="status" finish-status="success" simple>
      <el-step title="申请代理"></el-step>
      <el-step title="等待审核"></el-step>
      <el-step title="审核通过"></el-step>
    </el-steps>
    <div class="agent-btn">
      <el-button type="submit" @click="sub" :loading="btnLoading">{{btnLoading?'请等待审核':'申请成为代理'}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["status","btnLoading"],
  methods:{
      sub(){
          this.$emit("apply");
      }
  }
};
</script>
<style scoped>
.agent-btn{
    padding: 30px 0;
    text-align: center;
}
</style>