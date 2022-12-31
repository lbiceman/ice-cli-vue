/**
 * author: libing
 * git: https://github.com/lbiceman
 * email: lbiceman@126.com
 */
const basicTypes = ["Number", "String", "Boolean", "Null", "Undefined", "RegExp"];
const quoteTypes = ["Array", "Function", "Object"];

export const getType = (obj: any) => {
	const str: string = Object.prototype.toString.call(obj);
	return str.slice(8, str.length - 1);
};
export const isArr = (val: any): val is Array<[]> => {
	return getType(val) === "Array";
};

export const isObj = (val: any): val is object => {
	return getType(val) === "Object";
};

export const isStr = (val: any): val is string => {
	return getType(val) === "String";
};

export const isNum = (val: any): val is number => {
	return getType(val) === "Number";
};

export const isFun = (val: any) => {
	return getType(val) === "Function";
};

export const getObjKeys = (val: any): string[] => {
	return Object.getOwnPropertyNames(val);
};

export const getObjKeysSize = (val: any): number => {
	return getObjKeys(val).length;
};

export const clone = (obj: any, newObj: any) => {
	if (!obj) return obj;
	if (!quoteTypes.includes(getType(obj))) return obj;
	for (const key in obj) {
		const el = obj[key];
		if (quoteTypes.includes(getType(el))) {
			if (isArr(el)) newObj[key] = [];
			else if (isObj(el)) newObj[key] = {};
			else if (getType(el) == "Function") newObj[key] = el;
			clone(el, newObj[key]);
		} else newObj[key] = el;
	}
	return newObj;
};

// 判断两个对象是否相等
export const equals = (obj1: any, obj2: any): boolean => {
	const type = getType(obj1);
	const errMsg = "The current type (Function, RegExp) is not supported";
	if (type === getType(obj2)) {
		if (type === "RegExp") {
			console.error(errMsg);
		}
		if (basicTypes.includes(type)) {
			return obj1 === obj2;
		} else if (type === "Object") {
			if (getObjKeysSize(obj1) === getObjKeysSize(obj2)) {
				for (const key in obj1) {
					if (!equals(obj1[key], obj2[key])) return false;
				}
				return true;
			} else return false;
		} else if (type === "Array") {
			if (obj1.length === obj2.length) {
				for (let i = 0, len = obj1.length; i < len; i++) {
					if (!equals(obj1[i], obj2[i])) return false;
				}
				return true;
			} else return false;
		} else console.error(errMsg);
	}
	return false;
};

// 合并
// 箭头函数没有自己的arguments。所以这里使用普通的函数
export function merge(target: any) {
	for (let i = 1, j = arguments.length; i < j; i++) {
		const source = arguments[i] || {};
		for (const prop in source) {
			if (source.hasOwnProperty(prop)) {
				const value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}
	return target;
}

// 节流 连续触发只执行一次
export const throttle = (callback: any, wait: number) => {
	let timer: any = null;
	return function (this: any) {
		// 使用传统写法  保持this只想
		const args = arguments;
		if (!timer) {
			timer = setTimeout(() => {
				callback.apply(this, args);
				timer = null;
			}, wait);
		}
	};
};

// 防抖  被调用后重新计算时间
// 当被调用N毫秒后才会执行，如果在这段时间内又被调用则重新计算执行时间
export const debounce = (callback: any, wait: number, state?: boolean) => {
	/*
        state
            true: 立即执行
            false: 不立即执行
    */
	state = state || false;
	let timer: any = null;
	return function (this: any) {
		const args = arguments;
		if (timer) clearTimeout(timer);
		if (state) {
			const now = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (now) callback.apply(this, args);
		} else {
			timer = setTimeout(() => {
				callback.apply(this, args);
			}, wait);
		}
	};
};

export const findTree = (tree: any, child: string, callback: any) => {
	if (!isArr(tree)) return;
	let obj = {};
	function findChild(list: any, child: string, callback: any) {
		for (let i = 0; i < list.length; i++) {
			if (callback && callback(list[i])) {
				obj = list[i];
			}
			if (list[i][child] && list[i][child].length > 0) {
				findChild(list[i][child], child, callback);
			}
		}
	}
	findChild(tree, child, callback);
	return obj;
};
