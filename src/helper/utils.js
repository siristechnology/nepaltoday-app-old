export const addLeadingZero = val => {
	return '0' + val
}

export const convertToNepaliDigit = val => {
	let num = val + ''
	let result = ''

	for (let i = 0; i < num.length; i++) {
		result += convertNo(num[i])
	}
	return result
}

function convertNo(t) {
	switch (t) {
		case '०':
			return 0
		case '१':
			return 1
		case '२':
			return 2
		case '३':
			return 3
		case '४':
			return 4
		case '५':
			return 5
		case '६':
			return 6
		case '७':
			return 7
		case '८':
			return 8
		case '९':
			return 9
		case '0':
			return '०'
		case '1':
			return '१'
		case '2':
			return '२'
		case '3':
			return '३'
		case '4':
			return '४'
		case '5':
			return '५'
		case '6':
			return '६'
		case '7':
			return '७'
		case '8':
			return '८'
		case '9':
			return '९'
		case 0:
			return '०'
		case 1:
			return '१'
		case 2:
			return '२'
		case 3:
			return '३'
		case 4:
			return '४'
		case 5:
			return '५'
		case 6:
			return '६'
		case 7:
			return '७'
		case 8:
			return '८'
		case 9:
			return '९'
	}
}
