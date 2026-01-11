import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('Home Page should match design', async ({ page }) => {
        // Navigate to the home page
        await page.goto('/');

        // Verification: wait for the header and products to load
        await expect(page.getByRole('link', { name: 'Marketplace' })).toBeVisible();
        await expect(page.getByText('Wybrane dla Ciebie')).toBeVisible();

        // Wait for at least one product to be visible to ensure data is loaded
        await expect(page.locator('.grid > div').first()).toBeVisible();

        // Take a full page screenshot and compare with baseline
        // Note: First run will fail and generate the baseline.
        await expect(page).toHaveScreenshot('home-page-desktop.png', { fullPage: true });
    });
});
