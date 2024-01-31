import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('http://localhost:3000/patient/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('name@email.com');
  await page.getByPlaceholder('Password').click();
  
  await page.getByPlaceholder('Password').fill('\'i4%F!WmT*294""');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#transfer').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
});