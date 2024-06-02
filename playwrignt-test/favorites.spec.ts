import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test('should redirect unauthorizes users to login page when trying to add offer to favorites',
    async ({ page }) => {
      await page.goto('http://localhost:5173'); // load page

      await page.waitForSelector('.cities__card'); // load cards
      const cardElement = await page.locator('.cities__card').first(); // locate first card
      await cardElement.locator('.place-card__bookmark-button').click(); // click add to favorite button
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page

      await page.goto('http://localhost:5173/favorites'); // try to go to favorites
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page

      await page.goto('http://localhost:5173'); // load page

      await page.waitForSelector('.cities__card'); // load cards
      const cardElements = await page.locator('.cities__card');

      await cardElements.first().click(); // click the first card

      await page.waitForSelector('.offer__gallery'); // wait for offer page to load

      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      await addToFavoritesButton.click(); // click add to favorite button
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page
    });

  test('should let authorized user add offer to favorites', async ({ page }) => {
    const getFavoritesCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173'); // load page
    await page.goto('http://localhost:5173/login'); // go to login page

    // fill in the form
    await page.fill('input[name="email"]', 'email@gmail.com');
    await page.fill('input[name="password"]', 'passwrd123');

    // submit the form
    await page.click('button[type="submit"]');

    await page.waitForSelector('.cities__card'); // load cards


    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card'); // load cards

    // get first card's id
    const cardElement = await page.locator('.cities__card').first();
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    const initialFavoritesCount = await getFavoritesCount();

    const addToFavoritesButton = await page.locator('.place-card__bookmark-button').all();
    await addToFavoritesButton[0].click(); // add offer to favorite
    //wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/${ cardId }/1`)
         && resp.status() === 201);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount + 1);

    await addToFavoritesButton[0].click(); // remove offer from favorite
    //wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/${ cardId }/0`) && resp.status() === 200);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount);
  });
});
