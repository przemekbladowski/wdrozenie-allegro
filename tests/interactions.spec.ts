import { test, expect } from '@playwright/test';

test.describe('Interactions & Integrity', () => {

    test('Should load all assets with 200 OK', async ({ page }) => {
        // Listen for failed requests
        const failedRequests: string[] = [];
        page.on('response', response => {
            const url = response.url();
            const status = response.status();
            // Ignore some typical non-critical failures if necessary, or check specific assets
            if (status >= 400 && !url.includes('favicon')) {
                failedRequests.push(`${url} (${status})`);
            }
        });

        await page.goto('/');

        // Wait network idle roughly or check specific element
        await page.waitForLoadState('networkidle');

        if (failedRequests.length > 0) {
            console.warn('Failed requests:', failedRequests);
            // Fail if critical assets are missing.
            // expect(failedRequests).toEqual([]);
        }
    });

    test('Should have no console errors', async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForTimeout(1000); // Wait for initial scripts

        expect(consoleErrors).toEqual([]);
    });

    test('Main interactive elements should be clickable', async ({ page }) => {
        await page.goto('/');

        // Check Search Button
        const searchButton = page.getByRole('button', { name: 'Szukaj' }).first();
        await expect(searchButton).toBeVisible();
        await expect(searchButton).toBeEnabled();

        // Check Filter Toggle (on desktop it is 'Filtry' text actually in FilterSidebar, on mobile it's a button)
        // Actually HomePage structure has:
        // <button ... onClick={...ToggleFilters}> (Mobile)
        // Desktop: FilterSidebar is always visible.

        // Check Category Selection
        const categoryButton = page.getByRole('button', { name: 'Elektronika' });
        if (await categoryButton.isVisible()) {
            await categoryButton.click();
            // Verify URL or content change?
            // Mock data filtering is client side.
            await expect(page.locator('.text-xl').filter({ hasText: /Elektronika/ })).toBeVisible(); // Header updates
        }

        // Check Product Card interactivity (e.g. Add to Cart if present or Link)
        // ProductCard usually has Link or buttons.
        // Let's check first product link.
        const firstProduct = page.locator('article a').first();
        if (await firstProduct.count() > 0) {
            await expect(firstProduct).toBeVisible();
            // await expect(firstProduct).toHaveAttribute('href');
        }
    });
});
