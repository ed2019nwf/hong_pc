import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{	// 首页
			path: '/',
			name: 'Home',
			component: () => import("@/pages/home"),
			meta: { title: '首页' }
		},
		{	// 个人中心
			path: '/center',
			name: "Center",
			component: () => import("@/pages/center"),
			redirect: "/center/setting",
			meta: { title: "个人中心", roles: 1 },
			children: [{
				path: "setting",
				name: "Setting",
				component: () => import("@/pages/center/common/setting.vue"),
				meta: { title: '',group: 0, roles: 1 }
			}, {
				path: "list",
				name: "List",
				component: () => import("@/pages/center/common/list.vue"),
				meta: { group: 0, roles: 1 }
			}, {
				path: "message",
				name: "Message",
				component: () => import("@/pages/center/common/message.vue"),
				meta: { group: 0, roles: 1 }
			}, {
				path: "pay",
				name: "Pay",
				component: () => import("@/pages/center/common/pay.vue"),
				meta: { group: 1, roles: 1 }
			}, {
				path: "withdraw",
				name: "Withdraw",
				component: () => import("@/pages/center/common/withdraw.vue"),
				meta: { group: 1, roles: 1 }
			}, {
				path: "transfer",
				name: "Transfer",
				component: () => import("@/pages/center/common/transfer.vue"),
				meta: { group: 1, roles: 1 }
			}, {
				path: "discount",
				name: "Discount",
				component: () => import("@/pages/center/common/discount.vue"),
				meta: { group: 2, roles: 1 }
			}, {
				path: "agent",
				name: "Agent",
				component: () => import("@/pages/center/common/agent.vue"),
				meta: { group: 3, roles: 1 }
			}]
		},
		{
			//优惠
			path: "/discont",
			name: "Active",
			component: () => import("@/pages/discont")
		},
		{
			//棋牌
			path: "/card",
			name: "Card",
			component: () => import("@/pages/card")
		},
		{
			//体育
			path: "/sport",
			name: "Sport",
			component: () => import("@/pages/sport")
		},
		{
			//真人
			path: "/live",
			name: "Live",
			component: () => import("@/pages/live")
		},
		{
			//老虎机
			path: "/slot",
			name: "Slot",
			component: () => import("@/pages/slot")
		},
		{
			//捕鱼
			path: "/fish",
			name: "Fish",
			component: () => import("@/pages/fish")
		},
		{
			//彩票
			path: "/lottery",
			name: "Lottery",
			component: () => import("@/pages/lottery")
		},
		{
			//注册
			path: "/register",
			name: "Register",
			meta: { title: "注册", roles: -1 },
			component: () => import("@/pages/register")
		},
		{
			//忘记密码
			path: "/forgetPwd",
			name: "ForgetPwd",
			meta: { title: "忘记密码", roles: -1 },
			component: () => import("@/pages/forget")
		},
		{
			//关于我们
			path: "/aboutUs",
			name: "AboutUs",
			component: () => import("@/pages/about_us")
		},
		{
			//游戏loading
			path: "/gameLoading",
			name: "GameLoading",
			component: () => import("@/pages/game_loading")
		},
		{
			//下载页面
			path: "/download",
			name: "Download",
			component: () => import("@/pages/download")
		},
		{
			//404
			path: "/404",
			name: "ErrorPage",
			component: () => import("@/pages/404")
		}, {
			path: "*", // 此处需特别注意置于最底部
			redirect: "/404"
		}
	]
})

// export default new Router({
// 	routes: [
// 		{// 首页
// 			path: '/',
// 			name: 'Home',
// 			component: () => import('@/pages/home')
// 		},
// 		{  // 优惠
// 			path: '/news',
// 			component: () => import('@/components/News'),
// 			redirect: { name: 'JuniorActivity' },
// 			children: [
// 				{ path: '/news/JuniorActivity', name: 'JuniorActivity', component: () => import('@/components/page/JuniorActivity') },
// 			]
// 		},
// 		{ 	// 加盟合作
// 			path: '/addUs',
// 			name: 'addUs',
// 			component: () => import('@/components/main/proxyContent')
// 		},
// 		{
// 			// VIP
// 			path: '/vip',
// 			name: 'vip',
// 			component: () => import('@/components/vip/vip')
// 		},
// 		{
// 			// 代理中心
// 			path: '/proxyCenter',
// 			name: 'proxyCenter',
// 			component: () => import('@/components/page/proxyCenter'),
// 			redirect: { name: 'proxyContent' },
// 			children: [
// 				{ path: '/proxyCenter/proxyContent', name: 'proxyContent', component: () => import('@/components/page/proxyCenterContent') }
// 			]
// 		},
// 		{
// 			// 代理页面 未完成
// 			path: '/proxy',
// 			name: 'proxy',
// 			component: () => import('@/components/page/proxy')
// 		},
// 		{
// 			// 游戏大厅
// 			path: '/gameInstructions',
// 			name: 'gameInstructions',
// 			component: () => import('@/components/gameInstructions'),
// 			redirect: { path: '/gameInstructions/gameContentBox' },
// 			children: [
// 				{ path: '/gameInstructions/gameContentBox', name: 'gameContentBox', component: () => import('@/components/gameInstructions/gameContentBox') },
// 				{ path: '/gameInstructions/miniGameMain', name: 'miniGameMain', component: () => import("@/components/main/miniGameMain") },
// 				{ path: '/gameInstructions/gameContentBox1', name: 'gameContentBox1', component: () => import("@/components/gameInstructions/gameContentBox1") },
// 				{ path: '/gameInstructions/gameContentBoxCard', name: 'gameContentBoxCard', component: () => import("@/components/gameInstructions/gameContentBoxCard") },
// 				{ path: '/gameInstructions/gameContentBoxFish', name: 'gameContentBoxFish', component: () => import("@/components/gameInstructions/gameContentBoxFish") },
// 				{ path: '/gameInstructions/gameContentBoxBonus', name: 'gameContentBoxBonus', component: () => import("@/components/gameInstructions/gameContentBoxBonus") }
// 			]
// 		},

