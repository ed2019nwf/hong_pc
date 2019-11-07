import axios from 'axios'
import store from '@/store'
import Vue from 'vue';
import { MessageBox, Message, Loading } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import router from '@/router'
import md5 from 'js-md5';
import Qs from 'qs';

let loading;
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}


let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}


//创建http模块
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    transformRequest: data => {
        return Qs.stringify(data)
    },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Timestamp": Date.parse(new Date()) / 1000,
        "Sign": md5(Date.parse(new Date()) / 1000 + '7ac66c0f148de9519b8bd264312c4d64')
    },
    timeout: 120000
})

// 请求前拦截
let hideLoading = ['/api/v1/member/info'], // 不需要显示loading的接口
    loadingStatus = false; // loading状态
service.interceptors.request.use(config => {
    let pan = hideLoading.some(val => { return val === config.url });

    if (getToken()) {
        config.headers['Authorization'] = getToken();
    }
    return config;
},
    error => {
        return Promise.reject(error);
    })

// 返回拦截
service.interceptors.response.use(response => {

    if (response.data.code !== 200) {
        Message({
            message: response.data.info || 'Error',
            type: 'error',
            duration: 5 * 1000
        })

        if (response.data.code === 400) { //未登录
            if (getToken()) { // 登录超时
                // removeToken();
            } else {
            }
            router.push("/")
            store.commit("CLEAR_DATA");
            store.commit("OPEN_LOGINDIALOG",true)
            // MessageBox.confirm("立即登录", title, {
            //     confirmButtonText: "立即登录",
            //     cancelButtonText: "取消",
            //     type: "warning"
            // }).then(() => {
            //     // 去到登录页
            // }).catch(() => {
            //     // 去到首页
            // })
        }
        return Promise.reject(new Error(response.data.info || 'Error'))
    } else {
        return response.data;
    }
}, error => {
    return Promise.reject(error);
})

export default service

