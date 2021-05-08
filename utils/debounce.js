export default function debounce (fn, wait, immediate) {
	let t = null

	let debounce = function () {
		const args = arguments
		let result;
		if (t) {
			clearTimeout(t)
		}

		if (immediate) {
			let exec = !t
			t = setTimeout(() => {
				t = null
			}, wait);
			if (exec) {
				result = fn.apply(this, args)
			}
			return result
		} else {
			t = setTimeout(() => {
				result = fn.apply(this, args)
			}, wait);
			return result
		}
	}
	debounce.cancel = function () {
		clearTimeout(t)
		t = null
	}
	return debounce
}