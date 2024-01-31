import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/receptionist/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('receptionist321@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('receptionist321');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('http://localhost:3000/admin/login');
  await expect(page.getByText('Welcome, Admin Sample error')).toBeVisible();
});