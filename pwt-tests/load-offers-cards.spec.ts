import { test, expect } from '@playwright/test';

test.describe('Loading Cards from server', () => {
  test('should load cards from server correctly', async ({ page }) => {
    await page.goto('http://localhost:5173'); // load page

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/offers') && resp.status() === 200);

    await page.locator('.cities__card').first().waitFor(); // load cards

    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0); // make sure there's at least one card

    for (const element of cardElements) {
      // check that all cards have following text
      const text = await element.innerText();
      expect(text).toContain('night');
      expect(text).toContain('To bookmarks');
      expect(text).toContain('Rating');

      // check that all cards have prices
      const number = text.replace(/^\D+/g, '');
      const isNumber = !isNaN(parseInt(number)) && isFinite(parseInt(number));
      expect(isNumber).toBe(true);
    }
  });
});
