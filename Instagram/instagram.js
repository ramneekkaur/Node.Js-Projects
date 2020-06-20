const puppeteer = require('puppeteer');
let fs = require("fs");
const screenshot = 'instagram.png';
let credentialsFile = process.argv[2];
let postToLike = process.argv[3];
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
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(login, {
        waitUntil: "networkidle2"
    });
	//email
	await tab.waitForSelector("[name='username']");
	await tab.type("[name='username']",  email, { delay: 100 });

	//password
	await tab.waitForSelector("[name='password']");
	await tab.type("[name='password']", pwd, { delay: 100 });

	//the selector of the "Login" button
	
	await tab.evaluate(() => {
		let btns = [...document.querySelector(".HmktE").querySelectorAll("button")];
		btns.forEach(function (btn) {
			if (btn.innerText == "Log In")
				btn.click();
		});
	});

	
	//Save your login info notification
	//Dismiss it - click (not now)
    await tab.waitForSelector(".cmbtv .sqdOP.yWX7d.y3zKF");
    await navigationHelper(tab, ".cmbtv .sqdOP.yWX7d.y3zKF");

	//wait for the home icon then take screenshot of whole page and save it.
	await tab.waitForSelector("svg[aria-label='Home']");

	await tab.screenshot({ path: screenshot });
	console.log('See screenshot: ' + screenshot)
	
	
	//function which sees if the class is visible or not
	const isElementVisible = async (tab, cssSelector) => {
		let visible = true;
		await tab
		  .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
		  .catch(() => {
			visible = false;
		  });
		return visible;
	  };


	//type in a search box
	//in this case it is "nasa"
	await tab.waitForSelector("input[placeholder='Search']");
	
	await tab.type("input[placeholder='Search']",  "nasa", { delay: 100 });
	
    //then enter it to go the main page of nasa
	await tab.keyboard.press('Enter');
	await tab.keyboard.press('Enter');

//follow the page
await tab.waitForSelector(".BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P");

let follow = await isElementVisible(tab,'.BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P');
if(follow){
	await tab
    .click('.BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P')
    .catch(() => {});	
}

console.log("following");

//follow the 6 more pages below which pop up when we follow the main page
await tab.waitForSelector(".EcJQs .ekfSF .Ckrof");

          let i = 0;
		  do{
			let allposts = await tab.$$(".NP414.ccgHY.GZkEI .EcJQs .ekfSF .Ckrof");
			let cPost = allposts[i];
			let cPostLike = await cPost.$(".sqdOP.L3NKy._4pI4F.y3zKF");
			await cPostLike.click({ delay: 300 });

			i++;

		  }while(i < 6);
  
//go to the first pst of the page
await tab.waitForSelector("._2z6nI .ySN3v .Nnq7C.weEfm .v1Nh3.kIKUG._bz0w .eLAPa .KL4Bh .FFVAD");
await Promise.all([
	tab.waitForNavigation({
		waitUntil: "networkidle2"
	}),
	tab.click("._2z6nI .ySN3v .Nnq7C.weEfm .v1Nh3.kIKUG._bz0w .eLAPa .KL4Bh .FFVAD"),
  ]).then((firstPost) => {
	return firstPost[0];
  });
  console.log("first")
  
  //like the n following post and comment to it
  await tab.waitForSelector(".eo2As .ltpMr.Slqrh .fr66n .wpO6b");
   let idx = 0
    do {
		await tab.waitForSelector(".eo2As .ltpMr.Slqrh .fr66n .wpO6b");
        console.log("abc1");
 
//like
  let loadMoreVisible = await isElementVisible(tab,'.eo2As .ltpMr.Slqrh .fr66n .wpO6b');
if(loadMoreVisible){
	await tab
    .click('.eo2As .ltpMr.Slqrh .fr66n .wpO6b')
    .catch(() => {});	
}

  //comment
  await tab.waitForSelector("textarea[aria-label='Add a comment…']");
  await tab.type("textarea[aria-label='Add a comment…']",  "Amazing!!!", { delay: 100 });
  await tab.keyboard.press('Enter');

	console.log("comment");

  await tab.waitForSelector("._2dDPU.CkGkG .EfHg9 a._65Bje.coreSpriteRightPaginationArrow")
  await navigationHelper(tab, "._2dDPU.CkGkG .EfHg9 a._65Bje.coreSpriteRightPaginationArrow");
  console.log("def");
  

idx++;
	}while (idx < postToLike);

	
console.log("liked all posts");


//close the popup of posts
await tab.waitForSelector("svg[aria-label='Close']");
await navigationHelper(tab, "svg[aria-label='Close']");
console.log("close");

//go to main instagram page
await tab.waitForSelector(".cq2ai");
await navigationHelper(tab, ".cq2ai");



   //go to the profile
   await tab.waitForSelector("a[href='/genelia65/']");
   await navigationHelper(tab, "a[href='/genelia65/']");
	
    //click the edit button
	await tab.waitForSelector("a[href='/accounts/edit/']");
    await navigationHelper(tab, "a[href='/accounts/edit/']");
	
	//write down your Bio
	await tab.waitForSelector("#pepBio");
	await tab.type("#pepBio",  '"It has become appallingly obvious that our technology has exceeded our humanity."— Albert Einstein', { delay: 100 });
	
	//then submit 
    await tab.waitForSelector(".sqdOP.L3NKy.y3zKF");
	let submit = await isElementVisible(tab,'.sqdOP.L3NKy.y3zKF');
	if(submit){
		await tab
		.click('.sqdOP.L3NKy.y3zKF')
		.catch(() => {});	
	}
	//go to profile page again
	await tab.goto("https://www.instagram.com/genelia65/", {
        waitUntil: "networkidle2"
    });

	
    //go to option section and click it
	await tab.waitForSelector("svg[aria-label='Options']");
   
	let option = await isElementVisible(tab,"svg[aria-label='Options']");
	if(option){
		await tab
		.click("svg[aria-label='Options']")
		.catch(() => {});	
	}
	console.log("option")
	
	//click the logout button
	const manageTabs = await tab.$$(".RnEpo.Yx5HN .pbNvD.fPMEg ._1XyCr .piCib .mt3GC .aOOlW.HoLwm", { hidden: true });
	
    await Promise.all([manageTabs[8].click(), tab.waitForNavigation({
        waitUntil: "networkidle2"
	})])
	//page is logout

	//now close the browser as well
	await browser.close();

})()

//function to click 
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
		waitUntil: "networkidle2",
		
    }), tab.click(selector)]);
}


 


