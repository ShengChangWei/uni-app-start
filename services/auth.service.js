/**
 * @/assets/js/auth.js
 * 封装和用户授权相关函数
 */

import configService from './config.service.js'


const storage_key = configService.storage_key;
const storage_resourceTree = "resourceTree"

/**
 * 保存登陆用户信息到本地存储
 * @param  {Object} userInfo 用户登陆成功的信息对象
 * @return {undefined}     无返回值
 */
export function saveUserInfo(userInfo = {}) {
	uni.setStorageSync(storage_key, userInfo);
}

export function saveResourceTree(tree = []) {
	uni.setStorageSync(storage_resourceTree, tree);
}

export function getResourceTree() {
	return uni.getStorageSync(storage_resourceTree);
}
/**
 * 从本地存储中获取当前登陆用户信息
 * @return {string} 当前登陆用户信息对象字符串
 */
export function getUserInfo() {
	return uni.getStorageSync(storage_key);
}

/**
 * 获取本地存储中用户信息的 Token 令牌
 * @return {string} 用户的 Token 身份令牌
 */
export function getToken() {
	try {
		return getUserInfo().token;
	} catch (err) {
		return '';
	}
}

/**
 * 删除本地存储中的用户登陆信息
 * @return {undefined} 无返回值
 */
export function removeUserInfo() {
	uni.removeStorageSync(storage_key);
}
