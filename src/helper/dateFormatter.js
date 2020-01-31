import {
	AD2BS,
	getNepaliMonthsInNepali,
	convertNos,
	getCurrentDayName,
} from './dateConverter'

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
			currentDayNameInNepali = 'शनिवार'
			break
	}
	return currentDayNameInNepali
}

const getFormattedCurrentNepaliDate = () => {
	let currentDate = new Date()
	let dateString = currentDate.toISOString()
	dateString = dateString.slice(0, 10)
	let nepaliDateString = AD2BS(dateString)

	return `${getCurrentDayNameInNepali()}, ${
		getNepaliMonthsInNepali()[parseInt(nepaliDateString.slice(5, 7)) - 1]
	} ${convertNos(nepaliDateString.slice(8, 9))}${convertNos(
		nepaliDateString.slice(9, 10),
	)}`
}

export { getCurrentDayNameInNepali, getFormattedCurrentNepaliDate }
