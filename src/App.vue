<template>
  <div id="app">
    <Header></Header>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>

    <login-pop></login-pop>
    <Sidebar></Sidebar>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import LoginPop from "@/pages/login";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { mapActions } from 'vuex';
export default {
  components: {
    Header,
    Nav,
    LoginPop,
    Sidebar,
    Footer
  },
  mounted(){
    this.setGameList();
  },
  methods: {
    ...mapActions(["setGameList"])
  }
};
</script>

<style lang="less">
</style>
