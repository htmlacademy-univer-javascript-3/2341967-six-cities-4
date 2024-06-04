import { test, expect } from '@playwright/test';

test.describe('Избранное - неавторизованный пользователь', () => {
  test('Проверка перенаправления на страницу входа при попытке добавить предложение в избранное', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor();
    const firstCardElement = await page.locator('.cities__card').first();
    await firstCardElement.locator('.place-card__bookmark-button').click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173/favorites');
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor();
    const firstCardElements = await page.locator('.cities__card');

    await firstCardElements.first().click();

    await page.locator('.offer__gallery').first().waitFor();

    const addToFavoritesButton = await page.locator('.offer__bookmark-button');
    await addToFavoritesButton.click();
    await page.waitForURL('http://localhost:5173/login');
  });
});

test.describe('Избранное - авторизованный пользователь', () => {
  const getFavoritesCount = async (page) =>
    parseInt((await page.locator('.header__favorite-count').textContent()) || '0');

  const isFavoriteSelected = async (page) => {
    const isFavoriteHidden = await page
      .locator('.place-card__bookmark-button--active')
      .first().isHidden();
    return !isFavoriteHidden;
  };

  test('Пользователь может добавлять и удалять предложения из избранного', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    const userEmail = 'email123444@gmail.com';
    const userPassword = 'validpassword123';

    await page.locator('input[name="email"]').fill(userEmail);
    await page.locator('input[name="password"]').fill(userPassword);

    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5173');
    await page.waitForTimeout(1000);

    await page.locator('.cities__card').first().waitFor();

    const initialFavoritesCount = await getFavoritesCount(page);
    const wasFavoriteInitiallySelected = await isFavoriteSelected(page);
    const favoriteButton = await page.locator('.place-card__bookmark-button').first();

    await favoriteButton.click();

    await page.waitForResponse(
      (resp) =>
        resp.url().includes('/favorite') &&
        resp.status() === (wasFavoriteInitiallySelected ? 200 : 201)
    );
    await page.waitForTimeout(1000);

    const isFavorite = await isFavoriteSelected(page);
    const newFavoritesCount = await getFavoritesCount(page);

    if (wasFavoriteInitiallySelected) {
      expect(isFavorite).toBeFalsy();
      expect(newFavoritesCount).toEqual(initialFavoritesCount - 1);
    } else {
      expect(isFavorite).toBeTruthy();
      expect(newFavoritesCount).toEqual(initialFavoritesCount + 1);
    }

    // Добавляем карточку в избранное, если она была удалена
    if (!isFavorite) {
      await favoriteButton.click();
      await page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() === 201
      );
      await page.waitForTimeout(1000);
    }

    // Проверяем страницу избранных
    await page.goto('http://localhost:5173/favorites');
    await page.waitForSelector(`.favorites__list`);
    const city = await page.locator('.locations__item-link').first().textContent();

    expect(city).toBe('Paris');
    const newFavoritesNumber = (await page.locator('.locations__item-link').all()).length;
    expect(newFavoritesNumber).toBe(newFavoritesCount);
  });
});
