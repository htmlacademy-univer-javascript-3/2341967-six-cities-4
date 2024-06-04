import { test, expect } from '@playwright/test';

test.describe('Сортировка объявлений', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.cities__card').first().waitFor();
    const filterMenu = await page.locator('.places__sorting-type').first();
    filterMenu.click();
  });

  test('Сортировка по рейтингу (сначала наивысший рейтинг)', async ({ page }) => {
    const filters = await page.locator('.places__option').all();
    await filters[3].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const ratingsLocators = await page.locator('.place-card__rating').all();
    const ratings = await Promise.all(ratingsLocators.map(async (locator) => {
      const rating = await locator.getAttribute('data-test');
      return parseFloat(String(rating).replace(/^\D+/g, '') ?? '0');
    }));

    const sortedRatings = [...ratings].sort((a, b) => b - a);
    expect(ratings).toEqual(sortedRatings);
  });

  test('Сортировка по цене (от низкой до высокой)', async ({ page }) => {
    const filters = await page.locator('.places__option').all();
    await filters[1].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();
    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    }));

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });


  test('Сортировка по цене (от высокой до низкой)', async ({ page }) => {
    const filters = await page.locator('.places__option').all();
    await filters[2].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();
    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    }));

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});

test.describe('Сортировка городов', () => {
  test('Сортировка городов по карточкам', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.cities__card').first().waitFor();
    const locations = await page.locator('[role="tab"]').all();
    for (const location of locations) {
      const cityNameTab = await location.getAttribute('city-name');
      await location.click();
      await page.waitForTimeout(1000);
      await page.locator('.places__found').first().waitFor();
      await page.locator('.cities__card').first().waitFor();
      const cardElements = await page.locator('.cities__card').all();
      expect(cardElements.length).toBeGreaterThan(0);
      const boardText = await page.locator('.places__found').first()?.evaluate((el) =>
        el.textContent?.trim()
      );
      const cityNameBoard = boardText?.split(' ').pop();
      expect(cityNameTab).toBe(cityNameBoard);
    }
  });
});
