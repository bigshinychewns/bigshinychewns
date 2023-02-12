/** @param {HTMLElement} node */
const scrollShadow = (node) => {
	const shadowSize = '20px';
	const blurRadius = '20px';
	const blurSpread = '-15px';
	const shadowColor = 'hsla(0, 0%, 15%, 0.7)'
	const shadowTop =
		`inset 0 ${shadowSize} ${blurRadius} ${blurSpread} ${shadowColor}`;
	const shadowBottom =
		`inset 0 -${shadowSize} ${blurRadius} ${blurSpread} ${shadowColor}`;

	const handleScrollShadows = () => {
		const needsShadowTop = node.scrollTop !== 0;
		const needsShadowBottom =
			node.scrollHeight - node.scrollTop > node.clientHeight;

		if (needsShadowTop && needsShadowBottom) {
			node.style.boxShadow = `${shadowTop}, ${shadowBottom}`;
		} else if (needsShadowTop) {
			node.style.boxShadow = shadowTop;
		} else if (needsShadowBottom) {
			node.style.boxShadow = shadowBottom;
		}
	};

	/** @param {Event} _e */
	const throttledScrollEvent = (_e) => {
		/** @type {boolean} */
		let throttlingScrollEvents = false;
		if (!throttlingScrollEvents) {
			window.requestAnimationFrame(() => {
				handleScrollShadows();
				throttlingScrollEvents = false;
			});
			throttlingScrollEvents = true;
		}
	};
	handleScrollShadows();
	node.addEventListener('scroll', throttledScrollEvent);
	return {
		destroy() {
			node.removeEventListener('scroll', throttledScrollEvent);
		}
	};
};

export default scrollShadow;
