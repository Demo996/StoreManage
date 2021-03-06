// 1. 引入模块
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { showLoading, hideLoading } from '../utils/loading';


// 2. 配置-统一请求接口网址
axios.defaults.baseURL = '/api/';

// 3. 配置-拦截器

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 拦截所有请求  发送之前就加一些东西

    // 1. 验证
    let token = localStorage.getItem('token')
        // config.headers['token'] = token
    config.headers['token'] = token
        // 2. 编码
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 3. loading  TODO. 扫码不需要loading
    if (config.url != 'qr/check.php') showLoading()
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 1. 隐藏loading
    hideLoading()
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

import purchaseApi from './inner/purchase'
import innerApi from './inner/checkIn'
import checkSearApi from './inner/checkSear'
import productInApi from './inner/productIn'
import productSearApi from './inner/productSear'
import purchaseBackApi from './inner/back'
import innerStatApi from './inner/innerStat'

import outerReceiptApi from './outer/receipt'
import outerSalesApi from './outer/sales'
import outerReturnApi from './outer/return'
import outerStatApi from './outer/statistic'

import inventApi from './invent/search'
import codingApi from './coding/coding'
import rolesApi from './roles/roles'
import usersApi from './user/user'
import loadApi from './load/load'

export {
    purchaseApi,
    innerApi,
    checkSearApi,
    productInApi,
    productSearApi,
    purchaseBackApi,
    innerStatApi,

    outerReceiptApi,
    outerSalesApi,
    outerReturnApi,
    outerStatApi,

    inventApi,
    codingApi,
    rolesApi,
    usersApi,
    loadApi
}