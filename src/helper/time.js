import moment from 'moment'
import { convertNos } from './dateConverter'
import { addLeadingZero } from './utils'

moment.updateLocale('en', {
	relativeTime: {
		past: '%s अघि',
		m: '1 मिनेट',
		mm: '%d मिनेट',
		h: '1 घण्टा',
		hh: '%d घण्टा',
		d: '1 दिन',
		dd: '%d दिन',
	},
})
export const getRelativeTime = date => {
	let convertedDate = Number(date)
	if (!isNaN(convertedDate) && typeof convertedDate == 'number') {
		return moment(convertedDate)
			.startOf('hour')
			.fromNow()
	} else {
		return moment(date)
			.startOf('hour')
			.fromNow()
	}
}

export const getCurrentTime = () => {
	let hours = moment().hours()
	let minutes = moment().minutes()

	if (hours < 10) {
		hours = addLeadingZero(hours)
	}
	if (minutes < 10) {
		minutes = addLeadingZero(minutes)
	}
	let currentTime = `${hours}:${minutes}`
	let currentTimeInNepali = []
	for (let letter of currentTime) {
		if (letter == ':') {
			currentTimeInNepali.push(letter)
		} else {
			currentTimeInNepali.push(convertNos(letter))
		}
	}
	return currentTimeInNepali.join('')
}
