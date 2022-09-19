import "./index.less";

function getLoadingImg(el: HTMLDivElement) {
	// 查找imgDOM
	//查找图片中有data-role为loading的图片
	return el.querySelector("#loading-mask");
}

function createLoadingMask(el: HTMLDivElement): Element {
	// 创建mask
	const mask = document.createElement("div");
	const loadDiv = document.createElement("div");
	mask.className = "loading-mask";
	loadDiv.className = "loading-con";
	mask.style.width = el.offsetWidth == 0 ? "100px" : el.offsetWidth + "px";
	mask.style.height = el.offsetHeight == 0 ? "100px" : el.offsetHeight + "px";
	el.style.position = "relative";
	mask.appendChild(loadDiv);
	return mask;
}

export default (el: HTMLDivElement, data: any) => {
	const loadingDom = getLoadingImg(el);
	if (data.value) {
		// 显示
		if (!loadingDom) {
			// 不存在  创建  插入
			el.appendChild(createLoadingMask(el));
		}
	} else {
		// 不显示
		if (loadingDom) {
			// 当前img标签存在则移除
			el.removeChild(loadingDom);
		}
	}
};
