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
  await page.getByRole('link', { name: 'Logo Add Receptionist ' }).click();
  await page.getByLabel('First Name:').click();
  await page.getByLabel('First Name:').fill('Rfirst');
  await page.locator('#middleName').click();
  
  await page.locator('#middleName').fill('Rmiddle');
  await page.getByLabel('Middle Name:').click();
  await page.getByLabel('Middle Name:').fill('Llast');
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('recep@email.com');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('receptionist');
  await page.getByLabel('Gender:').selectOption('female');
  await page.getByLabel('Phone Number:').click();
  await page.getByLabel('Phone Number:').fill('0900000000');
  await page.getByLabel('City:', { exact: true }).click();
  await page.getByLabel('City:', { exact: true }).fill('addis');
  await page.getByLabel('Subcity:').click();
  await page.getByLabel('Subcity:').fill('arada');
  await page.getByLabel('Woreda:').click();
  await page.getByLabel('Woreda:').fill('12');
  await page.getByLabel('House Number:').fill('2');
  await page.getByLabel('House Number:').click();
  await page.getByLabel('House Number:').fill('23');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Create Receptionist' }).click();
});