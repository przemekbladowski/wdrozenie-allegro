import { test, expect } from '@playwright/test';

test.describe('RWD Layout Tests', () => {

    test('iPhone 13 Viewport', async ({ page }) => {
        // Override viewport for iPhone 13 dimensions
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');

        // Verify Mobile Layout
        // Sidebar should be hidden (hidden lg:block)
        await expect(page.locator('aside')).toBeHidden();

        // Wait for content
        await expect(page.locator('.grid > div').first()).toBeVisible();

        // Screenshot
        await expect(page).toHaveScreenshot('rwd-iphone13.png', { fullPage: true });
    });

    test('Desktop 1920x1080 Viewport', async ({ page }) => {
        // Override viewport for Full HD Desktop
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');

        // Verify Desktop Layout
        // Sidebar should be visible
        await expect(page.locator('aside')).toBeVisible();

        // Wait for content
        await expect(page.locator('.grid > div').first()).toBeVisible();

        // Screenshot
        await expect(page).toHaveScreenshot('rwd-desktop-1080p.png', { fullPage: true });
    });

});
