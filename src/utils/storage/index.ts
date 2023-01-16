// 在设置和获取的时候可以使用JS加密算法。
// 比如最简单的：循环JSON，把1替换成2，2替换成3，a替换成b。以此类推
// 获取的时候翻转加密算法
// 保证他人无法正确读取storage的用户信息
export const setStorage = (val: string, data: any) => {
	window.sessionStorage[val] = JSON.stringify(data);
	return true;
};

export const getStorage = (val: string) => {
	const data = window.sessionStorage[val];
	return data ? JSON.parse(data) : undefined;
};
