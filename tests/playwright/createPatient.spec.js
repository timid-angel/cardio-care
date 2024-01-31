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
  // await page.goto('http://localhost:3000/receptionist/dashboard');
  
  await page.getByRole('link', { name: 'Add Patient' }).click();
  await page.getByLabel('First Name:').click();
  await page.getByLabel('First Name:').fill('Fpat');
  await page.getByLabel('Middle Name:').click();
  await page.getByLabel('Middle Name:').fill('Mpat');
  await page.getByLabel('Last Name:').click();
  await page.getByLabel('Last Name:').fill('Lpat');
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('name@email.com');
  await page.getByLabel('Phone Number:').click();
  await page.getByLabel('Phone Number:').fill('0900000000');
  await page.getByLabel('City:', { exact: true }).click();
  await page.getByLabel('City:', { exact: true }).fill('addis');
  await page.getByLabel('Subcity:').click();
  await page.getByLabel('Subcity:').fill('a');
  await page.getByLabel('Woreda:').click();
  await page.getByLabel('Woreda:').fill('21');
  await page.getByLabel('House Number:').fill('2');
  await page.getByLabel('House Number:').click();
  await page.getByLabel('House Number:').fill('233');
  await page.getByLabel('Date of Birth:').fill('2024-01-10');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('\'i4%F!WmT*294""');
  // await page.getByLabel('Upload Image:').click();
  await page.getByLabel('Upload Image:').setInputFiles('tests/playwright/uploads/logo.png');
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Add Patient' }).click();
  await page.waitForTimeout(5000)
});

// await page.locator('input[name="albumArt"]').click();
//   await page.locator('input[name="albumArt"]').setInputFiles('test/upload/albumPlaceholder.png');