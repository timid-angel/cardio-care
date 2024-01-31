import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('admin@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin1');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Logo Manage Receptionists ' }).click();
  
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).first().click();
});