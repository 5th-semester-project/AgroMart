const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function clerkLoginTest() {
    // Set up the WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the Clerk authentication page
        await driver.get('http://localhost:3000/sign-in'); // Replace with the correct login route for Clerk

        // Wait until Clerk login form is visible (adjust ID or class based on Clerk's form structure)
        await driver.wait(until.elementLocated(By.css('input[type="email_code"]')), 5000);
        console.log('Clerk login form is visible');
        // Locate the input fields and submit button
        const emailInput = await driver.findElement(By.css('input[type="email"]'));
        // const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));

        // Input test credentials (replace with valid test values)
        await emailInput.sendKeys('test@example.com'); // Replace with your test email
        await passwordInput.sendKeys('password123');   // Replace with your test password

        // Click the login button
        await loginButton.click();

        // Wait for Clerk to handle the login process and redirect
        await driver.wait(until.urlContains('/dashboard'), 10000); // Adjust to your post-login dashboard URL

        // Verify the redirection URL to confirm login was successful
        const currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('/dashboard')); // Adjust based on the expected URL after login
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Clean up and close the browser
        await driver.quit();
    }
})();
