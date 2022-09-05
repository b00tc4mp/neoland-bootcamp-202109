const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        //   const page = await browser.newPage();
        //   await page.goto('https://example.com');
        //   await page.screenshot({ path: 'example.png' });

        await browser.close();
    } catch (error) {
        console.error(error)
    }
})();