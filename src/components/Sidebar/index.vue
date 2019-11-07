<template>
  <div id="asidebar">
    <div class="item">
      <a
        target="_blank"
        class="has-radius"
        href="http://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1123519&configID=226250&jid=4500408320"
      >
        <svg-icon icon-class="server"></svg-icon>
        <p>客服中心</p>
      </a>
    </div>
    <div class="agent-hide hide">
      <div class="item qr">
        <router-link to="/download">
          <svg-icon icon-class="app"></svg-icon>

          <p>APP下载</p>
          <div class="txt2">
            <p class="text-center" style="height: 50px;line-height: 50px;">领8-88元体验金</p>
            <div class="mb20 agent-hide text-center">
              <canvas id="canvas1"></canvas>
              <!-- <img src="/images/qr/app1.png?v=10" width="110" height="110" alt /> -->
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="item">
      <a href="javascript:;" id="j-gotop" class="goTopBtn go-top sideLastBtn" @click="goTop">
        <svg-icon icon-class="gotop"></svg-icon>
        <p>返回顶部</p>
      </a>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      isMoving: false,
      interval: null
    };
  },
  mounted() {
    let canvas = document.getElementById("canvas1");

    QRCode.toCanvas(canvas, window.location.origin, () => {});
  },
  methods: {
    goTop() {
      if (this.isMoving) return;
      const start = window.pageYOffset;
      let i = 0;
      this.isMoving = true;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= 50) {
          window.scrollTo(0, 0);
          clearInterval(this.interval);
          this.isMoving = false;
        } else {
          window.scrollTo(0, next);
        }
        i++;
      }, 16.7);
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
};
</script>


<style scoped>
#asidebar {
  position: fixed;
  bottom: 100px;
  right: 40px;
  cursor: pointer;
  text-align: center;
  z-index: 1108;
  border-radius: 10px;
  margin-top: -200px;
  box-shadow: 2px 2px 5px #444;
}

#asidebar .item {
  border-bottom: 1px solid #efe8de;
}

#asidebar .item:last-child {
  border-bottom: none;
}

#asidebar .item .txt {
  color: #fff;
}

#asidebar .line {
  height: 1px;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #464646;
}

#asidebar .item > a {
  display: block;
  height: 80px;
  position: relative;
  text-align: center;
  color: #666666;
  width: 80px;
  background-color: #dbd5cc;
  line-height: 1;
  font-size: 14px;
}

#asidebar .item > a.has-radius {
  border-radius: 5px 5px 0 0;
}

#asidebar .item > a.sideLastBtn {
  background-color: #b13a34;
  color: #fff;
  border-radius: 0 0 5px 5px;
}

#asidebar .item > a.sideLastBtn svg {
  color: #fff !important;
}

#asidebar .item > a:hover {
  background-color: #e99c3d;
  color: #fff;
}

#asidebar .item > a:hover svg {
  color: #fff !important;
  transform: rotateZ(360deg);
}

#asidebar .item > a svg {
  font-size: 35px;
  margin: 12px 0 5px;
  color: #444444;
  transform: rotateZ(0deg);
  transition: all 0.4s;
}

#asidebar .item > a .icon-hot {
  color: #f00;
  position: absolute;
  left: 0;
  top: -15px;
  font-size: 34px;
}

/*#asidebar .item:hover {
    background: #fb9b08;
    color: #fff;
}

#asidebar .item:hover .iconfont {
    color: #fff;
}*/

#asidebar .item:first-child > a {
  border-top: none;
}

#asidebar .item .asidebar-icons {
  display: block;
  height: 100%;
  font-size: 30px;
  position: relative;
  z-index: 10;
}

#asidebar .item .txt,
#asidebar .item .txt2 {
  position: absolute;
  width: 0px;
  right: 75px;
  height: 100%;
  top: 0px;
  text-align: left;
  font-size: 16px;
  visibility: hidden;
  transition: all 0.3s;
  z-index: -1;
  opacity: 0;
  background-color: #e99c3d;
  transition: all 0.5s;
  line-height: 80px;
  overflow: hidden;
}
#asidebar .item .txt2 canvas {
  display: block;
  margin: 0 auto;
}
#asidebar .item .txt2 p {
  color: #ffffff;
}

#asidebar .item > a:hover .txt {
  visibility: visible;
  opacity: 1;
  width: 240px;
}

#asidebar .item > a:hover .txt2 {
  visibility: visible;
  opacity: 1;
  width: 160px;
  width: 150px;
  right: 78px;
}

#asidebar .item.qr .txt,
#asidebar .item.qr .txt2 {
  height: auto;
  width: 146px;
}

#asidebar .survey {
  height: auto; /* line-height: 1.8; */
}

#asidebar .survey a {
  padding: 6px 11px;
  height: auto;
  line-height: 1.6;
}

#asidebar .icon-appgif {
  display: inline-block;
  width: 35px;
  height: 35px;
  /* background: url(../images/qr/appgif.gif) no-repeat; */
  margin-top: 15px;
}
</style>