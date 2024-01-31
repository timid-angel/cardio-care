import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/patient/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('patient32@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('patient32');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Cardio Care Logout Royal')).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('Welcome, Patient Sample error')).toBeVisible();
});