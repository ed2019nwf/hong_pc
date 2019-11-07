<template>
  <div class="newIndex-DownloadApp">
    <div class="center-title">
      <img src="@/assets/img/download_title.png" />
    </div>
    <div class="img-box">
      <div class="download-inner-text">
        <div class="innet-text-left">
          <span class="big-num">01</span>
          <p class="orange">下载方式一</p>
          <p>
            手机浏览器打开本网址
          </p>
        </div>
        <div class="innet-text-right">
          <span class="big-num">02</span>
          <p class="orange">下载方式二</p>
          <p>扫一扫二维码，轻松下载</p>
        </div>
      </div>
      <img src="@/assets/img/download1.png" alt class="download-img" />
      <div class="download-qrcode Qrcode-index">
        <canvas id="canvas"></canvas>
        <img src="/images/qr/app1.png?v=10" width="157px" height="157px" alt />
        <!-- <div class="mask">
          <p>请登入账号</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  methods: {},
  mounted() {
    let canvas = document.getElementById("canvas");

    QRCode.toCanvas(canvas, window.location.origin, () => {});
  }
};
</script>

<style scoped lang="less">
.newIndex-DownloadApp {
  padding-top: 45px;
  height: 750px;
  background-color: #f6f6f6;
  text-align: center;
  .center-title {
    text-align: center;
    min-width: 1200px;
    max-width: 1920px;
    margin: 0 auto 10px;
    height: 106px;
    position: relative;
    overflow: hidden;
    margin-bottom: 40px;
    img {
      width: 1200px;
      position: absolute;
      left: 50%;
      margin-left: -600px;
    }
  }
  .img-box {
    position: relative;
    width: 1200px;
    margin-bottom: 77px;
    margin: 0 auto;
    .download-inner-text {
      width: 750px;
      position: absolute;
      top: 115px;
      left: 55px;
      text-align: left;
      font-size: 18px;
      color: #333333;
      div {
        padding-left: 75px;
        position: relative;
        width: 50%;
        span.big-num {
          font-size: 66px;
          color: #f98603;
          position: absolute;
          left: -10px;
          top: -25px;
        }
        .orange {
          color: #f98603;
        }
      }
      .innet-text-right {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .download-qrcode {
      width: 157px;
      height: 157px;
      position: absolute;
      right: 139px;
      top: 93px;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: #000;
        opacity: 0.8;
        font-size: 14px;
        color: #fff;
        p {
          padding-top: 45%;
        }
      }
    }
  }

  .md2 {
    margin-top: 50px;
  }
}
</style>