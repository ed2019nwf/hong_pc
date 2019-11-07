<template>
    <div class="game-loading">
        <img src="../../assets/img/game-loading.gif" alt="">
    </div>
</template>
<style scoped lang="less">
.game-loading{
    position: fixed;
    z-index: 999999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #191919;
    img{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: -100px;
    }
}
</style>