<template>
  <div class="marquee-container">
    <div class="box">
      <div id="marqueeBox">{{text}}</div>
      <div id="marqueeNode">{{text}}</div>
    </div>
  </div>
</template>
<script>
import { getMarquee } from "@/api";
export default {
  name: "Marquee",
  data() {
    return {
      text: "",
      timer: null
    };
  },
  methods: {
    move() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      let w = document.getElementById("marqueeNode").getBoundingClientRect()
        .width;
      let box = document.getElementById("marqueeBox");
      let distance = 0; //位移距离
      this.timer = setInterval(() => {
        distance = distance - 1;
        if (-distance >= w) {
          distance = 16;
        }
        box.style.transform = `translateX(${distance}px)`;
      }, 30);
    },
    getNotice() {
      getMarquee().then(res => {
        res.data.map(val => {
          this.text += " " + val.content;
        });
        this.move();
      });
    }
  },
  mounted() {
    this.getNotice();
  },
  updated() {
    this.move();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped lang="less">
#marqueeNode {
  position: absolute;
  z-index: -99999;
  top: -9999px;
}
.marquee-container {
  line-height: 35px;
  width: 285px;
  overflow: hidden;
  .box {
    width: 8000%;
  }
}
</style>