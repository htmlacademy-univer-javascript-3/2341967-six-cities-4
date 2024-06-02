import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test('should redirect unauthorizes users to login page when trying to add offer to favorites',
    async ({ page }) => {
      await page.goto('http://localhost:5173'); // load page

      await page.locator('.cities__card').first().waitFor; // load cards
      const cardElement = await page.locator('.cities__card').first(); // locate first card
      await cardElement.locator('.place-card__bookmark-button').click(); // click add to favorite button
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page

      await page.goto('http://localhost:5173/favorites'); // try to go to favorites
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page

      await page.goto('http://localhost:5173'); // load page

      await page.locator('.cities__card').first().waitFor; // load cards
      const cardElements = await page.locator('.cities__card');

      await cardElements.first().click(); // click the first card

      await page.locator('.offer__gallery').first().waitFor(); // wait for offer page to load

      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      await addToFavoritesButton.click(); // click add to favorite button
      page.waitForURL('http://localhost:5173/login'); // should redirect to login page
    });

  test('should let authorized user add offer to favorites', async ({ page }) => {
    const getFavoritesCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

      const isFavoriteSelected = async () => {
        const isFavoriteHidden = await page
          .locator('.place-card__bookmark-button--active')
          .first().isHidden();
        return !isFavoriteHidden;
      };

    await page.goto('http://localhost:5173'); // load page
    await page.goto('http://localhost:5173/login'); // go to login page

    // fill in the form
    await page.fill('input[name="email"]', 'email@gmail.com');
    await page.fill('input[name="password"]', 'passwrd123');

    // submit the form
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5173');
    await page.waitForTimeout(1000);

    const initialFavoritesCount = await getFavoritesCount();
    const wasFavorite = await isFavoriteSelected();
    const favoriteButton = await page.locator('.place-card__bookmark-button').all();

    // click the button
    await favoriteButton[0].click();
    //wait for server response
    page.waitForResponse(
      (resp) =>
        resp.url().includes('/favorite') &&
        resp.status() === (wasFavorite ? 200 : 201)
    );
    await page.waitForTimeout(1000);

    const isFavorite = await isFavoriteSelected();
    const newFavoritesCount = await getFavoritesCount();

    if (wasFavorite) {
      expect(isFavorite).toBeFalsy();
      expect(newFavoritesCount).toEqual(initialFavoritesCount - 1);
    } else {
      expect(isFavorite).toBeTruthy();
      expect(newFavoritesCount).toEqual(initialFavoritesCount + 1);
    }
  });
});
