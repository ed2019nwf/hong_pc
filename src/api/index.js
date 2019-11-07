import ajax from '@/utils/request'

// 获取公告
export function getMarquee() {
    return ajax({
        url: "/v1/commit/marquee",
        method: 'GET'
    })
}

// 获取用户信息
export function getUserInfo() {
    return ajax({
        url: "/v1/member/info",
        method: 'GET'
    })
}

// 获取banner
export function getBanner() {
    return ajax({
        url: "/v1/commit/banner",
        method: "GET"
    })
}

// 获取奖池
export function getPools() {
    return ajax({
        url: "/commit/prize/pools",
        method: "GET"
    })
}

// 登录
export function goLogin(params) {
    return ajax({
        url: "/v1/join/login",
        method: "POST",
        params
    })
}

// 注册
export function register(params) {
    return ajax({
        url: "/v1/join/register",
        method: "POST",
        params
    })
}

// 退出
export function goOut(params) {
    return ajax({
        url: "/v1/join/logout",
        method: "POST",
        params
    })
}

// 绑定邮箱
export function bindEmail(params) {
    return ajax({
        url: "/v1/member/changeemail",
        method: "POST",
        params
    })
}

// 实名认证
export function bindName(params) {
    return ajax({
        url: "/v1/member/idverification",
        method: "POST",
        params
    })
}

// 发送手机验证码
export function sendPhoneCode(params) {
    return ajax({
        url: "/v1/code/sendsms",
        method: "POST",
        params
    })
}
// 绑定手机
export function bindPhone(params) {
    return ajax({
        url: "v1/member/changephone",
        method: "POST",
        params
    })
}

// 修改登录密码
export function changePwd(params) {
    return ajax({
        url: "/v1/member/newchangepassword",
        method: "POST",
        params
    })
}

// 修改提现密码
export function changeOutPwd(params) {
    return ajax({
        url: "/v1/member/changeithdrawalpassword",
        method: "POST",
        params
    })
}

// 获取用户绑定的银行卡
export function getBankList() {
    return ajax({
        url: "/v1/member/get/banks",
        method: "GET"
    })
}

// 解绑用户绑定的银行卡
export function delBankCard(params) {
    return ajax({
        url: "/v1/member/delete/banks",
        method: "POST",
        params
    })
}

// 绑定银行卡
export function bindBankCard(params) {
    return ajax({
        url: "/v1/member/add/newbank",
        method: "POST",
        params
    })
}

// 获取交易记录列表(存款，体现，优惠)
export function getTransactionDetails(params) {
    return ajax({
        url: '/v1/member/new/transaction/details',
        method: "GET",
        params
    })
}

// 获取下注记录
export function getBetList(params) {
    return ajax({
        url: "/v1/member/bet/logs",
        method: "GET",
        params
    })
}

// 获取支付信息
export function getPayInfo(params) {
    return ajax({
        url: "/v1/onlinepay/info",
        method: "GET",
        params
    })
}

// 充值
export function goPay(params) {
    return ajax({
        url: "/v1/onlinepay/dopay",
        method: "POST",
        params
    })
}

// 提现
export function withdraw(params) {
    return ajax({
        url: "/v1/member/draw",
        method: "post",
        params
    })
}

// 获得平台额度
export function getPlatForm() {
    return ajax({
        url: "/v1/commit/gameplatform",
        method: "GET"
    })
}

// 户内转账
export function transferPlat(params) {
    return ajax({
        url: "/v1/transfer",
        method: "POST",
        params
    })
}

// 红利列表
export function getBonus(params) {
    return ajax({
        url: "/v1/bonus/cover",
        method: "GET"
    })
}

// 获取游戏列表
export function getGameList() {
    return ajax({
        url: "/v1/bonus/gamelist",
        method: "POST"
    })
}

// 优惠列表
export function getActiveList(params) {
    return ajax({
        url: "/v1/bonus/activity",
        method: "POST",
        params
    })
}


// 电子平台游戏
export function getSlotList(params) {
    return ajax({
        url: "/v1/bbin/bbingame",
        method: "GET",
        params
    })
}

// 获取奖池
export function getRull() {
    return ajax({
        url: "/v1/commit/prize/pools",
        method: "GET"
    })
}

// 进游戏
export function goGame({ url, gametype }) {
    return ajax({
        url,
        method: "POST",
        params: { action: "togames", gametype }
    })
}

// 首页热门游戏
export function getHotGame() {
    return ajax({
        url: "/v1/bonus/hotgamelist",
        method: "POST"
    })
}

//站内信总数
export function getMessage(params) {
    return ajax({
        url: "/v1/member/message",
        method: "GET",
        params
    })
}

//站内信 读
export function readMessage(params) {
    return ajax({
        url: "/v1/member/set/message",
        method: "POST",
        params
    })
}

// 站内信 删
export function delMessage(params) {
    return ajax({
        url: "/v1/member/delete/message",
        method: "POST",
        params
    })
}

// 获取app下载链接 
export function getDownUrl(params) {
    return ajax({
        url: "/v1/commit/app/get",
        method: "GET",
        params
    })
}

// 获取用户代理状态
export function getAgentStatus() {
    return ajax({
        url: "/v1/member/apply/porxy/status",
        method: "GET"
    })
}

// 申请成为代理
export function applyPorxy() {
    return ajax({
        url: "/v1/member/apply/porxy",
        method: "POST"
    })
}

// 获取代理线路
export function getAgentLine() {
    return ajax({
        url: "/v1/porxy/line",
        method: "GET"
    })
}

// 获取代理信息
export function getAgentInfo() {
    return ajax({
        url: "/v1/porxy/info",
        method: "GET"
    })
}
// 获取代理客户报表
export function getAgentList(params) {
    return ajax({
        url: "/v1/porxy/member/statistics",
        method: "GET",
        params
    })
}
