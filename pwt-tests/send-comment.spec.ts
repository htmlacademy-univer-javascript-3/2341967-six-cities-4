import { test, expect } from '@playwright/test';

test.describe('Отправка комментариев', () => {
  test('Неавторизованный пользователь не может отправлять комментарий', async ({ page }) => {

    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor();
    const cardElements = await page.locator('.cities__card');

    await cardElements.first().click();

    await page.locator('.offer__gallery').first().waitFor();

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).toBeTruthy();
  });

  test('Авторизованный пользователь может отправлять комментарии', async ({ page }) => {

    await page.goto('http://localhost:5173');
    await page.goto('http://localhost:5173/login');

    const userEmail = 'email123444@gmail.com';
    const wrongPassword = 'vvvvvvv6';

    await page.locator('input[name="email"]').fill(userEmail);
    await page.locator('input[name="password"]').fill(wrongPassword);

    await page.click('button[type="submit"]');

    await page.locator('.cities__card').first().waitFor();
    const cardElement = await page.locator('.cities__card').first();

    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();

    await page.waitForURL(`http://localhost:5173/offer/${cardId}`);
    await page.locator('.offer__gallery').first().waitFor();

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).not.toBeTruthy();

    const reviewText = 'Красивый вид из окна! Я очень люблю, когда в номере есть большое окно с хорошим видом.';
    await page.fill('.reviews__form textarea[name="review"]', reviewText);

    const ratingInputs = await page.locator('.form__rating-label').all();
    await ratingInputs[1].click();

    await page.click('.reviews__form button[type="submit"]');

    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/comments/${cardId}`) && resp.status() === 201);

    await page.locator('.reviews__item').first().waitFor();
    const newReview = await page.locator('.reviews__item').first();

    const newReviewText = await newReview.locator('.reviews__text').textContent();
    expect(newReviewText?.trim()).toBe(reviewText);

    const newReviewRating = await newReview?.locator('.reviews__stars').first()?.getAttribute('data-test');
    expect(parseInt(String(newReviewRating).replace(/^\D+/g, ''))).toBe(4 * 20);

    const newReviewUser = await newReview.locator('.reviews__user-name').textContent();
    const headerUserElement = await page.locator('.header__user-name');
    const headerUser = await headerUserElement.textContent();
    expect(newReviewUser?.trim()).toBe(headerUser?.trim().split('@')[0]);
  });
});
