import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/receptionist/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('recep@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('receptionist');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('http://localhost:3000/receptionist/dashboard');
  
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('li').filter({ hasText: '1. Full Name : Fpat Mpat' }).locator('#reactivateButton').click();
});