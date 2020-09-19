const formatCoronaNumber = (number) => {
	let formattedValue = null
	if (number > 1000000) {
		formattedValue = Math.round((number / 1000000) * 10) / 10 + 'M'
	} else if (number > 10000) {
		formattedValue = Math.round(number / 1000) + 'K'
	} else {
		formattedValue = number
	}
	return formattedValue
}

export { formatCoronaNumber }
