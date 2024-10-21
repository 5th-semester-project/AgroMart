const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function buyerRegistrationTest() {
    // Set up the WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to your app (replace with the correct URL)
        await driver.get('http://localhost:3000');

        // Maximize browser window
        await driver.manage().window().maximize();

        // Wait for the Buyer Registration Modal to be present (adjust the XPath or CSS selector as needed)
        await driver.wait(until.elementLocated(By.css('.modal-title')), 10000);

        // Fill out the form

        // Wait for the email input and fill it
        const emailInput = await driver.findElement(By.css('input[placeholder="Your email address"]'));
        await emailInput.sendKeys('test@example.com'); // Replace with your test email

        // Wait for the full name input and fill it
        const fullNameInput = await driver.findElement(By.css('input[placeholder="your full name"]'));
        await fullNameInput.sendKeys('Test User'); // Replace with your test full name

        // Wait for the phone number input and fill it
        const phoneInput = await driver.findElement(By.css('input[placeholder="Your Phone number"]'));
        await phoneInput.sendKeys('0712345678'); // Replace with a valid test phone number

        // Select a province from the dropdown
        const provinceSelect = await driver.findElement(By.css('.select-trigger'));
        await provinceSelect.click();
        const provinceOption = await driver.findElement(By.css('div[role="option"][data-value="Central Province"]')); // Adjust to match the correct province option
        await provinceOption.click();

        // Select a district from the dropdown
        const districtSelect = await driver.findElement(By.css('.select-trigger'));
        await districtSelect.click();
        const districtOption = await driver.findElement(By.css('div[role="option"][data-value="Colombo"]')); // Adjust to match the correct district option
        await districtOption.click();

        // Fill in the area
        const areaInput = await driver.findElement(By.css('input[placeholder="Enter your area"]'));
        await areaInput.sendKeys('Some Area'); // Replace with a test area

        // Fill in the address
        const addressInput = await driver.findElement(By.css('input[placeholder="Enter your address"]'));
        await addressInput.sendKeys('123 Test Street'); // Replace with a test address

        // Submit the form
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        // Wait for a successful toast message or redirection (adjust according to your app behavior)
        await driver.wait(until.elementLocated(By.css('.success-message')), 10000); // Adjust selector as needed

        // Verify that the form submission was successful (for example, by checking the URL or success message)
        const currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('/some-success-page')); // Adjust to your success URL

        console.log('Test Passed: Buyer registration completed successfully!');
    } catch (error) {
        console.error('Test Failed:', error);
    } finally {
        // Quit the browser after the test
        await driver.quit();
    }
})();
