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

	
	//check if the element asking to download the app arises
	// try {
	// 	await loginPage.waitForSelector("._3m3RQ._7XMpj",{
	// 		timeout:3000
	// 	});
	// 	await loginPage.click("._3m3RQ._7XMpj");
	// } catch (err) {

	// }

	
	//check if the app asks for notifications
	// try {
	// 	await loginPage.waitForSelector(".aOOlW.HoLwm",{
	// 		timeout:5000
	// 	});
	// 	await loginPage.click(".aOOlW.HoLwm");
	// } catch (err) {

    // }
    
    await tab.waitForSelector(".cmbtv .sqdOP.yWX7d.y3zKF");
    //await tab.click("button.sqdOP.yWX7d.y3zKF");
    await navigationHelper(tab, ".cmbtv .sqdOP.yWX7d.y3zKF");

	await tab.waitForSelector("svg[aria-label='Home']");

	await tab.screenshot({ path: screenshot });

	//browser.close()
	console.log('See screenshot: ' + screenshot)
	const isElementVisible = async (tab, cssSelector) => {
		let visible = true;
		await tab
		  .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
		  .catch(() => {
			visible = false;
		  });
		return visible;
	  };

	
//pdf
////////////////////////////////////////////////////
/*const pdfConfig = {
	path: 'instragram.pdf', // Saves pdf to disk. 
	format: 'A4',
	printBackground: true,
	margin: { // Word's default A4 margins
		top: '2.54cm',
		bottom: '2.54cm',
		left: '2.54cm',
		right: '2.54cm'
	}
};

await tab.emulateMedia('screen');
        const pdf = await tab.pdf(pdfConfig); // Return the pdf buffer. Useful for saving the file not to disk. 

        await browser.close();

        const buffer = await Webpage.pdf;

////////////////////////////////////////	
	
console.log("pdf generated");
*/


	await tab.waitForSelector("input[placeholder='Search']");
	
	await tab.type("input[placeholder='Search']",  "nasa", { delay: 100 });
	//await (await page.$('input[type="text"]')).press('Enter');

	await tab.keyboard.press('Enter');
	await tab.keyboard.press('Enter');

//	let firstPost = await tab.$$(".v1Nh3.kIKUG._bz0w .eLAPa .KL4Bh .FFVAD");
	//await Promise.all([firstPost[0].click(),
	//tab.waitFor(10000),
//])


await tab.waitForSelector(".BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P");
//await navigationHelper(tab, "._5f5mN.jIbKX._6VtSN.yZn4P");
let follow = await isElementVisible(tab,'.BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P');
if(follow){
	await tab
    .click('.BY3EC.bqE32 .vBF20._1OSdk ._5f5mN.jIbKX._6VtSN.yZn4P')
    .catch(() => {});	
}

console.log("following");
//////////////////////////////////////////////////////////

await tab.waitForSelector(".EcJQs .ekfSF .Ckrof");


//await tab.waitForSelector(".EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF");
/*await Promise.all([
	tab.waitForNavigation({
		waitUntil: "networkidle2"
	}),
	tab.click(".EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF"),
  ]).then((firstPost) => {
	return firstPost[i];
  });*/

  /*let followOtherPages = await isElementVisible(tab,'.EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF');
if(followOtherPages){
	//await tab
	//.click('.EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF')
	await Promise.all([
		tab.waitForNavigation({
			waitUntil: "networkidle2"
		}),
		tab.click(".EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF"),
	  ]).then((firstPost) => {
		return firstPost[i];
	  });
   // .catch(() => {});	
}*/



        //let allposts = await tab.$$(".EcJQs .ekfSF .Ckrof");
        //let cPost = allposts[i];
        //let cPostLike = await cPost.$("._41KYi .sqdOP.L3NKy._4pI4F.y3zKF");
		//await cPostLike.click({ delay: 300 });
		//let followOtherPages= await isElementVisible(tab,'.EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF');

		/*const elements = await tab.$$('.NP414.ccgHY.GZkEI .EcJQs .ekfSF .Ckrof .sqdOP.L3NKy._4pI4F.y3zKF');

		elements.forEach(async element => {
		  await element.click({delay: 300});
		});*/
		  
		//await page.evaluate(() => {
		//	document.querySelector('a.marketing-button').click();
		  //});

		  let i = 0;
		  do{
			let allposts = await tab.$$(".NP414.ccgHY.GZkEI .EcJQs .ekfSF .Ckrof");
			let cPost = allposts[i];
			let cPostLike = await cPost.$(".sqdOP.L3NKy._4pI4F.y3zKF");
			await cPostLike.click({ delay: 300 });

			i++;

		  }while(i < 6);
  
