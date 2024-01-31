import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/patient/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('name@email.com');
  await page.getByText('Sample error message Login').click();
  await page.getByPlaceholder('Password').fill('\'i4%F!WmT*294""');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#transfer').click();
  await page.waitForTimeout(2000)
  await page.getByLabel('Upload file:').setInputFiles('tests/playwright/uploads/user_medical_record.json');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Import' }).click();
  await page.waitForTimeout(2000)
});

// 'tests/playwright/uploads/user_medical_record.json'
