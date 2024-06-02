import { test, expect } from '@playwright/test';

test.describe('Send Comment', () => {
  test('should not let unauthorized user send comment', async ({ page }) => {
    await page.goto('http://localhost:5173'); // load page

    await page.waitForSelector('.cities__card'); // load cards
    const cardElements = await page.locator('.cities__card');

    await cardElements.first().click(); // click the first card

    await page.waitForSelector('.offer__gallery'); // wait for offer page to load

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).toBeTruthy(); // expect the comment form to be hidden
  });

  test('should let authorized user send comment', async ({ page }) => {
    await page.goto('http://localhost:5173'); // load page
    await page.goto('http://localhost:5173/login'); // go to login page

    // fill in the form
    await page.fill('input[name="email"]', 'email@gmail.com');
    await page.fill('input[name="password"]', 'passwrd123');

    // submit the form
    await page.click('button[type="submit"]');

    await page.waitForSelector('.cities__card'); // load cards
    const cardElement = await page.locator('.cities__card').first();

    // get first card's id
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click(); // click the first card

    await page.waitForURL(`http://localhost:5173/offer/${ cardId}`); // wait for offer page to load
    await page.waitForSelector('.offer__gallery');

    const commentForm = await page.locator('.reviews__form');
    expect(await commentForm.isHidden()).not.toBeTruthy(); // expect the comment form to be visible

    // send comment
    const reviewText = 'this is a test message which is at least 50 charachters long.';
    await page.fill('[name="review"]', reviewText); // set review text

    const ratingInputs = await page.locator('.form__rating-label').all();
    await ratingInputs[1].click(); // set rating to 4 stars

    await page.click('button[type="submit"]');

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/comments/${ cardId}`) && resp.status() === 201);

    // wait for reviews to reload
    await page.waitForSelector('.offer__gallery');
    const newReview = await page.locator('.reviews__item').first();

    const newReviewText = await newReview?.locator('.reviews__text').first()?.evaluate((el) =>
      el.textContent?.trim()
    );

    expect(newReviewText).toBe(reviewText); // make sure submitted review text is correct

    const newReviewRating = await newReview?.locator('.reviews__stars').first()?.getAttribute('data-test');
    expect(parseInt(String(newReviewRating).replace(/^\D+/g, ''))).toBe(4 * 20); // make sure rating is correct

    const newReviewUser = await newReview?.locator('.reviews__user-name').first()?.evaluate((el) =>
      el.textContent?.trim()
    );
    const element = await page.locator('.header__user-name').first();
    const headerUser = await element?.getAttribute('data-test');
    expect(newReviewUser).toBe(headerUser?.split('@')[0]); // make sure username in comment matches email in header
  });
});