//////////////////////////////////////////////////////////
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
  await tab.waitForSelector(".eo2As .ltpMr.Slqrh .fr66n .wpO6b");
console.log("abc1");
 // await navigationHelper(tab, ".eo2As .ltpMr.Slqrh .fr66n .wpO6b svg[fill='#262626']");
 
 //let cssSelector = '.eo2As .ltpMr.Slqrh .fr66n .wpO6b';
 
 
 
 let idx = 0
    do {
		await tab.waitForSelector(".eo2As .ltpMr.Slqrh .fr66n .wpO6b");
console.log("abc1");
 

  let loadMoreVisible = await isElementVisible(tab,'.eo2As .ltpMr.Slqrh .fr66n .wpO6b');
if(loadMoreVisible){
	await tab
    .click('.eo2As .ltpMr.Slqrh .fr66n .wpO6b')
    .catch(() => {});	
}

  /*while (loadMoreVisible) {
  await tab
    .click(cssSelector)
    .catch(() => {});
  loadMoreVisible = await isElementVisible(tab, cssSelector);
}*/
 
 // process.exit(0);
  
  console.log("abc2");

  await tab.waitForSelector("textarea[aria-label='Add a comment…']");
	
	await tab.type("textarea[aria-label='Add a comment…']",  "Amazing!!!", { delay: 100 });

	await tab.keyboard.press('Enter');

	console.log("comment");

 // if (await tab.$("._2dDPU.CkGkG .EfHg9 a._65Bje.coreSpriteRightPaginationArrow",{
	//		timeout:5000
	 //	}) !== null) console.log('found');
//else console.log('not found');
  //await tab.waitForSelector("div[role='dialog']> ._65Bje.coreSpriteRightPaginationArrow", { hidden: true });
  await tab.waitForSelector("._2dDPU.CkGkG .EfHg9 a._65Bje.coreSpriteRightPaginationArrow")
  await navigationHelper(tab, "._2dDPU.CkGkG .EfHg9 a._65Bje.coreSpriteRightPaginationArrow");
  console.log("def");
  //await tab.waitForSelector(".uiMorePagerLoader", { hidden: true });

//._2dDPU.CkGkG .EfHg9 .nf1Jg .DdSX2 a._65Bje.coreSpriteRightPaginationArrow

idx++;
	}while (idx < postToLike);

	/*let loadMoreVisible = await isElementVisible(tab,cssSelector );
if(loadMoreVisible){
	await tab
    .click(cssSelector)
    .catch(() => {});	
}*/

console.log("liked all posts");


//._2dDPU.CkGkG .Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG .wpO6b ._8-yf5 

await tab.waitForSelector("svg[aria-label='Close']");
await navigationHelper(tab, "svg[aria-label='Close']");
console.log("close");


await tab.waitForSelector(".cq2ai");
await navigationHelper(tab, ".cq2ai");




await tab.waitForSelector("a[href='/genelia65/']");
   
	await navigationHelper(tab, "a[href='/genelia65/']");
	

	await tab.waitForSelector("a[href='/accounts/edit/']");
   
	await navigationHelper(tab, "a[href='/accounts/edit/']");
	
	await tab.waitForSelector("#pepBio");
	
	await tab.type("#pepBio",  '"It has become appallingly obvious that our technology has exceeded our humanity."— Albert Einstein', { delay: 100 });

    await tab.waitForSelector(".sqdOP.L3NKy.y3zKF");
	let submit = await isElementVisible(tab,'.sqdOP.L3NKy.y3zKF');
	if(submit){
		await tab
		.click('.sqdOP.L3NKy.y3zKF')
		.catch(() => {});	
	}
	
	await tab.goto("https://www.instagram.com/genelia65/", {
        waitUntil: "networkidle2"
    });

	

	await tab.waitForSelector("svg[aria-label='Options']");
   
	//await navigationHelper(tab, "svg[aria-label='Options']");
	let option = await isElementVisible(tab,"svg[aria-label='Options']");
	if(option){
		await tab
		.click("svg[aria-label='Options']")
		.catch(() => {});	
	}
	console.log("option")
	//await tab.waitForSelector(".RnEpo.Yx5HN .pbNvD.fPMEg ._1XyCr .piCib .mt3GC .aOOlW.HoLwm");
	const manageTabs = await tab.$$(".RnEpo.Yx5HN .pbNvD.fPMEg ._1XyCr .piCib .mt3GC .aOOlW.HoLwm", { hidden: true });
	console.log("abc")
    await Promise.all([manageTabs[8].click(), tab.waitForNavigation({
        waitUntil: "networkidle2"
    })])
	await browser.close();

})()

async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
		waitUntil: "networkidle2",
		//waitUntil: 'load',
        // Remove the timeout
        //timeout: 0
    }), tab.click(selector)]);
}


 