// 		{
// 			// 游戏详情
// 			path: '/gamePlaying',
// 			name: 'gamePlaying',
// 			meta: {
// 				requireAuth: true
// 			},
// 			component: () => import('@/components/game/gamePlaying')
// 		},

// 		{
// 			// app下载
// 			path: '/APPdownload',
// 			name: 'APPdownload',
// 			component: () => import("@/components/page/APPdownload")
// 		},
// 		{
// 			// 个人中心
// 			name: 'userCenter',
// 			path: '/userCenter',
// 			component: () => import('@/components/userCenter'),
// 			redirect: { name: 'memberCenter' },
// 			children: [
// 				{
// 					name: 'assetManager',
// 					path: '/userCenter/assetManager',
// 					component: () => import('@/components/userCenter/mainPannel'),
// 					redirect: { name: 'deposit' },
// 					children: [{
// 						name: 'deposit',
// 						path: '/userCenter/assetManager/deposit',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/deposit')
// 					},
// 					{
// 						name: 'drawing',
// 						path: '/userCenter/assetManager/drawing',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/drawing')
// 					},
// 					{
// 						name: 'transferAccount',
// 						path: '/userCenter/assetManager/transferAccount',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/transferAccount')
// 					},
// 					{
// 						name: 'transDetails',
// 						path: '/userCenter/assetManager/transDetails',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/transDetails')
// 					},
// 					{
// 						name: 'playRecord',
// 						path: '/userCenter/assetManager/playRecord',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import("@/components/userCenter/playRecord")
// 					}
// 					]
// 				},
// 				{
// 					name: 'myRank',
// 					path: '/userCenter/myRank',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/myRank')
// 				},
// 				{
// 					name: 'messageBox',
// 					path: '/userCenter/messageBox',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/messageBox')
// 				},
// 				{
// 					name: 'messageDetail',
// 					path: '/userCenter/messageDetail',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/messageDetail')
// 				},
// 				{
// 					name: 'clubCenter',
// 					path: '/userCenter/clubCenter',
// 					component: () => import('@/components/userCenter/clubCenter'),
// 					children: [{
// 						name: 'messageCenter',
// 						path: '/userCenter/clubCenter/messageCenter',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/messageCenter')
// 					},
// 					{
// 						name: 'safetySetting',
// 						path: '/userCenter/clubCenter/safetySetting',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/safetySetting')
// 					},
// 					{
// 						name: 'channelSetting',
// 						path: '/userCenter/clubCenter/channelSetting',
// 						meta: {
// 							requireAuth: true
// 						},
// 						component: () => import('@/components/userCenter/channelSetting')
// 					}
// 					]
// 				},
// 				{
// 					name: 'memberCenter',
// 					path: '/userCenter/memberCenter',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/memberCenter')
// 				},
// 				{
// 					name: 'mineInformation',
// 					path: '/userCenter/mineInformation',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/mineInformation')
// 				},
// 				{
// 					name: 'safetyCenter',
// 					path: '/userCenter/safetyCenter',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/safetyCenter')
// 				},
// 				{
// 					name: 'bonus',
// 					path: '/userCenter/bonus',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/bonus')
// 				},
// 				{
// 					name: 'proxyApply',
// 					path: '/userCenter/proxyApply',
// 					meta: {
// 						requireAuth: true
// 					},
// 					component: () => import('@/components/userCenter/proxyApply')
// 				}
// 			]
// 		}
// 	]
// })
// {
		// 	path: '/illustration',
		// 	name: 'illustration',
		// 	component: () => import('@/components/illustration'),
		// 	redirect: { name: 'duty' },
		// 	children: [
		// 		{ path: '/illustration/duty', name: 'duty', component: () => import('@/components/illustration/duty') },
		// 		{ path: '/illustration/aboutUs', name: 'aboutUs', component: () => import('@/components/illustration/aboutUs') }
		// 	]
		// },
		// {
		// 	path: '/plans',
		// 	name: 'plans',
		// 	component: () => import('@/components/plans'),
		// 	redirect: { name: 'aboutUsIntro' },
		// 	children: [
		// 		{ path: '/plans/proxyPlans', name: 'proxyPlans', component: () => import('@/components/page/proxyPlans') },
		// 		{ path: '/plans/aboutUsIntro', name: 'aboutUsIntro', component: () => import('@/components/page/aboutUsIntro') },
		// 		{ path: '/plans/questions', name: 'questions', component: () => import('@/components/page/questions') }
		// 	]
		// },
		// {
		// 	path: '/liveCasino',
		// 	name: 'liveCasino',
		// 	component: () => import('@/components/gameInstructions/liveCasinoMain')
		// },

// {
		// 	path: '/vipService',
		// 	name: 'vipService',
		// 	component: () => import('@/components/vip/vipService')
		// },
		// {
		// 	path: '/contact',
		// 	name: 'contact',
		// 	component: () => import('@/components/page/contact')
		// },
		// {
		// 	path: '/road',
		// 	name: 'road',
		// 	component: () => import('@/components/page/road')
		// },

