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
  await page.getByRole('link', { name: 'Logo Register Doctor ' }).click();
  await page.getByLabel('First Name:').click();
  await page.getByLabel('First Name:').fill('fdoc');
  await page.getByLabel('Middle Name:').click();
  await page.getByLabel('Middle Name:').fill('mdoc');
  await page.getByLabel('Last Name:').click();
  await page.getByLabel('Last Name:').fill('ldoc');
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('doctor1@email.com');
  await page.locator('[id="\\ expertise"]').click();
  await page.locator('[id="\\ expertise"]').fill('neurologist');
  await page.getByLabel('Phone Number:').click();
  await page.getByLabel('Phone Number:').fill('0900000000');
  await page.locator('#cellPhoneNumber').click();
  await page.locator('#cellPhoneNumber').fill('0900000000');
  await page.getByLabel('Expertise:').click();
  await page.getByLabel('Expertise:').fill('addis');
  await page.getByLabel('Subcity:').click();
  await page.getByLabel('Subcity:').fill('arada');
  await page.getByLabel('Woreda:').click();
  await page.getByLabel('Woreda:').fill('1');
  await page.getByLabel('House Number:').click();
  await page.getByLabel('House Number:').fill('2213');
  await page.getByLabel('Date of Birth:').fill('2021-01-12');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('doctor1');
  
  await page.getByLabel('Upload Image:').setInputFiles('tests/playwright/uploads/logo.png');
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Add Doctor' }).click();
  await page.waitForTimeout(5000)
});