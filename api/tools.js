import 
	request
 from '@/services/request.service';
const toolsService = {
	/**
	 * 获取tools
	 * @param {Object} dateEnd
	 * @param {Object} dateStart
	 */
	getTools(dateStart, dateEnd) {
		return request.get(`/test/${dateStart}/${dateEnd}`);
	},


};

export default toolsService;
