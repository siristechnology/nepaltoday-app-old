import { getCurrentDayName } from './dateConverter'

const getCurrentDayNameInNepali = () => {
	let currentDayName = getCurrentDayName().toLowerCase()
	let currentDayNameInNepali = ''
	switch (currentDayName) {
		case 'sunday':
			currentDayNameInNepali = 'आइतवार'
			break
		case 'monday':
			currentDayNameInNepali = 'सोमवार'
			break
		case 'tuesday':
			currentDayNameInNepali = 'मंगलवार'
			break
		case 'wednesday':
			currentDayNameInNepali = 'बुधवार'
			break
		case 'thursday':
			currentDayNameInNepali = 'विहिवार'
		case 'friday':
			currentDayNameInNepali = 'शुक्रवार'
			break
		case 'saturday':
			currentDayNameInNepali = 'सोमवार'
			break
	}
	return currentDayNameInNepali
}

export { getCurrentDayNameInNepali }
