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
		M:  '1 महिना',
        MM: '%d महिना',
        y:  '1 बर्ष',
        yy: '%d बर्ष'
	},
})
export const getRelativeTime = (date) => {
	const convertedDate = Number(date)
	if (!isNaN(convertedDate) && typeof convertedDate === 'number') {
		return moment(convertedDate).startOf('hour').fromNow()
	} else {
		return moment(date).startOf('hour').fromNow()
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
	const currentTime = `${hours}:${minutes}`
	const currentTimeInNepali = []
	for (const letter of currentTime) {
		if (letter == ':') {
			currentTimeInNepali.push(letter)
		} else {
			currentTimeInNepali.push(convertNos(letter))
		}
	}
	return currentTimeInNepali.join('')
}
