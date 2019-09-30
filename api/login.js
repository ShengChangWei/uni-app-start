import
request
from '@/services/request.service';
const loginService = {
	 
	/**
	 * 登录
	 */
	login() {
		return request.get('/test/login');
	},
	 
	/**
	 * 退出
	 */
	logout() {
		return request.get('/test/logout');
	},
};

export default loginService;
