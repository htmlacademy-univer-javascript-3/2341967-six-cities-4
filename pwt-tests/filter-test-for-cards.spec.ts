import { test, expect } from '@playwright/test';

test.describe('Filter Cards by Price and Rating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // go to main page

    await page.locator('.cities__card').first().waitFor(); // wait for cards to load

    const filterMenu = await page.locator('.places__sorting-type').first();
    filterMenu.click(); // click on filters dropout menu
  });


  test('should filter cards by price (low to high) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[1].click(); // click on filter option

    await page.locator('.places__found').first().waitFor(); // wait for page to reload
    await page.locator('.cities__card').first().waitFor(); // wait for cards to load

    const cardElements = await page.locator('.cities__card').all(); // get cards
    expect(cardElements.length).toBeGreaterThan(0); // make sure there's at least 1

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    })); // get all offers prices

    const sortedPrices = [...prices].sort((a, b) => a - b); // sort prices low to high
    expect(prices).toEqual(sortedPrices);
  });

  test('should filter cards by price (high to low) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[2].click(); // click on filter option

    await page.locator('.places__found').first().waitFor(); // wait for page to reload
    await page.locator('.cities__card').first().waitFor(); // wait for cards to load

    const cardElements = await page.locator('.cities__card').all(); // get cards
    expect(cardElements.length).toBeGreaterThan(0); // make sure there's at least 1

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    })); // get all offers prices

    const sortedPrices = [...prices].sort((a, b) => b - a); // sort prices high to low
    expect(prices).toEqual(sortedPrices);
  });

  test('should filter cards by rating (top rated first) correctly', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    await filters[3].click(); // click on filter option

    await page.locator('.places__found').first().waitFor(); // wait for page to reload
    await page.locator('.cities__card').first().waitFor(); // wait for cards to load

    const cardElements = await page.locator('.cities__card').all(); // get cards
    expect(cardElements.length).toBeGreaterThan(0); // make sure there's at least 1

    const ratingsLocators = await page.locator('.place-card__rating').all();

    const ratings = await Promise.all(ratingsLocators.map(async (locator) => {
      const rating = await locator.getAttribute('data-test');
      return await parseFloat(String(rating).replace(/^\D+/g, '') ?? '0');
    })); // get all offers ratings

    const sortedRatings = [...ratings].sort((a, b) => b - a); // sort ratings high to low
    expect(ratings).toEqual(sortedRatings);
  });
});

test.describe('Filter Cards by City', () => {
  test('should filter cards by city correctly', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor(); // wait for cards to load

    const locations = await page.locator('.locations__item-link').all(); // get tabs with cities
    for (const location of locations) {
      const cityNameTab = await location.getAttribute('city-name'); // get city name from tab

      await location.click(); // click the element

      await page.locator('.places__found').first().waitFor(); // wait for page to reload
      await page.locator('.cities__card').first().waitFor(); // wait for cards to reload

      const cardElements = await page.locator('.cities__card').all(); // get cards
      expect(cardElements.length).toBeGreaterThan(0); // make sure there's at least 1

      const boardText = await page.locator('.places__found').first()?.evaluate((el) =>
        el.textContent?.trim()
      );
      const cityNameBoard = boardText?.split(' ').pop(); // get city name from offers board
      expect(cityNameTab).toBe(cityNameBoard); // compare cities
    }
  });
});
