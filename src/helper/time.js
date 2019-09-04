import moment from 'moment'
moment.updateLocale('en', {
	relativeTime: {
		past: '%s अघि',
		m: '1 मिनेट',
		mm: '%d मिनेट',
		h: '1 घण्टा',
		hh: '%d घण्टा',
		d: '1 दिन',
		dd: '%d दिन'
	}
})
export const getRelativeTime = date =>
	moment(Number(date))
		.startOf('hour')
		.fromNow()
