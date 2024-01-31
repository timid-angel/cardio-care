import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/patient/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('name@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('\'i4%F!WmT*294""');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Appointment' }).click();
  await page.getByRole('button', { name: 'Reserve Appointment' }).click();
  await page.locator('input[name="date"]').fill('2024-02-10');
  await page.locator('input[name="startTime"]').click();
  await page.locator('input[name="startTime"]').fill('01:01');
  await page.locator('input[name="endTime"]').click();
  await page.locator('input[name="endTime"]').fill('02:02');
  await page.getByRole('button', { name: 'Confirm' }).click();
});