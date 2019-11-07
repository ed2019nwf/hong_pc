<template>
  <div class="download">
    <div class="page-container-wp container mb30">
      <div class="tab-warp">
        <div class="tabNavBox">
          <a
            class="tab-item pd30"
            data-tab="tab-ios"
            href="javascript:;"
            @click="tabIndex = 0"
            :class="{'active':tabIndex === 0}"
          >
            <svg-icon icon-class="iphone"></svg-icon>IOS
          </a>
          <a
            class="tab-item pd30"
            data-tab="tab-andriod"
            href="javascript:;"
            @click="tabIndex = 1"
            :class="{'active':tabIndex === 1}"
          >
            <svg-icon icon-class="android"></svg-icon>Andriod
          </a>
        </div>
      </div>
      <div class="pageTabContentWp app-contented">
        <div id="tab-ios" class="download-box clearfix" :class="{'active':tabIndex === 0}">
          <div class="tab-con-box">
            <div class="agent-only1">
              <h2>下载方法</h2>
              <p>使用扫码软件进行扫描</p>
              <div id="iosQrcode1" style="padding:5px;height:193px;">
                <canvas style="width:180px;height:180px" id="iphoneCode"></canvas>
              </div>
            </div>
          </div>
          <div class="tab-con-box agent-hide1 hide">
            <h2>下载方法【2】</h2>
            <p>苹果手机任意浏览器输入网址</p>
            <p class="url-text">{{url}}</p>
          </div>
        </div>
        <div id="tab-andriod" class="download-box clearfix" :class="{'active':tabIndex === 1}">
          <div class="tab-con-box">
            <div class="agent-only1">
              <h2>下载方法</h2>
              <p>使用扫码软件进行扫描</p>
              <div id="azQrcode1" style="padding:5px;height:193px;">
                <canvas style="width:180px;height:180px" id="androidCode"></canvas>
              </div>
            </div>
          </div>
          <div class="tab-con-box agent-hide1 hide">
            <h2>下载方法【2】</h2>
            <p>安卓手机任意浏览器输入网址</p>
            <p class="url-text">{{url}}</p>
          </div>
        </div>
      </div>
      <div id="slideImg" style="right: 0px;">
        <img src="../../assets/img/model.png" alt />
        <div class="slide-img-text" style="opacity: 1;">
          <h1>宏博官网</h1>
          <h2>手机客户端下载</h2>
          <h3>IOS / Android都支持</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { getDownUrl } from "@/api";
export default {
  data() {
    return {
      url: "",
      tabIndex: 0,
      urlList: null
    };
  },
  mounted() {
    this.getUrl();
    this.getCode();
  },
  methods: {
    getUrl() {
      this.url = window.location.host;
    },
    getCode() {
      getDownUrl().then(rep => {
        this.urlList = rep.data;
        let iphone = document.getElementById("iphoneCode"),
          android = document.getElementById("androidCode");
        QRCode.toCanvas(iphone, rep.data.ios, () => {});
        QRCode.toCanvas(
          android,
          window.location.host + rep.data.android,
          () => {}
        );
      });
    }
  }
};
</script>
<style scoped lang="less">
.download {
  background-color: #efe8de;
  padding: 85px 0 50px;
  .page-container-wp {
    position: relative;
    min-height: 400px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .tab-warp {
      height: 80px;
      background-color: #f1efec;
      border-bottom: 2px solid #dbd5cc;
      padding-top: 28px;
      border-radius: 10px 10px 0 0;
      .tabNavBox {
        position: relative;
        width: 485px;
        height: 55px;
        margin-left: 35px;
        top: 2px;
        .tab-item {
          position: absolute;
          width: 168px;
          height: 50px;
          color: #444444;
          line-height: 50px;
          background: url(../../assets/img/tab-off.png) no-repeat;
          font-size: 18px;
          &.active,
          &:hover {
            background: url(../../assets/img/tab-on.png) no-repeat;
            color: #fff;
            z-index: 1;
          }
          &:nth-child(2) {
            left: 140px;
            svg {
              left: 25px;
            }
          }
          &:nth-child(1) {
            left: 0;
            svg {
              left: 40px;
            }
          }
          svg {
            position: absolute;
            top: 10px;
            font-size: 24px;
          }
        }
      }
    }
    .pageTabContentWp {
      color: #666;
      background-color: #fff;
      position: relative;
      h2 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        margin-bottom: 10px;
      }
      & > div {
        display: none;
      }
      & > div.active {
        display: block;
      }
      .download-box {
        padding: 35px 40px 20px;
        .tab-con-box {
          padding-right: 30px;
          float: left;
          border-left: 1px solid #f1efec;
          padding-left: 30px;
          min-height: 250px;
          &:first-child {
            padding-left: 0;
            border-left: none;
          }
        }
      }
    }

    #slideImg {
      position: absolute;
      right: 0;
      top: 0;
      transition: all 1s;
      z-index: 1;
      color: #fff;
      background: #fb9b08;
      line-height: 1;
      width: 300px;
      height: 400px;
      img {
        position: absolute;
        width: 335px;
        left: -335px;
      }
      .slide-img-text {
        position: absolute;
        top: 115px;
        right: 50px;
        text-align: center;
        opacity: 1;
        transition: all 3s;
      }
      h1 {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      h2 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 18px;
        background-color: #444444;
        height: 40px;
        border-radius: 40px;
        text-align: center;
        line-height: 40px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>