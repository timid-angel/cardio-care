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
  await page.locator('li').filter({ hasText: '5. Full Name : Fpat Mpat' }).locator('#linkButton').click();
  await page.getByPlaceholder('Enter Doctor Email').click();
  await page.getByPlaceholder('Enter Doctor Email').fill('doctor1@email.com');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Link as Main Doctor' }).click();
  await page.waitForTimeout(5000)
});