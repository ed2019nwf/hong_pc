import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { goLogin, getUserInfo, goOut, getGameList, goGame } from '@/api/index';
import { setToken, setInfo, getToken, removeToken, removeInfo } from '@/utils/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || null,
    userInfo: null,
    loginDialog: false,
    gameList: []
  },
  mutations: {
    "SET_TOKEN": (state, token) => { // 设置token
      state.token = token;
      setToken(token);
    },
    "SET_USERINFO": (state, info) => { // 设置用户信息
      state.userInfo = info;
    },
    "OPEN_LOGINDIALOG": (state, status) => { // 设置登录弹窗
      state.loginDialog = status;
    },
    "CLEAR_DATA": (state) => {  // 清除网站数据
      state.token = null;
      state.userInfo = null;
      removeToken();
      removeInfo("userInfo");
    },
    "SET_GAMELIST": (state, list) => {
      state.gameList = list;
    }
  },
  actions: {
    login({ commit, dispatch }, info) { // 登录
      return new Promise((resolve, reject) => {
        goLogin({ username: info.username, password: info.password }).then(res => {

          commit("SET_TOKEN", res.data.token);
          dispatch("getInfo").then(() => {
            resolve()
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject(err);
        })
      })
    },
    getInfo({ commit }) { // 获取用户信息
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          commit("SET_USERINFO", res.data);
          setInfo({ key: "userInfo", val: res.data });
          resolve();
        }).catch(err => {
          reject(err);
        })
      })
    },
    setLoginDialog({ commit }, status) { // 设置登录弹窗
      commit("OPEN_LOGINDIALOG", status)
    },
    setGameList({ commit }) { // 设置游戏列表
      return new Promise((res, rej) => {
        getGameList().then(rep => {
          res(rep);
          commit("SET_GAMELIST", rep.data)
        }).catch(err => {
          rej(err);
        })
      })
    },
    goGame({ state, dispatch }, item) { // 进入游戏
      if (state.token && Object.keys(state.userInfo)) {
        let w = window.open('/gameLoading', 'newwindow', 'height=800, width=1200, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
        goGame({ url: item.apiurl, gametype: item.type }).then(rep => {
          w.location.href = rep.data.url;
        }).catch(err=>{
          w.close();
        })
      } else {
        dispatch("setLoginDialog", true);
      }
    },
    out({ commit }) { // 退出
      return new Promise((resolve, reject) => {
        goOut().then(res => {
          resolve(res);
          commit("CLEAR_DATA")
        }).catch(err => {
          reject(err);
        })
      })
    }
  }
})
