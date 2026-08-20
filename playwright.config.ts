import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    timeout: 60000,
    use: {
        headless: true,
        testIdAttribute: 'data-test',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },



    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
        },

        {
            name: 'chromium',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/standard-user.json',
            },
        },

        {
            name: 'firefox',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Firefox'],
                storageState: 'playwright/.auth/standard-user.json',
            },
        },

        {
            name: 'webkit',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Safari'],
                ignoreHTTPSErrors: true,
                storageState: 'playwright/.auth/standard-user.json',
            },
        },
    ]
});