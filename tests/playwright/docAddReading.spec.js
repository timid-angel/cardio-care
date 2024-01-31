import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/doctor/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('doctor1@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('doctor1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Patients List' }).click();
  await page.locator('div').filter({ hasText: 'Fpat M. Lpat ID:' }).nth(1).click();
   
  await page.locator('input[name="value"]').click();
  await page.locator('input[name="value"]').fill('72');
  await page.locator('input[name="date"]').fill('2024-01-31');
  await page.getByRole('button', { name: 'Confirm' }).click();
  
});