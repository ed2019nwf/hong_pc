<template>
  <div class="error-page">
    <div class="container error-page-box">
      <img src="../../assets/img/404.png" alt />
      <h2>噢！找不到页面。</h2>
      <router-link to="/">返回首页</router-link>
    </div>
    <div id="clouds">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
      <div class="cloud cloud-4"></div>
      <div class="cloud cloud-5"></div>
      <div class="cloud cloud-6"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.error-page {
  width: 100%;
  overflow: hidden;
  padding: 80px 0;
  background: #ffffff;
  text-align: center;
  img {
    width: 500px;
  }
  h2 {
    color: #333;
    font-size: 30px;
    margin-top: 35px;
    margin-bottom: 43px;
    font-family: "Lato", sans-serif;
  }
  a {
    background: #02a9c0;
    height: 60px;
    display: inline-block;
    padding: 0 40px;
    line-height: 60px;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
}
.cloud {
  width: 350px;
  height: 120px;
  background: #f1f1f1;
  background: linear-gradient(top, #f1f1f1 100%);
  border-radius: 100px;
  border-radius: 100px;
  position: absolute;
  margin: 120px auto 20px;
  transition: ease 1s;
}

.cloud:after,
.cloud:before {
  content: "";
  position: absolute;
  background: #f1f1f1;
  z-index: -1;
}

.cloud:after {
  width: 100px;
  height: 100px;
  top: -50px;
  left: 50px;
  border-radius: 100px;
}

.cloud:before {
  width: 180px;
  height: 180px;
  top: -90px;
  right: 50px;
  border-radius: 200px;
}

.cloud-1 {
  top: 60px;
  left: 0;
  transform: scale(0.3);
  opacity: 0.9;
  animation: moveclouds 15s linear infinite;
}

.cloud-2 {
  top: 80px;
  left: 140px;
  transform: scale(0.3);
  transform: scale(0.3);
  animation: moveclouds 17s linear infinite;
}

.cloud-3 {
  left: 409px;
  top: 100px;
  transform: scale(0.6);
  opacity: 0.6;
  animation: moveclouds 25s linear infinite;
}

.cloud-4 {
  left: 0;
  bottom: 135px;
  transform: scale(0.6);
  opacity: 0.8;
  animation: moveclouds 25s linear infinite;
}

.cloud-5 {
  left: 469px;
  bottom: 120px;
  transform: scale(0.75);
  opacity: 0.75;
  animation: moveclouds 18s linear infinite;
}

.cloud-6 {
  left: 100px;
  top: 263px;
  transform: scale(0.5);
  transform: scale(0.5);
  opacity: 0.8;
  animation: moveclouds 20s linear infinite;
}

@keyframes moveclouds {
  0% {
    margin-left: 1000px;
  }
  100% {
    margin-left: -1000px;
  }
}
</style>