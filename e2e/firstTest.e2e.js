describe('Example', () => {
	beforeEach(async () => {
		await device.reloadReactNative()
	})

	it('should have weather component', async () => {
		await expect(element(by.id('weatherComponent'))).toBeVisible()
	})

	it('should go to corona screen', async () => {
		await element(by.id('coronaScreen')).tap()
		await expect(element(by.text('राष्ट्रिय'))).toBeVisible()
	})
})
