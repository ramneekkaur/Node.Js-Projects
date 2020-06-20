let puppeteer = require("puppeteer");

(async function(){
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized", "--incognito"]
    });

    let numberofpages = await browser.pages();
    let tab = numberofpages[0];

    await tab.goto("https://www.google.com");
})()