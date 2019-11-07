import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, getInfo } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//登录成功不能访问的页面

router.beforeEach(async (to, from, next) => {

  // set page title
  // document.title = getPageTitle(to.meta.title)
  // start progress bar
  NProgress.start();
  if (getToken()) { // 如果处于登录
    if (!store.state.userInfo) { // 没有用户信息
      if (getInfo("userInfo")) { // 读取缓存
        store.state.userInfo = JSON.parse(getInfo("userInfo"));
      } else { // 读取接口
        store.dispatch("getInfo");
      }
    }

    // 不能访问的页面
    if (to.meta.roles === -1) {
      next("/")
      NProgress.done()
      return;
    }

  }
  // 登录权限页面
  let matched = to.matched.some(item => {
    return item.meta.roles === 1;
  })
  if (!getToken() && matched) {
    next("/")
    store.dispatch("setLoginDialog", true)

    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0);
  // finish progress bar
  NProgress.done()
})
