
const merge = (result: any, obj : any) => {
	for (var o in obj) {
		if ((typeof obj[o] == 'object') && (Object.getPrototypeOf(obj[o]) === Object.prototype)) {
			if (! (o in result)) result[o] = {}
			if ((typeof result[o] == 'object') && (Object.getPrototypeOf(result[o]) === Object.prototype)) {
				merge(result[o], obj[o])
			} else {
				result[o] = obj[o]
			}
		} else {
			result[o] = obj[o]
		}
	}
}

export default merge