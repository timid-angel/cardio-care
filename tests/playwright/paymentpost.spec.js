import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/patient/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('name@email.com');
  await page.getByPlaceholder('Password').click();
  
  await page.getByPlaceholder('Password').fill('\'i4%F!WmT*294""');
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(2000)
  await page.locator('#payment').click();
  await page.getByLabel('Patient Email:').click();
  await page.getByLabel('Patient Email:').fill('name@email.com');
  await page.locator('#image').setInputFiles('tests/playwright/uploads/logo.png');
  await page.getByLabel('I agree to the terms and').check();
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Send now' }).click();
  await page.waitForTimeout(2000)
});