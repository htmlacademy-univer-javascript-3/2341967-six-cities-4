import { test, expect } from '@playwright/test';

test('Проверка перехода на страницу карточки', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cities__card');

  // offer info on main page
  const offerCardName = await page.locator('.place-card__name').first().textContent();
  const offerCardPrice = await page.locator('.place-card__price-value').first().textContent();

  await page.locator('.place-card__name').first().click();

  await page.waitForSelector('.offer__inside-list');
  expect(page.url().startsWith('http://localhost:5173/offer/')).toBeTruthy();

  // offer info on offer page
  const offerPageName = await page.locator('.offer__name').textContent();
  const offerPagePrice = await page.locator('.offer__price-value').textContent();

  expect(offerPageName).toBe(offerCardName);
  expect(offerPagePrice).toBe(offerCardPrice);
});
