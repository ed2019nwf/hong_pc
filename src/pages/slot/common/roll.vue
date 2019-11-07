<template>
  <div class="roll" v-if="value>0">
    <div class="container roll-box">
      <div class="roll-left">
        <svg-icon icon-class="slot-money"></svg-icon>
        <p class="text1">
          <span id="slotPlt">PT老虎机</span>
        </p>
        <p class="text2">累积奖池</p>
        <p class="text3">SLOT JACKPOT</p>
      </div>
      <div class="roll-right" ref="rolls"></div>
    </div>
  </div>
</template>
<script>
import { getRull } from "@/api";
function formartMoney(val) {
  let str = val.toString().split(""),
    result = "<span class='num-item'>￥</span>";
  str.forEach(v => {
    result += `<span class='num-item'>${v}</span>`;
  });
  return result;
}
export default {
  data() {
    return {
      value: 0,
      timer: null
    };
  },
  mounted() {
    getRull().then(res => {
      this.value = res.data.money;
      this.$nextTick(() => {
        this.numberGrow(this.$refs.rolls);
      });
    });
  },
  methods: {
    numberGrow(ele, money) {
      this.timer = setInterval(() => {
        this.value += 1;
        // console.log(this.value);
        ele.innerHTML = formartMoney(this.value);
      }, 80);
    }
  },
  beforeDestroy(){
      clearInterval(this.timer)
      this.timer=null;
  }
};
</script>

<style scoped lang="less">
.roll {
  width: 100%;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  bottom: 0;
  .roll-box {
    display: flex;
  }
  .roll-left {
    position: relative;
    padding: 30px 0;
    svg {
      font-size: 70px;
      position: absolute;
      top: 40px;
    }
    p {
      margin-left: 85px;
      &.text1 {
        font-size: 24px;
        color: #e89c3e;
      }
      &.text2 {
        font-size: 24px;
        color: #ffffff;
        font-weight: bold;
      }
      &.text3 {
        font-size: 12px;
        color: #925b17;
      }
    }
  }
  .roll-right {
    padding: 30px 0;
    margin-left: 100px;
    display: flex;
  }
}
.num-item {
  display: block;
  width: 60px;
  height: 90px;
  line-height: 85px;
  background: #e99c3d;
  border-radius: 5px;
  font-size: 50px;
  color: #2e2e2e;
  text-align: center;
  font-weight: bold;
}
</style>

<style >
.num-item {
  display: block;
  margin-left: 20px;
  width: 60px;
  height: 90px;
  line-height: 85px;
  background: #e99c3d;
  border-radius: 5px;
  font-size: 50px;
  color: #2e2e2e;
  text-align: center;
  font-weight: bold;
}
</style>
