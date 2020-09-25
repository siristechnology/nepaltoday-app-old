describe('Nepaltoday Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Load Home Screen', async () => {
    await expect(element(by.text('वार'))).toBeVisible()
  })
});
