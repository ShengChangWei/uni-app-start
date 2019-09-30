import configService from './config.service.js'

import { getToken } from './auth.service.js'

let apiUrl = configService.apiUrl

function requestType(type, url, params, resolve, reject) {
	uni.request({
		url: apiUrl + url, //仅为示例，并非真实接口地址。
		method: type,
		data: params,
		header: {
			'x-auth-token': getToken(),
		},
		success: function(res) {
			if (res.data.code === '401') { // 校验token值
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
			resolve(res.data)
		},
		fail: function(res) {
			reject(res)
		}
	});
}

const request = {
	get(url, params) {
		return new Promise((resolve, reject) => {
			requestType('GET', url, params, resolve, reject)
		})
	},
	post(url, params) {
		return new Promise((resolve, reject) => {
			requestType('POST', url, params, resolve, reject)
		})
	},
	delete(url, params) {
		return new Promise((resolve, reject) => {
			requestType('DELETE', url, params, resolve, reject)
		})
	},
}

export default request
