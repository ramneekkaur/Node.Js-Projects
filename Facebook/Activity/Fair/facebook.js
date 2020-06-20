let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let pageName = process.argv[3];
let postToLike = process.argv[4];
let login, pwd, email;
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login;
    email = credentials.email;
    pwd = credentials.pwd;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo: 400
        
    });
    // creates an empty page
    // await browser.newPage();
    // returns array of curently open tab
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(login, {
        waitUntil: "networkidle2"
    });
    // 2.
    //wait for element
    await tab.waitForSelector("#email");
    await tab.type("#email", email, { delay: 100 });
    // console.log("Email entered");
    await tab.waitForSelector("#pass");
    await tab.type("#pass", pwd, { delay: 100 });
    await tab.waitForSelector("#loginbutton");
    
    await navigationHelper(tab, "#loginbutton");


    await tab.goto(`https://www.facebook.com/${pageName}/`, { waitUntil: "networkidle2" });
    // multiple url  change
    await Promise.all([tab.click("div[data-key='tab_posts']"), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    let idx = 0
    do {
        // _1xnd> ._4-u2.4-u8
        await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");

        let allposts = await tab.$$("#pagelet_timeline_main_column ._1xnd>._4-u2._4-u8");
        let cPost = allposts[idx];
        let cPostLike = await cPost.$("._666k ._8c74 a");
        await cPostLike.click({ delay: 300 });
        idx++;

        await tab.waitForSelector(".uiMorePagerLoader", { hidden: true });

    } while (idx < postToLike)
   // user,pwd,url

})()

async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}