<template>
  <div class="agent" v-loading="pageLoading">
    <List v-if="status === 2"></List>
    <steps :status="status" v-if="status!==2 && !pageLoading" @apply="apply" :btnLoading="btnLoading"></steps>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getAgentStatus, applyPorxy } from "@/api";
export default {
  data() {
    return {
      status: 0,
      btnLoading: false,
      pageLoading:false
    };
  },
  mounted() {
    this.getStatus();
  },
  methods: {
    getStatus() {
     this.pageLoading = true;
      getAgentStatus().then(rep => {
        this.pageLoading = false;
        this.status = parseInt(rep.data.status);
        if (this.status === 1) {
          this.btnLoading = true;
        }
      });
    },
    apply() {
      this.btnLoading = true;
      applyPorxy().then(rep => {
        this.btnLoading = false;
        this.getStatus();
      });
    }
  },
  components: {
    Steps: () => import("./agent/Steps.vue"),
    List: () => import("./agent/List.vue")
  }
};
</script>

<style scoped>
.agent {
}
</style>