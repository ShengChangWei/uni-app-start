/**
 * 时间格式化
 * @param {*} value 可转化为时间的值
 * @param {string} fmt 格式 除了月使用大写M，其它都是小写
 * @returns {string}
 */
export function dateFormat(value, fmt) {
	if (new Date(value).toString() === 'Invalid Date') {
		throw new Error('Invalid Date');
	}
	const date = new Date(value);
	const o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		);
	}
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ?
				o[k] :
				('00' + o[k]).substr(('' + o[k]).length)
			);
		}
	}
	return fmt;
}
