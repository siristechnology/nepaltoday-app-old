jest.setTimeout(100000)

describe('Example', () => {
	beforeEach(async () => {
		await device.reloadReactNative()
	})

	// it('should have weather component', async () => {
	// 	await expect(element(by.id('weatherComponent'))).toBeVisible()
	// })

	// it('should have nepali date', async () => {
	// 	await expect(element(by.id('nepaliDate'))).toBeVisible()
	// })

	it('should load article in home', async () => {
		await expect(element(by.id('homeArticle1'))).toBeVisible()
	})

	it('should show article detail', async () => {
		await element(by.id('homeArticle1')).tap()
		await expect(element(by.id('articleDetail1'))).toBeVisible()
	})

	it('should load category page', async () => {
		await element(by.id('categoryScreen')).tap()
		await expect(element(by.text('समाचार'))).toBeVisible()
	})

	it('should load article in category', async () => {
		await element(by.id('categoryScreen')).tap()
		await expect(element(by.id('headlineArticle1'))).toBeVisible()
	})

	it('should go to corona screen', async () => {
		await element(by.id('coronaScreen')).tap()
		await expect(element(by.text('राष्ट्रिय'))).toBeVisible()
		await expect(element(by.id('totalCase'))).toBeVisible()
		await expect(element(by.id('district1'))).toBeVisible()
		await expect(element(by.id('districtTotalKathmandu'))).toBeVisible()
	})

	it('should go to international corona screen', async () => {
		await element(by.id('coronaScreen')).tap()
		await element(by.text('अन्तर्राष्ट्रिय')).tap()
		await expect(element(by.id('worldTotalCaseIndia'))).toBeVisible()
	})

	it('should go to trending tweets screen', async () => {
		await element(by.id('trendingScreen')).tap()
		await expect(element(by.id('twitter1'))).toBeVisible()
	})

	it('should go to trending figures screen', async () => {
		await element(by.id('trendingScreen')).tap()
		await element(by.text('ट्रेण्डिङ व्यक्तिहरु')).tap()
		await expect(element(by.id('category1'))).toBeVisible()
		await expect(element(by.id('category11'))).toBeVisible()
		await element(by.id('category11')).tap()
		await expect(element(by.text('समाचार'))).toBeVisible()
	})

	it('should go to fm screen', async () => {
		await element(by.id('radioScreen')).tap()
		await element(by.id('header1')).tap()
		await element(by.id('content11')).tap()
		await expect(element(by.id('bottomPlayer'))).toBeVisible()
		await element(by.id('stopPlayer')).tap()
	})
})
