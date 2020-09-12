import { np } from '../lang/np'
import { en } from '../lang/en'

const {
	menu: { POLITICS, ENTERTAINMENT, BUSINESS, OPINION, SOCIAL, NEWS, SPORTS, HEALTH, TECHNOLOGY, AGRICULTURE },
} = en

const { menu } = np

export const getLocalName = (name) => {
	switch (name) {
		case POLITICS:
			return menu.POLITICS
		case ENTERTAINMENT:
			return menu.ENTERTAINMENT
		case BUSINESS:
			return menu.BUSINESS
		case OPINION:
			return menu.OPINION
		case SOCIAL:
			return menu.SOCIAL
		case SPORTS:
			return menu.SPORTS
		case NEWS:
			return menu.NEWS
		case HEALTH:
			return menu.HEALTH
		case TECHNOLOGY:
			return menu.TECHNOLOGY
		case AGRICULTURE:
			return menu.AGRICULTURE
		default:
			return menu.NEWS
	}
}
