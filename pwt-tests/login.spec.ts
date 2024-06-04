import { test, expect } from '@playwright/test';

test.describe('Проверка формы входа', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.header__nav-link').first().waitFor();
    const loginLink = page.locator('.header__login');

    await loginLink.first().click();
    await page.waitForURL('http://localhost:5173/login');
  });

  test('Ошибка при неверном пароле', async ({ page }) => {
    const userEmail = 'email123444@gmail.com';
    const wrongPassword = 'vvvvvvv';

    await page.locator('input[name="email"]').fill(userEmail);
    await page.locator('input[name="password"]').fill(wrongPassword);

    await page.locator('button[type="submit"]').click();
    await page.locator('.Toastify__toast-body').first().waitFor();

    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('Успешный вход с правильными данными', async ({ page }) => {
    const userEmail = 'email123444@gmail.com';
    const userPassword = 'vvvvvvv33';

    await page.locator('input[name="email"]').fill(userEmail);
    await page.locator('input[name="password"]').fill(userPassword);

    await page.locator('button[type="submit"]').click();

    await page.waitForResponse((response) => response.url().includes('/six-cities/login') && response.status() === 201);
    await page.waitForURL('http://localhost:5173/'); // Должно произойти перенаправление на главную страницу

    const userNameElement = page.locator('.header__user-name');
    const displayedEmail = await userNameElement.getAttribute('data-test');
    expect(displayedEmail).toBe(userEmail);
  });
});
