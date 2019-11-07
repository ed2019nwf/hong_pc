<template>
  <div class="home" v-loading="!bannerList.length">
    <Carousel :list="bannerList"></Carousel>
    <Tab :list="hotGame"></Tab>
    <Down></Down>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Tab from "./common/tab.vue";
import Down from "./common/down.vue";
import { getBanner, getHotGame } from "@/api";
export default {
  data() {
    return {
      bannerList: [],
      hotGame: []
    };
  },
  components: {
    Carousel,
    Tab,
    Down
  },
  mounted() {
    this.banner();
    this.getHotGame();
  },
  methods: {
    banner() {
      getBanner().then(res => {
        this.bannerList = res.data;
      });
    },
    getHotGame() {
      getHotGame().then(rep => {
        console.log(rep);
        this.hotGame = rep.data.items;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>