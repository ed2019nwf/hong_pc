<template>
  <div class="footer">
    <div class="footer-h">
      <div class="footer-nav cfx">
        <ul class="fl">
          <li>
            <router-link to="/aboutUs?tab=0">合作方案</router-link>
          </li>
          <li>
            <router-link to="/aboutUs?tab=1">代理FQA</router-link>
          </li>
          <li>
            <router-link to="/aboutUs?tab=2">权利与义务</router-link>
          </li>
          <li>
            <router-link to="/aboutUs?tab=3">关于我们</router-link>
          </li>
          <!-- <li>
            <a href="/download_center.jsp">下载中心</a>
          </li>
          <li>
            <a href="/new_safecenter.jsp">帮助中心</a>
          </li>-->
        </ul>

        <div class="fr">
          PT游戏是由PT TranssPacific在
          <a
            href="https://www.pagcor.ph/index.php"
            target="_blank"
            class="url"
          >
            <img
              src="https://www.lh5118.com/images/new_index/icons/pagcor.png"
              style="width:22px;height:22px"
              alt
            />
            <span class="c-yellow">PAGCOR</span>
          </a>的授权下部署
        </div>
      </div>
    </div>
    <div class="footer-m container">
      <div class="footer-bd">
        <div class="m-row">
          <div class="brower-link">
            <h4 class="mb20 footer-title f16">推荐浏览器</h4>
            <a
              class="item"
              target="_blank"
              href="https://www.google.com/chrome/browser/desktop/index.html"
              title="谷歌浏览器"
            >
              <i class="browers-icon chrome"></i>
              <p class="c-white">谷歌</p>
            </a>
            <a class="item" target="_blank" href="https://www.firefox.com.cn" title="火狐浏览器">
              <i class="browers-icon firefox"></i>
              <p class="c-white">火狐</p>
            </a>
            <a
              class="item"
              target="_blank"
              href="https://windows.microsoft.com/zh-CN/internet-explorer/download-ie"
              title="ie"
            >
              <i class="browers-icon ie"></i>
              <br />
              <p class="c-white">IE</p>
            </a>
            <a class="item" target="_blank" href="https://www.apple.com/safari" title="safari">
              <i class="browers-icon safari"></i>
              <p class="c-white">Safari</p>
            </a>
            <!--                     <a class="item" target="_blank" href="https://get.adobe.com/cn/flashplayer/" title="flash">
            <i class="browers-icon flash"></i><p class="c-white">Flash</p></a>-->
          </div>
          <div class="partner-link">
            <div class="border-left"></div>
            <div class="border-right"></div>
            <h4 class="mb20 footer-title f16">合作伙伴</h4>
            <img src="@/assets/img/partner.png" alt />
          </div>
          <div class="jianguan-link">
            <h4 class="mb20 footer-title f16">监管机构</h4>

            <a target="_blank" href="javascript:;" class="mr15 item">
              <img src="@/assets/img/pg-logo.png" alt />
              <p class="c-white">PAGCOR授权</p>
            </a>

            <a target="_blank" href="javascript:;" class="mr15 item">
              <img src="@/assets/img/icon-18.png" alt />
              <p class="c-white">18+</p>
            </a>
            <a target="_blank" href="javascript:;" class="mr15 item">
              <img src="@/assets/img/icon-vs.png" alt />
              <p class="c-white">VTST认证</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-b">
      <span class="c-yellow">宏博持有菲律宾 PAGCOR 合法博彩执照</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped lang="less">
.footer {
  color: #737171;
  background-color: #2e2e2e;
  min-width: 1180px;
  z-index: 1;
  position: relative;
  .footer-h {
    background-color: #f1efec;
    border-top: 1px solid #dbd5cc;
    .footer-nav {
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
      font-size: 13px;
      width: 1200px;
      margin: 0 auto;
      li {
        display: inline-block;
        vertical-align: middle;
        &:first-child {
          a {
            border-left: none;
            padding-left: 0;
          }
        }
        a {
          padding: 0 10px;
          border-left: 2px solid #e6e3de;
          color: #666666;
          font-size: 14px;
        }
      }
    }
  }
  .footer-m {
    padding: 20px 0;
    height: 180px;
    position: relative;
    .brower-link {
      position: absolute;
      left: 0;
      top: 20px;
      .item {
        display: inline-block;
        vertical-align: middle;
        padding-right: 20px;
        i.browers-icon {
          display: inline-block;
          width: 27px;
          height: 25px;
          background: url(../../assets/img/browser.png) no-repeat;
          &.chrome {
            background-position: 0 0;
          }
          &.firefox {
            background-position: -45px 0;
          }
          &.ie {
            background-position: -140px 0;
          }
          &.safari {
            background-position: -93px 0;
          }
        }
      }
    }
    .partner-link {
      width: 600px;
      margin: 0 auto;
      position: relative;
      .border-left {
        left: -50px;
        top: 0;
        width: 2px;
        height: 122px;
        background: url(../../assets/img/vline.jpg);
        position: absolute;
      }
      .border-right {
        right: 0;
        top: 0;
        width: 2px;
        height: 122px;
        background: url(../../assets/img/vline.jpg);
        position: absolute;
      }
    }
    .jianguan-link {
      position: absolute;
      right: 0;
      top: 20px;
      .item {
        display: inline-block;
        vertical-align: middle;
        padding-right: 20px;
      }
    }
    .footer-title {
      color: #666666;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .footer-b {
    text-align: center;
    line-height: 46px;
    background-color: #444444;
    color: #959595;
  }
}
</style>